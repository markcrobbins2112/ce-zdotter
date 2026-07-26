---
title: BUILD
---

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
    - [📦 Key Components & Build Architecture](#a-keycomponents) <a id="toc-keycomponents"></a> ^toc-keycomponents
  - [🚀 NPM Scripts & Detailed Explanation](#a-executionpackingcommands) <a id="toc-executionpackingcommands"></a> ^toc-executionpackingcommands
  - [🧪 Post-Build Verification Rules](#a-postbuildverificationrules) <a id="toc-postbuildverificationrules"></a> ^toc-postbuildverificationrules
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto
---
## 📋 Prerequisites & Toolchain Setup
<a id="a-prerequisitestoolchainsetup"></a>[TOC](#toc-prerequisitestoolchainsetup)
- **Compiler / Runtime Environment:**
  - **Node.js**: v18.x / v20.x or higher (for extension execution inside VS Code).
  - **Bun**: v1.x (acts as the primary bundler and task runner via `build.js`).
  - **VS Code Extension API**: `^1.85.0` (target extension runtime compatibility).
  - **vsce / @vscode/vsce**: `^3.6.2` (for packaging the extension into `.vsix`).
- **Global / Environment Variables:**
  - `PATH`: Environment variable containing paths to `node`, `npm`, and `bun`.

---

## 🛠️ Build & Packaging Pipeline
<a id="a-buildpackagingpipeline"></a>[TOC](#toc-buildpackagingpipeline)
The **zdotter** extension uses Bun as an extremely fast JavaScript/TypeScript transpiler and bundler configured in `build.js`.

### Bundling Mechanism
1. **Entry Point**: `./src/extension.ts` is the main entry point.
2. **Output Target**: Compiled to `./dist/extension.cjs` in **CommonJS (`cjs`)** format with `node` target runtime compatibility.
3. **External Module Resolution**: The `vscode` API module is explicitly marked as `external: ["vscode"]` so Bun does not try to bundle VS Code internal APIs.
4. **Source Maps & Minification**:
   - **Development (`bun build.js`)**: Generates inline source maps (`sourcemap: "inline"`) and disables minification for debugging.
   - **Production (`bun build.js --production`)**: Minifies code (`minify: true`) and omits source maps (`sourcemap: "none"`).

---
### 📦 Key Components & Build Architecture
<a id="a-keycomponents"></a>[TOC](#toc-keycomponents)
- **`src/extension.ts`**: TypeScript source containing the main extension activation logic, command registrations, regex scanners (`z.<digits>` and `z-<digits>`), cursor manipulations, and filesystem handlers for `.zdoti` index files.
- **`build.js`**: Bun build configuration script. Executes `build()` from `"bun"` with parameters:
  - `entrypoints`: `["./src/extension.ts"]`
  - `outdir`: `"./dist"`
  - `naming`: `"extension.cjs"`
  - `target`: `"node"`
  - `format`: `"cjs"`
  - `external`: `["vscode"]`
  - `minify`: `isProd`
  - `sourcemap`: `isProd ? "none" : "inline"`
- **`package.json`**: Extension manifest declaring:
  - `main`: `"dist/extension.cjs"` (entry point loaded by VS Code).
  - `contributes.commands`: Command palette contributions.
  - `contributes.configuration`: Extension settings (`zdotter.zdotdir`, templates 1-4, `freezeCursorOnInsert`).
  - `scripts`: Build, watch, lint, and packaging workflows.

---

## 🚀 NPM Scripts & Detailed Explanation
<a id="a-executionpackingcommands"></a>[TOC](#toc-executionpackingcommands)

| Script Name | Command Line | Description |
| :--- | :--- | :--- |
| **`compile`** | `bun build.js` | Runs `build.js` using Bun to bundle `src/extension.ts` into `dist/extension.cjs` with inline sourcemaps. |
| **`watch`** | `bun build.js --watch` | Runs `build.js` in watch mode, automatically rebuilding `dist/extension.cjs` whenever files in `src/` are modified. |
| **`vscode:prepublish`** | `bun build.js --production` | Pre-publish hook executed automatically by `vsce package`. Builds a minified production bundle without sourcemaps. |
| **`lint`** | `bun build.js && node --check dist/extension.cjs` | Bundles the project and runs `node --check` to verify the generated JavaScript syntax in `dist/extension.cjs`. |
| **`package`** | `vsce package` | Invokes VS Code Extension Manager (`vsce`) to build a ready-to-distribute `.vsix` installer package. |
| **`compile:vsix`** | `npx vsce package` | Alias to build and package the extension into a `.vsix` installer file using `npx vsce package`. |
| **`install-vsix`** | `powershell -Command ...` | Finds the latest `.vsix` file in the root directory and installs it directly into local VS Code using `code --install-extension`. |
| **`unzip:latest`** | `bun unzip-latest.js zip.zip` | Helper utility to unpack zip archives. |
| **`x:compile`** | `tsc -p ./` | Fallback script to compile using the standard TypeScript compiler (`tsc`). |
| **`xwatch`** | `tsc -watch -p ./` | Fallback script to run TypeScript compiler in watch mode. |

---

## 🧪 Post-Build Verification Rules
<a id="a-postbuildverificationrules"></a>[TOC](#toc-postbuildverificationrules)
1. **Bundle Existence**: Ensure `dist/extension.cjs` exists after running `npm run compile`.
2. **Bundle Size**: Confirm `dist/extension.cjs` is non-empty (>0 KB).
3. **Syntax Check**: Run `npm run lint` to execute `node --check dist/extension.cjs`.

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

