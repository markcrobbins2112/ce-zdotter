# Build

## Go to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- 🔸[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)

---

## 🛠️ Build Pipeline & Assembly

The **zdotter** project is configured around a low-overhead compilation setup designed for high performance and fast feedback loops:

- **Primary Compiler/Bundler**: Bun is utilized for fast transpilation and single-file bundling via the execution script `build.js`.
- **Target Output**: Compiles source code directly into `dist/extension.cjs` as a standard CommonJS module compatible with VS Code.
- **Dependency Sandboxing**: Dev dependencies include the standard `@types/vscode` API wrappers keeping type definitions intact.

---

## 🛰️ Actionable Build Scripts

The following workflows are run via your terminal under npm:

- **Local Compiling**
  ```bash
  npm run compile
  ```
  Invokes `bun build.js` to transpile typescript, bundle necessary assets, and generate the final extension code under `dist/`.

- **Development File-Watcher**
  ```bash
  npm run watch
  ```
  Runs the compiler with the watch flag enabled, automatically re-building the project on file modifications.

- **Pre-publishing Assembly**
  ```bash
  npm run vscode:prepublish
  ```
  Builds the production version of the extension with minification and source maps enabled for publication.

- **Dry-run Lint Check**
  ```bash
  npm run lint
  ```
  Builds the code first, then passes the output to Node.js's syntax verifier (`node --check dist/extension.cjs`) to ensure syntax compliance without launching VS Code.

- **VSIX Packaging**
  ```bash
  npm run compile:vsix
  ```
  packages the entire extension into an installable `.vsix` binary using VSCE.

- **Direct Installation**
  ```bash
  npm run install-vsix
  ```
  Automatically scans and installs the compiled `.vsix` binary into your active local instances of VS Code or Cursor.

---
## Go back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- 🔸[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
