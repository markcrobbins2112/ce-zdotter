---
title: BUILD
---

<!-- # TEMPLATE: BUILD.template.md -->

<!-- markdownlint-disable MD013 -->

# BUILD
<a id="a-build"></a>[TOC](#toc-build)

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

---

<!-- TOC location -->
## 🔍 Table of Contents
<!-- Maintained by script -->
- [BUILD](#a-build) <a id="toc-build"></a> ^toc-build
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [📋 Prerequisites & Toolchain Setup](#a-prerequisitestoolchainsetup) <a id="toc-prerequisitestoolchainsetup"></a> ^toc-prerequisitestoolchainsetup
  - [🛠️ Build & Packaging Pipeline](#a-buildpackagingpipeline) <a id="toc-buildpackagingpipeline"></a> ^toc-buildpackagingpipeline
    - [📦 Key Components](#a-keycomponents) <a id="toc-keycomponents"></a> ^toc-keycomponents
  - [🚀 Execution & Packing Commands](#a-executionpackingcommands) <a id="toc-executionpackingcommands"></a> ^toc-executionpackingcommands
  - [🧪 Post-Build Verification Rules](#a-postbuildverificationrules) <a id="toc-postbuildverificationrules"></a> ^toc-postbuildverificationrules
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto
---
## 📋 Prerequisites & Toolchain Setup
<a id="a-prerequisitestoolchainsetup"></a>[TOC](#toc-prerequisitestoolchainsetup)
- **Compiler/Runtime:** Node.js (v18.x / v20.x), Bun v1.x (for bundler execution via `build.js`), VS Code Extension API `^1.85.0`
- **Global System Variables Required:**
  - `VSCODE_PATH`: Path to VS Code or Cursor editor runtime binary.
  - `PATH`: Standard PATH containing `node`, `npm`, and `bun`.

---

## 🛠️ Build & Packaging Pipeline
<a id="a-buildpackagingpipeline"></a>[TOC](#toc-buildpackagingpipeline)
- The **zdotter** extension is compiled into a single CommonJS module (`dist/extension.cjs`) using Bun as a high-speed transpiler and bundler configured via `build.js`.
- During compilation, TypeScript files in `src/` are bundled and minified while keeping VS Code external module references intact.

---
### 📦 Key Components
<a id="a-keycomponents"></a>[TOC](#toc-keycomponents)
- **`src/extension.ts`**: Main TypeScript entry point initializing command palette controllers, gutter decorations, and file system handlers.
- **`build.js`**: Bun build configuration script generating `dist/extension.cjs`.
- **`package.json`**: Manifest declaring VS Code extension contributions, commands (`contributes.commands`), configuration settings (`contributes.configuration`), and activation events.

---

## 🚀 Execution & Packing Commands
<a id="a-executionpackingcommands"></a>[TOC](#toc-executionpackingcommands)
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Local Dev Server / Watch Mode**:
  ```bash
  npm run watch
  ```
- **Verification / Linting**:
  ```bash
  npm run lint
  ```
- **Production Package Compilation**:
  ```bash
  npm run compile
  ```
- **VSIX Package Generation**:
  ```bash
  npm run compile:vsix
  ```
- **Direct VSIX Installation**:
  ```bash
  npm run install-vsix
  ```

---

## 🧪 Post-Build Verification Rules
<a id="a-postbuildverificationrules"></a>[TOC](#toc-postbuildverificationrules)
- 1. **Size Checking:** Verify that the output bundle `dist/extension.cjs` exists and has a size greater than `0 KB`.
- 2. **Path Verification:** Check that the output file is located exactly at `/dist/extension.cjs`.
- 3. **Smoke Test Command:**
  ```bash
  npm run lint
  ```

---
## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔸 [BUILD.md](BUILD.md)
- 🔹 [CODE.md](CODE.md)
- 🔹 [DESIGN.md](DESIGN.md)
- 🔹 [FEATURES.md](FEATURES.md)
- 🔹 [LOG.md](LOG.md)
- 🔹 [MANUAL.md](MANUAL.md)
- 🔹 [README.md](../README.md)
- 🔹 [SPEC.md](SPEC.md)
- 🔹 [TASKS.md](TASKS.md)
- 🔹 [TERMS.md](TERMS.md)
- 🔹 [TESTING.md](TESTING.md)
- 🔹 [VERSIONS.md](VERSIONS.md)

<!-- # TEMPLATE: BUILD.template.md -->
