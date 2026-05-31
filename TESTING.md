# Testing
<!--
You can use this interactive test sheet directly with IDX inside VS Code to verify that all systems are fully functional. Put your cursor on these checkbox lines, and use our Quick Actions to mark them done!
-->

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
- ▪️[SPEC.md](SPEC.md)
- 🔸[TESTING.md](TESTING.md)

---
## 🔵 Setup & Environment Check
- [ ] Verify that building the project succeeds by running `npm run compile`.
- [ ] Confirm `package.json` correctly exposes settings and registers all 17 commands under the contribution fields.
- [ ] Check if `zdotter.zdotdir` is configured. If left blank, ensure it defaults safely to `<workspace>/.zdotter`.

## 🟢 Indicator, Gutter & Multi-Match Checks
- [ ] Open a source file and verify that any inline `z.<digits>` strings are picked up by the syntax and gutter highlighting.
- [ ] Verify that a `z.<digits>` line shows a clear visual indicator in the editor gutter.
- [ ] Verify that `z-<digits>` lines are formatted differently (such as dimmed text decoration) to visually separate anchors from definitions.

## ⚡ Active Action & Suggestion Testing
- [ ] Put the cursor on any sentence and run `zdotter.insertZdot`. Check that a new `z.<digits>` is appended.
- [ ] Verify that a corresponding `.zdoti` file is created inside the index folder named after the new ID (e.g. `20260531123456.zdoti`).
- [ ] Verify that the first line of the newly created `.zdoti` matches your exact active editor file path.
- [ ] Test template variations: run `zdotter.insertTemplate3`. Check that it correctly resolves to HTML syntax `<a id="z<digits>"></a>` and creates the `.zdoti` index.

## 🕹️ Command Suite Walkthrough
- [ ] Test cursor freezing toggle: toggle freeze on, run `insertZdot`, and verify the cursor remains at the start of the token. Toggle freeze off and check that the cursor snaps after the inserted text.
- [ ] Test jump logic: insert a zdash `z-20260531123456` in a dummy log file. Use the lookup command `zdotter.gotoZdot` and confirm the editor opens the source file and scrolls directly to center on `z.20260531123456`.
- [ ] Test wrap navigation: insert list of three dots `z.1`, `z.2`, `z.3` in a single file and execute next/prev commands to cycle focus correctly.

## 🚀 Advanced Utilities & Multi-line QA List
- [ ] Test bulk files: move a file containing `z.9999` to another folder. Trigger `zdotter.updateFile` and check that the path in file `9999.zdoti` updates cleanly.
- [ ] Verify translation copy: click on a zdot, press copy key combination/command `zdotter.copyAsZdash`, and paste. Ensure `z-<digits>` is in the clipboard.
- [ ] Validate `zdotter.zdashLine`: replace all dots on a line with dashes successfully.
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
