# zdotter

VS Code extension to manage zdots/zdashes and their companion `.zdoti` index files.

![icon](icon.jpg)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/markcrobbins)
---
## AI Primary Files
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- 🔸[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
---

## Introduction

**zdotter** is an interactive, high-precision VS Code / Cursor extension designed to maintain lightweight bidirectional references within and across files. It eliminates the overhead of documentation drift by pairing unique identifiers called **zdots** (e.g. `z.20260531123456`) and search anchors called **zdashes** (e.g. `z-20260531123456`) through local index files (extension `.zdoti`).

- **zdots** (`z.<digits>`): Defined at the source of truth (such as a specific method, feature log, test case, or documentation heading).
- **zdashes** (`z-<digits>`): Used as links/lookups anywhere in other files, codebases, or manuals pointing back to that source of truth.
- **index files** (`.zdoti`): Self-contained companion text files stored in a designated directory. The first line of a `.zdoti` file is the absolute file path of the source file containing the corresponding `zdot`.

With **zdotter**, you can instantly jump from any `zdash` back to its defined `zdot` source, across multiple repositories and workspaces, via a lightweight and blazing fast lookup directory.

---

## Settings

Configure **zdotter** under User Settings or `.vscode/settings.json`:

- `zdotter.zdotdir` — The directory where companion `.zdoti` lookup index files will be stored.
  - *Type*: `string`
  - *Default*: `""` (defaults to `<workspace>/.zdotter` or `~/.zdotter` if no active workspace is open)
  - *Note*: It is highly recommended to set this to a global folder (e.g., `~/.zdots`) to allow seamless cross-workspace jumping.
- `zdotter.outputTemplate1` — Template used by **Insert zdot Template 1**.
  - *Type*: `string`
  - *Default*: `"z.${z}"`
- `zdotter.outputTemplate2` — Template used by **Insert zdot Template 2**.
  - *Type*: `string`
  - *Default*: `"[${z}]"`
- `zdotter.outputTemplate3` — Template used by **Insert zdot Template 3**.
  - *Type*: `string`
  - *Default*: `"<a id=\"z${z}\"></a>"`
- `zdotter.outputTemplate4` — Template used by **Insert zdot Template 4**.
  - *Type*: `string`
  - *Default*: `"[${z}]"`
- `zdotter.freezeCursorOnInsert` — Dictates cursor behavior upon insertion.
  - *Type*: `boolean`
  - *Default*: `false`
  - *Behavior*: When true, insertion keeps the cursor at its original start position rather than shifting to the end of the newly inserted token.

---

## Commands Reference

The extension registers the following commands in the VS Code Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

### 1. Insertion & Creation

- **zdotter: Insert zdot** (`zdotter.insertZdot`)
  - Generates a unique timestamp-based identifier (e.g., `2026053112345678`), inserts the default structure `z.<id>` at the current cursor(s), and automatically creates/overwrites the companion `.zdoti` file under the configured directory with the current file path on its first line.
- **zdotter: Insert zdot Template 1/2/3/4** (`zdotter.insertTemplate1` / `zdotter.insertTemplate2` / `zdotter.insertTemplate3` / `zdotter.insertTemplate4`)
  - Similar to the default insert command, but crafts the token using the corresponding user-configured template (`zdotter.outputTemplate1-4`) with the identifier substituted for `${z}`. It also auto-generates the backing `.zdoti` descriptor file.
- **zdotter: Toggle Freeze Cursor On Insert** (`zdotter.toggleFreezeCursorOnInsert`)
  - Rapidly switches `zdotter.freezeCursorOnInsert` state between `true` and `false` and displays a status bar notification.

### 2. Navigation & Lookups

- **zdotter: Goto zdot from zdash** (`zdotter.gotoZdot`)
  - Scans the active line containing the cursor for a `zdash` pattern (`z-<digits>`). If found, opens the corresponding `.zdoti` file from your configured index directory, reads the first line to determine the source file path, resolves and opens the target file in the editor, and instantly scrolls and centers the screen on the matching definition (`z.<digits>`).
- **zdotter: Goto zdot from zdash (focus existing)** (`zdotter.gotoZdotExisting`)
  - Performs the same jump lookup as above, but forces VS Code to focus the file if it is already open within any existing editor group rather than opening a new editor tab.
- **zdotter: Open zdoti for zdot** (`zdotter.openZdoti`)
  - Evaluates the cursor position for a `zdot` (`z.<digits>`) or `zdash` (`z-<digits>`) and opens the underlying `.zdoti` text descriptor directly in standard editor mode, allowing manual edits to the metadata.

### 3. Utility & Bulk Operations

- **zdotter: Update File zdoti references** (`zdotter.updateFile`)
  - Performs a complete regex scan of the active document. For every occurrence of a `z.<digits>` found, it creates or updates the associated `.zdoti` file, ensuring its first line maps perfectly to the current file path. Perfect for bulk imports or after moving files around.
- **zdotter: Copy zdot as zdash** (`zdotter.copyAsZdash`)
  - Selects the nearest `zdot` (`z.<digits>`) under the cursor, converts the string into a `zdash` representation (`z-<digits>`), and writes it to the clipboard.
- **zdotter: Copy Nearest Dot As Dash** (`zdotter.copyNearestDotAsDash`)
  - Scans the active line around the cursor for any `z.<digits>` and copies it directly into the clipboard as a `zdash` (`z-<digits>`).
- **zdotter: Zdash the line** (`zdotter.zdashLine`)
  - Converts every `z.<digits>` instance on the currently active editor line into its corresponding `zdash` representation (`z-<digits>`).
- **zdotter: Next zdot / Previous zdot** (`zdotter.nextZdot` / `zdotter.prevZdot`)
  - Cycles the cursor forward or backward through all matching `z.<digits>` identifiers inside the open document, wrapping around at the top or bottom boundaries.
- **zdotter: Next zdash / Previous zdash** (`zdotter.nextZdash` / `zdotter.prevZdash`)
  - Cycles the cursor forward or backward through all matching `z-<digits>` references in the open document, with wrapping support.

---

## Workspace Setup & Compilation

- **Prerequisites**: Make sure NodeJS is installed.
- **Local Assembly**:
  ```bash
  npm install
  npm run compile
  ```
- **Packaging VSIX**:
  ```bash
  npm run compile:vsix
  ```
