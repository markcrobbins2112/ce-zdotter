import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

const zdotRegex = /z\.([0-9]{18})/g;
const zdashRegex = /z-([0-9]{18})/g;

function pad2(input: number): string {
	return input.toString().padStart(2, '0');
}

function pad4(input: number): string {
	return input.toString().padStart(4, '0');
}

function generateZdotValue(): string {
	const now = new Date();
	const random = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, '0');
	return `${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(
		now.getDate()
	)}${pad2(now.getHours())}${pad2(now.getMinutes())}${pad2(
		now.getSeconds()
	)}${random}`;
}

function generateUniqueZdotValues(count: number): string[] {
	if (count <= 0) {
		return [];
	}
	if (count > 10000) {
		throw new Error('Cannot generate more than 10000 unique zdot values per insert.');
	}

	const now = new Date();
	const prefix = `${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(
		now.getDate()
	)}${pad2(now.getHours())}${pad2(now.getMinutes())}${pad2(now.getSeconds())}`;
	const seen = new Set<number>();
	const values: string[] = [];

	while (values.length < count) {
		const randomSuffix = Math.floor(Math.random() * 10000);
		if (seen.has(randomSuffix)) {
			continue;
		}
		seen.add(randomSuffix);
		values.push(`${prefix}${pad4(randomSuffix)}`);
	}

	return values;
}

function resolveZdotDir(): string {
	const cfg = vscode.workspace.getConfiguration('zdotter');
	const userPath = cfg.get<string>('zdotdir')?.trim();
	if (userPath) {
		return path.resolve(userPath);
	}

	const workspace = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (workspace) {
		return path.join(workspace, '.zdotter');
	}

	return path.join(os.homedir(), '.zdotter');
}

function getZdotiPath(zdotValue: string, zdotDir: string): string {
	const year = zdotValue.slice(0, 4);
	const month = zdotValue.slice(4, 6);
	const day = zdotValue.slice(6, 8);
	const hhmmssrrrr = `${zdotValue.slice(8, 10)}${zdotValue.slice(
		10,
		12
	)}${zdotValue.slice(12, 14)}${zdotValue.slice(14)}`;
	return path.join(zdotDir, year, month, day, `${hhmmssrrrr}.zdoti`);
}

async function ensureParent(filePath: string): Promise<void> {
	await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function writeZdoti(
	zdotValue: string,
	targetFile: string
): Promise<string> {
	const zdotDir = resolveZdotDir();
	const zdotiPath = getZdotiPath(zdotValue, zdotDir);
	await ensureParent(zdotiPath);

	let content = `${targetFile}\n`;
	try {
		const existing = await fs.readFile(zdotiPath, 'utf8');
		const lines = existing.split(/\r?\n/);
		lines[0] = targetFile;
		content = lines.join('\n');
	} catch {
		// create fresh file
	}

	await fs.writeFile(zdotiPath, content, 'utf8');
	return zdotiPath;
}

async function readFirstLine(filePath: string): Promise<string | undefined> {
	try {
		const data = await fs.readFile(filePath, 'utf8');
		const lines = data.split(/\r?\n/);
		return lines[0]?.trim();
	} catch {
		return undefined;
	}
}

async function findZdotPositionInDocument(
	document: vscode.TextDocument,
	zdotValue: string
): Promise<vscode.Position | undefined> {
	const idx = document.getText().indexOf(`z.${zdotValue}`);
	if (idx < 0) {
		return undefined;
	}
	return document.positionAt(idx);
}

function lineMatches(regex: RegExp, text: string): string[] {
	const clone = new RegExp(regex.source, regex.flags);
	const results: string[] = [];
	let match: RegExpExecArray | null;
	while ((match = clone.exec(text)) !== null) {
		results.push(match[1]);
	}
	return results;
}

function offsetMatches(regex: RegExp, text: string): { value: string; index: number }[] {
	const clone = new RegExp(regex.source, regex.flags);
	const results: { value: string; index: number }[] = [];
	let match: RegExpExecArray | null;
	while ((match = clone.exec(text)) !== null) {
		if (typeof match.index === 'number') {
			results.push({ value: match[1], index: match.index });
		}
	}
	return results;
}

type TokenMatch = { value: string; kind: 'dot' | 'dash'; start: number; end: number };

function tokenAtPosition(
	document: vscode.TextDocument,
	position: vscode.Position
): TokenMatch | undefined {
	const lineText = document.lineAt(position.line).text;
	const patterns: { regex: RegExp; kind: 'dot' | 'dash' }[] = [
		{ regex: zdotRegex, kind: 'dot' },
		{ regex: zdashRegex, kind: 'dash' }
	];

	for (const { regex, kind } of patterns) {
		const clone = new RegExp(regex.source, regex.flags);
		let match: RegExpExecArray | null;
		while ((match = clone.exec(lineText)) !== null) {
			const start = match.index ?? 0;
			const end = start + match[0].length;
			if (position.character >= start && position.character <= end) {
				return { value: match[1], kind, start, end };
			}
		}
	}
	return undefined;
}

async function pickValue(values: string[], prefix: string): Promise<string | undefined> {
	if (values.length === 1) {
		return values[0];
	}

	const selection = await vscode.window.showQuickPick(
		values.map((v) => ({
			label: `${prefix}${v}`,
			value: v
		})),
		{ placeHolder: 'Select entry' }
	);
	return selection?.value;
}

async function insertWithTemplate(template: string): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const cfg = vscode.workspace.getConfiguration('zdotter');
	const freezeCursorOnInsert = cfg.get<boolean>('freezeCursorOnInsert') ?? false;
	const originalSelections = editor.selections.map(
		(selection) => new vscode.Selection(selection.active, selection.active)
	);
	let zdotValues: string[];
	try {
		zdotValues =
			editor.selections.length > 1
				? generateUniqueZdotValues(editor.selections.length)
				: [generateZdotValue()];
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unable to generate zdot values.';
		vscode.window.showErrorMessage(message);
		return;
	}

	await editor.edit((editBuilder) => {
		for (let i = 0; i < editor.selections.length; i += 1) {
			const selection = editor.selections[i];
			const replacement = template.replace(/\$\{z\}/g, zdotValues[i]);
			editBuilder.insert(selection.active, replacement);
		}
	});

	if (freezeCursorOnInsert) {
		editor.selections = originalSelections;
	}

	const filePath = editor.document.uri.fsPath;
	await Promise.all(zdotValues.map((zdotValue) => writeZdoti(zdotValue, filePath)));
	if (zdotValues.length === 1) {
		vscode.window.setStatusBarMessage(`Inserted zdot ${zdotValues[0]}`, 3000);
	} else {
		vscode.window.setStatusBarMessage(`Inserted ${zdotValues.length} zdots`, 3000);
	}
}

async function toggleFreezeCursorOnInsert(): Promise<void> {
	const cfg = vscode.workspace.getConfiguration('zdotter');
	const current = cfg.get<boolean>('freezeCursorOnInsert') ?? false;
	const next = !current;
	await cfg.update('freezeCursorOnInsert', next, vscode.ConfigurationTarget.Global);
	vscode.window.setStatusBarMessage(
		`zdotter.freezeCursorOnInsert: ${next ? 'ON' : 'OFF'}`,
		3000
	);
}

async function updateFileZdots(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const document = editor.document;
	const text = document.getText();
	const matches = offsetMatches(zdotRegex, text).map((m) => m.value);

	if (!matches.length) {
		vscode.window.showInformationMessage('No zdots found in this file.');
		return;
	}

	const unique = Array.from(new Set(matches));
	await Promise.all(unique.map((v) => writeZdoti(v, document.uri.fsPath)));
	vscode.window.setStatusBarMessage(`Updated ${unique.length} zdoti file(s).`, 3000);
}

async function gotoZdot(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const lineText = editor.document.lineAt(editor.selection.active.line).text;
	const zdashes = lineMatches(zdashRegex, lineText);
	if (!zdashes.length) {
		vscode.window.showInformationMessage('No zdash on current line.');
		return;
	}

	const selected = await pickValue(zdashes, 'z-');
	if (!selected) {
		return;
	}

	const zdotiPath = getZdotiPath(selected, resolveZdotDir());
	const targetFile = await readFirstLine(zdotiPath);
	if (!targetFile) {
		vscode.window.showWarningMessage(`zdoti not found: ${zdotiPath}`);
		return;
	}

	const targetDoc = await vscode.workspace.openTextDocument(targetFile);
	const targetEditor = await vscode.window.showTextDocument(targetDoc, { preview: false });
	const needle = `z.${selected}`;
	const idx = targetDoc.getText().indexOf(needle);
	if (idx >= 0) {
		const pos = targetDoc.positionAt(idx);
		const sel = new vscode.Selection(pos, pos);
		targetEditor.selection = sel;
		targetEditor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
	} else {
		vscode.window.showWarningMessage(`zdot ${needle} not found in target file.`);
	}
}

async function gotoZdotExisting(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const lineText = editor.document.lineAt(editor.selection.active.line).text;
	const zdashes = lineMatches(zdashRegex, lineText);
	if (!zdashes.length) {
		vscode.window.showInformationMessage('No zdash on current line.');
		return;
	}

	const selected = await pickValue(zdashes, 'z-');
	if (!selected) {
		return;
	}

	const zdotiPath = getZdotiPath(selected, resolveZdotDir());
	const targetFile = await readFirstLine(zdotiPath);
	if (!targetFile) {
		vscode.window.showWarningMessage(`zdoti not found: ${zdotiPath}`);
		return;
	}

	const existingEditor = vscode.window.visibleTextEditors.find(
		(e) => e.document.uri.fsPath === targetFile
	);

	let targetEditor: vscode.TextEditor;
	let targetDoc: vscode.TextDocument;

	if (existingEditor) {
		targetEditor = await vscode.window.showTextDocument(existingEditor.document, {
			viewColumn: existingEditor.viewColumn,
			preserveFocus: false,
			preview: false
		});
		targetDoc = targetEditor.document;
	} else {
		targetDoc = await vscode.workspace.openTextDocument(targetFile);
		targetEditor = await vscode.window.showTextDocument(targetDoc, {
			preview: false
		});
	}
	const needle = `z.${selected}`;
	const idx = targetDoc.getText().indexOf(needle);
	if (idx >= 0) {
		const pos = targetDoc.positionAt(idx);
		const sel = new vscode.Selection(pos, pos);
		targetEditor.selection = sel;
		targetEditor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
	} else {
		vscode.window.showWarningMessage(`zdot ${needle} not found in target file.`);
	}
}

async function copyAsZdash(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const lineText = editor.document.lineAt(editor.selection.active.line).text;
	const zdots = lineMatches(zdotRegex, lineText);
	if (!zdots.length) {
		vscode.window.showInformationMessage('No zdot on current line.');
		return;
	}

	const selected = await pickValue(zdots, 'z.');
	if (!selected) {
		return;
	}

	const zdash = `z-${selected}`;
	await vscode.env.clipboard.writeText(zdash);
	vscode.window.setStatusBarMessage(`Copied ${zdash} to clipboard`, 3000);
}

async function moveToToken(regex: RegExp, forward: boolean): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const text = editor.document.getText();
	const matches = offsetMatches(regex, text);
	if (!matches.length) {
		vscode.window.showInformationMessage('No matching entries in file.');
		return;
	}

	const offset = editor.document.offsetAt(editor.selection.active);
	let target = null as { value: string; index: number } | null;

	if (forward) {
		target = matches.find((m) => m.index > offset) ?? matches[0];
	} else {
		for (let i = matches.length - 1; i >= 0; i -= 1) {
			if (matches[i].index < offset) {
				target = matches[i];
				break;
			}
		}
		target = target ?? matches[matches.length - 1];
	}

	const pos = editor.document.positionAt(target.index);
	const sel = new vscode.Selection(pos, pos);
	editor.selection = sel;
	editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
}

async function openZdoti(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	const lineText = editor.document.lineAt(editor.selection.active.line).text;
	const zdots = lineMatches(zdotRegex, lineText);
	if (!zdots.length) {
		vscode.window.showInformationMessage('No zdot on current line.');
		return;
	}

	const selected = await pickValue(zdots, 'z.');
	if (!selected) {
		return;
	}

	const zdotiPath = getZdotiPath(selected, resolveZdotDir());
	await writeZdoti(selected, editor.document.uri.fsPath);
	const doc = await vscode.workspace.openTextDocument(zdotiPath);
	await vscode.window.showTextDocument(doc, { preview: false });
}

async function zdashLine(): Promise<void> {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const lineNo = editor.selection.active.line;
	const line = editor.document.lineAt(lineNo);
	const regex = /z\.([0-9]{18})/g;
	const replaced = line.text.replace(regex, (_match, digits) => `z-${digits}`);
	if (replaced === line.text) {
		vscode.window.showInformationMessage('No zdots found on the current line.');
		return;
	}

	await editor.edit((editBuilder) => {
		editBuilder.replace(line.range, replaced);
	});
	vscode.window.setStatusBarMessage('Replaced zdots with zdashes on the current line.', 3000);
}

const definitionProvider: vscode.DefinitionProvider = {
	provideDefinition: async (document, position) => {
		const token = tokenAtPosition(document, position);
		if (!token) {
			return [];
		}

		const zdotiPath = getZdotiPath(token.value, resolveZdotDir());
		const targetPath = await readFirstLine(zdotiPath);
		if (!targetPath) {
			return [];
		}

		let targetDoc: vscode.TextDocument;
		try {
			targetDoc = await vscode.workspace.openTextDocument(targetPath);
		} catch {
			return [];
		}

		const targetPos =
			(await findZdotPositionInDocument(targetDoc, token.value)) ??
			new vscode.Position(0, 0);

		return [new vscode.Location(targetDoc.uri, targetPos)];
	}
};

export function activate(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand('zdotter.insertZdot', () =>
			insertWithTemplate('z.${z}')
		),
		vscode.commands.registerCommand('zdotter.insertTemplate1', () => {
			const cfg = vscode.workspace.getConfiguration('zdotter');
			const template = cfg.get<string>('outputTemplate1') ?? 'z.${z}';
			return insertWithTemplate(template);
		}),
		vscode.commands.registerCommand('zdotter.insertTemplate2', () => {
			const cfg = vscode.workspace.getConfiguration('zdotter');
			const template = cfg.get<string>('outputTemplate2') ?? '[${z}]';
			return insertWithTemplate(template);
		}),
		vscode.commands.registerCommand('zdotter.insertTemplate3', () => {
			const cfg = vscode.workspace.getConfiguration('zdotter');
			const template = cfg.get<string>('outputTemplate3') ?? '<a id=\"z${z}\"></a>';
			return insertWithTemplate(template);
		}),
		vscode.commands.registerCommand('zdotter.insertTemplate4', () => {
			const cfg = vscode.workspace.getConfiguration('zdotter');
			const template = cfg.get<string>('outputTemplate3') ?? '[${z}]';
			return insertWithTemplate(template);
		}),
		vscode.commands.registerCommand(
			'zdotter.toggleFreezeCursorOnInsert',
			toggleFreezeCursorOnInsert
		),
		vscode.commands.registerCommand('zdotter.updateFile', updateFileZdots),
		vscode.commands.registerCommand('zdotter.gotoZdot', gotoZdot),
		vscode.commands.registerCommand('zdotter.gotoZdotExisting', gotoZdotExisting),
		vscode.commands.registerCommand('zdotter.copyAsZdash', copyAsZdash),
		vscode.commands.registerCommand('zdotter.zdashLine', zdashLine),
		vscode.commands.registerCommand('zdotter.nextZdot', () => moveToToken(zdotRegex, true)),
		vscode.commands.registerCommand('zdotter.prevZdot', () => moveToToken(zdotRegex, false)),
		vscode.commands.registerCommand('zdotter.nextZdash', () => moveToToken(zdashRegex, true)),
		vscode.commands.registerCommand('zdotter.prevZdash', () => moveToToken(zdashRegex, false)),
		vscode.commands.registerCommand('zdotter.openZdoti', openZdoti)
	);

	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider({ scheme: 'file' }, definitionProvider)
	);
}

export function deactivate(): void {
	// no-op
}
