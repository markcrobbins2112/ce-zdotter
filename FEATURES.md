# Features

---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- 🔸[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)

Welcome to **zdotter**!
This guide details all the user-facing capabilities, UI patterns, and commands offered by the extension to manage lightweight cross-file references.

## Feature Groups

### ✏️ 1. Insertion & Custom Templating
<a id="z202605310314316578" name="z.202605310314316578"></a>
Streamlines the creation of high-precision reference anchors (zdots) within any source code or prose block.
- **[Timestamp-anchored Zdots](#insertion-and-timestamp-anchored-zdots)** - Instantly insert unique ID strings based on high-resolution timestamp digits.
- **[Aesthetic Custom Templates](#aesthetic-custom-templates)** - Inject custom-wrapped tokens matching the style of your active document.
- **[Non-disruptive Insertion (Freeze Cursor)](#non-disruptive-insertion-freeze-cursor)** - Control cursor position behaviors when injecting new reference keys.

### 🚀 2. Cross-File Navigation & Lookups
<a id="z202605311200000001" name="z.202605311200000001"></a>
Accelerates cross-referencing and trace jumps between documentation, specifications, and underlying implementations.
- **[Trace Jumps from Search Anchors](#trace-jumps-from-search-anchors-zdashes)** - Hop instantly from inline zdashes back to their source-of-truth zdot.
- **[Companion ID Indexing (.zdoti)](#companion-id-indexing-zdoti)** - Query or modify direct text indexes representing implementation paths.
- **[Seamless Wrap Navigation](#seamless-wrap-navigation)** - Step forward or backward through references inside the open editor context.

### 🧹 3. Utility & Clipboard Refactoring
<a id="z202605311200000002" name="z.202605311200000002"></a>
Facilitates bulk updates, key mappings, and cross-file clipboard operations without complicating workspace settings.
- **[Bulk References Updater](#bulk-references-updater)** - Re-scan files to map existing zdots to their current absolute paths.
- **[Refactoring Clipboard Mappers](#refactoring-clipboard-mappers)** - Translate zdots into copyable zdashes instantly for fast linking.


## All Features

### Insertion and Timestamp-anchored Zdots
- Group: [Insertion & Custom Templating](#z202605310314316578)
Easily register a brand-new point of origin by calling the "Insert zdot" command. This command constructs a pristine timestamp identifier based on the current system time, appends it as `z.<id>` to your document, and writes out a background `.zdoti` companion file mapping that ID to your current file path.

### Aesthetic Custom Templates
- Group: [Insertion & Custom Templating](#z202605310314316578)
Adapt to the syntactic preferences of diverse languages (Markdown, HTML, JS, Py, YAML). Choose from four customized templates (`outputTemplate1` to `outputTemplate4`) so that generated keys are wrapped correctly as code labels, HTML anchor IDs (`<a id="z${z}"></a>`), or markdown brackets (`[${z}]`).

### Non-disruptive Insertion (Freeze Cursor)
- Group: [Insertion & Custom Templating](#z202605310314316578)
Activate "Freeze Cursor on Insert" to keep your cursor perfectly stationary when registering inline zdots. When writing a line, injecting a zdot will not slide your active editing caret past the token, keeping your typing focus uninterrupted.

### Trace Jumps from Search Anchors (Zdashes)
- Group: [Cross-File Navigation & Lookups](#z202605311200000001)
Perform structural jumps in multi-repo/workspace structures. Put your cursor on a search anchor like `z-20260531123456` and invoke "Goto zdot from zdash". The editor reads the index folder file, finds the original path, loads the matching file, and scrolls directly to center on the corresponding `z.20260531123456`.

### Companion ID Indexing (.zdoti)
- Group: [Cross-File Navigation & Lookups](#z202605311200000001)
Avoid bloated centralized databases. Companion indexing is fully decentralized: every key matches a small text file named `<zdot_id>.zdoti` in your `.zdotter` workspace path (or global path) containing exactly the file path where the anchor is hosted. You can open any index file direct in VS Code via "Open zdoti for zdot" to write notes or repair broken references.

### Seamless Wrap Navigation
- Group: [Cross-File Navigation & Lookups](#z202605311200000001)
Step comfortably through code file indices. The "Next zdot / Previous zdot" and "Next zdash / Previous zdash" commands cyclicly focus matching text strings anywhere on current documents, allowing rapid sequential scanning.

### Bulk References Updater
- Group: [Utility & Clipboard Refactoring](#z202605311200000002)
Fix broken references with ease when files are renamed, reorganized, or moved to another repository context. Run the bulk update command on a file to trace every raw `z.<digits>` and automatically align their `.zdoti` pointers to point back to the new, accurate disk destination.

### Refactoring Clipboard Mappers
- Group: [Utility & Clipboard Refactoring](#z202605311200000002)
Convert references instantly. The utility suite includes clipboard copy mapping ("Copy zdot as zdash", "Copy Nearest Dot As Dash", and "Zdash the line") to immediately turn defined `z.` indicators into dash links in your target specifications, emails, or chat windows.

---
## Go Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- 🔸[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
