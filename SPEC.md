# Spec

This document compiles the user requirements and instructions from `AGENTS.md` and provides detailed documentation of how the extension was architected and built.

---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- 🔸[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)

---

## 📋 Originally Requested Specifications

### 1. Application & Identification
- **Name**: `zdotter`
- **Purpose**: Manage bidirectional references between source code locations and external specifications or document locations via lightweight, decentralized lookup index files (`.zdoti`).
- **Target Platforms**: Cursor, VS Code (extensions engine `^1.85.0`).

### 2. Format Specification
- **Zdot Format (`z.<digits>`)**: Represents the *definition point* of a reference. It is written as `z.` followed by a sequence of timestamp digits (representing the creation UTC time or a unique ID, e.g., `YYYYMMDDHHMMSS` or a finer millisecond stamp like `2026053112345678`).
- **Zdash Format (`z-<digits>`)**: Represents the *hyperlink/anchor* pointing to a zdot. It is written as `z-` followed by the matching timestamp digits.
- **Companion File (`.zdoti`)**: Contains the index record.
  - *Location*: Saved within the workspace `.zdotter` folder or a globally specified folder.
  - *Name*: Named `<digits>.zdoti` (where `<digits>` matches the unique ID of the zdot/zdash).
  - *Content*: The first line of the file must be the absolute file path (or workspace-relative path) of the file containing the original `zdot`.

### 3. Dynamic UI Gutter Indicators
- To ensure immediate feedback and ease of navigation, the extension implements dynamic editor decorations.
- It scans the active editor and highlights `zdots` and `zdashes` using visual decorations in the gutter (such as subtle colored symbols or glyph markers) and the overview ruler.
- This decoration engine updates on editor load, document change, and scroll events.

### 4. Custom Command Palette Rules & Contexts
The extension utilizes specific context flags to customize the command palette and user experience:
- `zdotter.freezeCursorOnInsert`: Controls whether the insertion points move the cursor selection forward or leave it frozen at the insertion head.
- Command activation can check whether an editor is open or active to enable commands such as `gotoZdot` only when appropriate.

---

## 🛠️ Implementation Details (How We Built It)

### 1. Robust File Parser & Index Generator
- Keeps an in-memory cache of resolved index relationships for rapid jumping.
- When `updateFile` is run, the engine performs an optimized line-by-line regex parse matching `\bz\.(\d+)\b`.
- Each discovered identifier triggers writing the relative or absolute path to `<zdotdir>/<id>.zdoti`, preserving the file system directory structure of index folders automatically.

### 2. Non-Disruptive Editor Caret Management
- Respects multi-cursor editing contexts. When multiple carets are active, invoking `insertZdot` generates unique ids for *each* cursor position separately to prevent ID collision.
- Depending on the `freezeCursorOnInsert` config, the caret is positioned exactly before the newly inserted characters or pushed to the end.

---

## 🎯 Implemented Technical Concerns & Optimization Features
- **Decentralized Performance**: Navigating to a reference does not require searching your entire project. It is an $O(1)$ disk hit to find `<id>.zdoti`, parse line 1, and focus the file.
- **Clipboard Translation**: Streamlines pasting specs: copies the nearest identifier under the cursor, automatically translates the syntax from `z.` to `z-`, and dumps it right to the system clipboard in a single stroke.
- **Multi-platform Path Normalization**: Resolves differences between Windows (`\`) and Unix (`/`) slash separators when updating index files, ensuring compatibility across different operating systems.
---
## Go Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- 🔸[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
