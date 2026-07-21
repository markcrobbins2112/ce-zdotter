---
title: zdot-for-ai
---

# zdot-for-ai

This specification defines the system architecture, data schemas, and behavioral rules for **Zdotter**, a cross-file hyperlinking and anchor tracking protocol. 

AI agents must follow this specification when parsing, generating, refactoring, or navigating codebases and knowledge graphs that utilize Zdotter.

---

## 1. System Overview

Zdotter is an anchor-and-link protocol designed to create permanent, explicit relationships between arbitrary lines of text across separate files without relying on strict directory structures or language-specific ASTs (Abstract Syntax Trees).

*   **Anchors (`z.`)**: The definitive source location (home base) for a piece of information.
*   **Links (`z-`)**: A point-of-reference that navigates back to the anchor.
*   **Tracking Index (`.zdoti`)**: A flat-file decentralized registry that maps individual unique IDs to their current physical file paths.

---

## 2. Token Anatomy & Regex Definitions

All unique IDs (referred to as `ZdotValues`) are exactly **18 digits** long, derived from a temporal-random format.

### 2.1 ZdotValue Composition

YYYY MM DD HH MM SS RRRR
├─── ├── ── ── ── ── └─── Random Suffix (4 digits, padded)
│    │  │  │  │  └─── Second (2 digits, padded)
│    │  │  │  └─ Minute (2 digits, padded)
│    │  │  └─ Hour (2 digits, padded)
│    │  └─ Day (2 digits, padded)
│    └─ Month (2 digits, padded)
└─── Year (4 digits)



### 2.2 Formal Regular Expressions
Agents must parse documents using the following regex patterns:

*   **Anchor (Dot Variant):** `/z\.([0-9]{18})/g`
    *   *Example match:* `z.202606280324001234`
*   **Link (Dash Variant):** `/z-([0-9]{18})/g`
    *   *Example match:* `z-202606280324001234`

---

## 3. Storage Architecture (`.zdoti` Files)

To support global cross-file lookup without scanning the entire workspace on every query, the protocol maintains a hidden index directory called `.zdotter`.

### 3.1 Directory Resolution Order
Agents resolving the tracking directory must look in this order:
1.  User-configured environment pathway (`zdotdir`).
2.  A folder named `.zdotter` inside the root of the current active workspace.
3.  A folder named `.zdotter` inside the user's OS home directory (`~/.zdotter`).

### 3.2 Sharding Path Schema
To prevent performance degradation in deep directories, `.zdoti` tracking files must be sharded chronologically based on the 18-digit ID:

[zdotDir] / [YYYY] / [MM] / [DD] / [HHMMSSRRRR].zdoti

*Example:* For ID `202606280324001234`, the metadata file is stored at:
`📂 .zdotter/2026/06/28/0324001234.zdoti`

### 3.3 File Content Format
A `.zdoti` file is a plain-text file. The **first line** must always contain the absolute system path to the file containing the anchor (`z.`).
```text
/Users/username/projects/notes/architecture_plan.md
[Optional: Historical metadata or user logs go here]
```

---

## 4. Operational Behaviors

### 4.1 Insertion Logic (Writing Anchors)
When creating a new anchor:
1.  Generate a valid 18-digit `ZdotValue`.
2.  If bulk-inserting across multiple cursors, each cursor must get a mathematically unique ID.
3.  Write or update the `.zdoti` file tracking path. If the file already exists, overwrite the first line with the current file path while preserving subsequent lines.

### 4.2 Codebase Sync Protocol
If files are moved, renamed, or refactored outside of the Zdotter environment, the registry becomes stale. Agents must provide a sync operations loop:
1.  Scan the active document for all strings matching the **Anchor** regex (`z.([0-9]{18})`).
2.  Extract unique matches.
3.  For each match, write/update its corresponding `.zdoti` registry file with the current document's absolute path.

### 4.3 Resolution & Navigation (Following Links)
When an instruction demands resolving or jumping to a token:
1.  Determine if the token under the cursor is a Dot (`z.`) or a Dash (`z-`).
2.  Extract the 18-digit `ZdotValue`.
3.  Compute the target `.zdoti` path matching the chronological shard schema.
4.  Read the **first line** of the `.zdoti` file to resolve the target absolute file path.
5.  Open the target file.
6.  Perform a string search for the sequence `z.[ZdotValue]`.
7.  Place the cursor selection range directly on the discovered index.

### 4.4 Proximity Translation
When linking context to nearby text blocks without creating a new ID:
1.  Search up to 10 lines above and 10 lines below the cursor line.
2.  Calculate the absolute distance weight using:
    Distance = |Target Line - Cursor Line| + (|Target Column - Cursor Column| / 1000)
3.  Select the anchor match with the smallest distance weight.
4.  Translate the discovered `z.[ID]` format into a `z-[ID]` text block and copy it to the system clipboard for immediate linking usage.

---

## 5. Agent Capabilities Checklist

When acting as an assistant processing codebases containing Zdotter patterns, you are expected to:
* [ ] **Identify Anchor/Link Pairs**: Detect when text blocks refer to each other using identical 18-digit values.
* [ ] **Maintain Index Integrity**: Remember to generate or update the backing `.zdoti` file path structure whenever rewriting files containing `z.` symbols.
* [ ] **Contextual Extraction**: When asked to "fetch notes about X," look for any `z-` links referencing an anchor inside document X, and pull those text lines into the context graph.