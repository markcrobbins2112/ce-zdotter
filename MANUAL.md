# Manual

<!-- template
This guide describes the structural architecture, module layout, internal algorithms, optimization behaviors, and technical specifications of the {app name} codebase.
-->
---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- 🔸[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)


This guide describes the structural architecture, module layout, internal algorithms, optimization behaviors, and technical specifications of the **zdotter** codebase.

## 🏗️ 1. Architecture Overview
**zdotter** utilizes a standard VS Code / Cursor Extension architecture structured around an entry file (`extension.ts`/`extension.js`) compiled into a CommonJS artifact (`dist/extension.cjs`).

The physical workflow is as follows:
- **Editor Action**: User triggers a command, e.g., Insert or Goto.
- **FS Controller**: Reads or writes companion `.zdoti` state files located in the `zdotdir` directory.
- **Decoration Loop**: Automatically runs on document change and hover to highlight unresolved or linked nodes.

```
       [VS Code Text Editor]
         /                 \
  (Command Event)     (Hover / Status Update)
       v                     v
 [Command Controller]     [Decoration Manager]
       |                     |
       +------------+--------+
                    |
                    v
          [File System (FS) / OS]
                    |
                    v
          [companion .zdoti cache]
```

## 🧠 2. Core Modules & Systems

### A. Index & Storage Manager (`IndexStorage`)
- Resolves the workspace-relative or absolute target folder to save key index descriptions.
- Translates `zdotter.zdotdir` path syntax.
- Performs IO writes safely and asynchronously using `vscode.workspace.fs` to ensure non-blocking operation.

### B. Command Controller (`CommandController`)
- Registers the 17 standard commands listed in `package.json`'s commands array.
- Manages key clipboard mutations (converting `z.` format matches to `z-`).
- Drives multi-caret cursor offsets based on the `freezeCursorOnInsert` state variable.

### C. Gutter & Line Decoration Engine (`DecorationManager`)
- Constructs unique visual decorations using `vscode.window.createTextEditorDecorationType`.
- Matches all `z.<digits>` and `z-<digits>` occurrences within the visible viewport editor bounds.
- Draws custom telemetry lines, highlights matching references under the user's cursor, and draws gutter anchors.

## 🔎 3. Core Algorithm
The core lookup and translation logic relies on a two-stage regex pipeline:

1. **Token Extraction Regex**:
   - Matches standard zdot formats: `/\bz\.(\d+)\b/g`
   - Matches standard zdash formats: `/\bz\-(\d+)\b/g`
2. **Dynamic Context Scan**:
   - When a user requests jumping from a zdash `z-ID`:
     1. Seek the text token `z-ID` on the active editor line using regex mapping.
     2. Load `<zdotdir>/ID.zdoti`.
     3. Extract Line 1 (the string representing the file path).
     4. Open the document via `vscode.workspace.openTextDocument(uri)`.
     5. Scan the destination document line-by-line for `z.ID`.
     6. Position the editor selection exactly on that offset and center the scroll window.

## 🛰️ 4. Commands, Keybindings & Context Flags
The extension registers custom context keys in the editor:
- `zdotter.freezeCursorActive`: Represents whether cursor freezing is enabled, allowing conditional shortcuts or custom command-palette constraints.

## 🔧 5. Workspace Build & Configuration
The build stack consists of:
- **Transpilation**: TypeScript definitions paired with a custom `tsconfig.json` set to generate CommonJS modules.
- **Verification Tools**: Dry-run checking can be performed safely via `npx tsc --noEmit`.
- **Bundler**: Bun (`bun build.js`) is used for low-latency bundling and treeshaking of node-modules.
---
## Go Back to...
- [AGENTS.md](AGENTS.md)
- [AILOG.md](AILOG.md)
- [AITASKS.md](AITASKS.md)
- [BUILD.md](BUILD.md)
- [CODE.md](CODE.md)
- [FEATURES.md](FEATURES.md)
- [MANUAL.md](MANUAL.md)
- [README.md](README.md)
- [SPEC.md](SPEC.md)
- [TESTING.md](TESTING.md)

---
## Go back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- 🔸[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
