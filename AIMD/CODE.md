---
title: CODE
---

<!-- # TEMPLATE: CODE.template.md -->

<!-- markdownlint-disable MD013 -->

# CODE
<a id="a-code"></a>[TOC](#toc-code)

## 📑 AI Primary Files
<a id="a-aiprimaryfiles"></a>[TOC](#toc-aiprimaryfiles)
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔸 [CODE.md](CODE.md)
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
- [CODE](#a-code) <a id="toc-code"></a> ^toc-code
  - [📑 AI Primary Files](#a-aiprimaryfiles) <a id="toc-aiprimaryfiles"></a> ^toc-aiprimaryfiles
  - [🛠️ Implementation Guidelines](#a-implementationguidelines) <a id="toc-implementationguidelines"></a> ^toc-implementationguidelines
  - [📝 Markdown Guidelines](#a-markdownguidelines) <a id="toc-markdownguidelines"></a> ^toc-markdownguidelines
  - [✒️ Formatting & Syntax Style](#a-formattingsyntaxstyle) <a id="toc-formattingsyntaxstyle"></a> ^toc-formattingsyntaxstyle
  - [🛡️ Robustness & Error-Handling Frameworks](#a-robustnesserrorhandlingframeworks) <a id="toc-robustnesserrorhandlingframeworks"></a> ^toc-robustnesserrorhandlingframeworks
  - [📂 Regions Division Style](#a-regionsdivisionstyle) <a id="toc-regionsdivisionstyle"></a> ^toc-regionsdivisionstyle
  - [🚀 Go to...](#a-goto) <a id="toc-goto"></a> ^toc-goto
---
## 🛠️ Implementation Guidelines
<a id="a-implementationguidelines"></a>[TOC](#toc-implementationguidelines)
- **Encoding Safety**: Preserve UTF-8 signatures. Ensure icons, characters, emojis, and unicode symbols are written cleanly without corruption (mojibake).
- **Target Changes Only**: Avoid complete file rewrites. Prefer minor, highly precise surgical patches to retain existing code blocks and comments intact.
- **Markdown Rules**:
  - Use dashes (`-`) instead of asterisks (`*`) for bullet list items.
  - Never change an `[x]` to `[X]`. Always use lowercase `[x]` when completing tasks.
  - Maintain UPPERCASE.md documents cleanly with updated task lists and logs.
  - Chat requests must be placed on `AITASKS.md` / `TASKS.md` before starting implementation.
  - `AILOG.md` / `LOG.md` top section must feature a "Commit Message" block maintained by the AI agent.

---

## 📝 Markdown Guidelines
<a id="a-markdownguidelines"></a>[TOC](#toc-markdownguidelines)
- **TOC and Section Linking Format**:
  All headers must use the explicit anchor ID format prefixed with `a-` and `toc-` respectively. Below each header, insert the matching TOC locator:
  ```markdown
  ## My Header
  <a id="a-myheader"></a>[TOC](#toc-myheader)
  ```
  And in the Table of Contents, each item must be formatted as:
  ```markdown
  - [My Header](#a-myheader) <a id="toc-myheader"></a> ^toc-myheader
  ```
- **TOC Indentation & Nesting Rules**:
  Indent sub-headers by exactly 2 spaces per nesting level under `##`.
- **Unique Heading IDs**:
  Duplicate heading content is strictly prohibited. For log entry subheadings, append the sanitized timestamp anchor. For other duplicates, append `-1`, `-2`, etc.
- **No Bare URL Links (MD034)**: Wrap raw URLs in angle brackets `<https://example.com>` or markdown links.
- **Spaces Surrounding List Items (MD030)**: Ensure exactly one space after a list bullet marker (`-`).

---

## ✒️ Formatting & Syntax Style
<a id="a-formattingsyntaxstyle"></a>[TOC](#toc-formattingsyntaxstyle)
- **Indentation**: Use tabs for TypeScript and JavaScript code indentation.
- **Braces and Blocks**: Always use braces for control expressions (`if`, `for`, `while`), never inline single-line statements without brackets.
- **TypeScript Guidelines**: Follow Google TypeScript Style Guide, allowing Container Classes.
- **Container Classes**:
  ```typescript
  class TheContainer {
  	static const val = 1;
  	static fn() {}
  }
  ```
  Inside functions, alias container classes:
  ```typescript
  function execute() {
  	const Tc_ = TheContainer;
  	Tc_.fn();
  }
  ```
- **JsDocs**: Annotate methods and properties with `@param`, `@returns`, `@type`, `@member`, `@var`, and `@property`.
- **Global Function Ordering**: Order functions by dependency within regions, or alphabetically if no dependencies.

---

## 🛡️ Robustness & Error-Handling Frameworks
<a id="a-robustnesserrorhandlingframeworks"></a>[TOC](#toc-robustnesserrorhandlingframeworks)
- **Primary Paradigm:** Asynchronous file operations using `vscode.workspace.fs` wrapped in `try/catch` blocks.
- **Defensive Checks:** Always validate active editor state and file path strings before executing disk operations.
- **Logging Integration:** Failures output details to VS Code error notifications or the developer output channel.

---

## 📂 Regions Division Style
<a id="a-regionsdivisionstyle"></a>[TOC](#toc-regionsdivisionstyle)
- **Structures**: Keep classes inside a region named `_classes` and wrap individual classes in `_class_{classname}`.
- **Inner Class Regions**:
  - `_class_{classname}_types`
  - `_class_{classname}_vars`
  - `_class_{classname}_properties`
  - `_class_{classname}_members`
  - `_class_{classname}_ctor`
  - `_class_{classname}_functions`

---
## 🚀 Go to...
<a id="a-goto"></a>[TOC](#toc-goto)
- 🔹 [AGENTS.md](../AGENTS.md)
- 🔹 [ARCHIVE.md](ARCHIVE.md)
- 🔹 [BUILD.md](BUILD.md)
- 🔸 [CODE.md](CODE.md)
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

<!-- # TEMPLATE: CODE.template.md -->
