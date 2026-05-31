# zdotter

VS Code extension to manage zdots/zdashes and their companion `.zdoti` index files.

## Settings
- `zdotter.zdotdir`: Root directory for `.zdoti` files. Defaults to `<workspace>/.zdotter` or `~/.zdotter` when no workspace is open.
- `zdotter.outputTemplate1`: Template for **Insert zdot Template 1**. `${z}` is replaced with the generated zdot value.
- `zdotter.outputTemplate2`: Template for **Insert zdot Template 2**. `${z}` is replaced with the generated zdot value.
- `zdotter.freezeCursorOnInsert`: Defaults to `false`. When `true`, insert commands keep each cursor at its original position instead of moving after inserted text.

## Commands
- **Insert zdot** (`zdotter.insertZdot`): Inserts `z.${z}` and creates the corresponding `.zdoti` file whose first line is the active file path.
- **Insert zdot Template 1/2**: Inserts the configured template with `${z}` substituted; also creates the `.zdoti`.
- **Toggle Freeze Cursor On Insert** (`zdotter.toggleFreezeCursorOnInsert`): Toggles `zdotter.freezeCursorOnInsert` between `true` and `false`.
- **Update File zdoti references**: For every `z.<digits>` in the file, updates/creates its `.zdoti` first line to the current file path.
- **Goto zdot from zdash**: On the current line, pick a `z-<digits>`, open its `.zdoti`, then open the referenced file and jump to the matching `z.<digits>`.
- **Copy zdot as zdash**: From `z.<digits>` on the current line, copy `z-<digits>` to the clipboard.
- **Zdash the line**: Replace every `z.<digits>` on the current line with `z-<digits>`.
- **Next/Previous zdot** and **Next/Previous zdash**: Move the cursor to the next/previous token in the document (wraps).
- **Open zdoti for zdot**: From `z.<digits>` on the line, open/create its `.zdoti` file.

## Build
```bash
npm install
npm run compile
```
