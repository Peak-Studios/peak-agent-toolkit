---
name: peak-scripts
description: Install, configure, integrate, troubleshoot, or improve public Peak Studios FiveM resources using versioned documentation and source provenance. Use when working with peak-bridge, peak-chess, peak-clothingitems, peak-sprays, or peak-trucking; when selecting a compatible Peak script; or when adapting one to ESX, QBCore, Qbox, standalone, inventory, target, database, or notification systems.
---

# Peak Scripts

Use public, versioned Peak Studios documentation to guide changes to an installed resource.

## Workflow

1. Identify the resource name and installed commit or release before editing.
2. Read only the matching file under `references/`. Use MCP `search_peak_docs` when the relevant section is unclear.
3. Inspect the user's server for framework, inventory, target, database, and notification dependencies.
4. Compare the detected environment with documented compatibility. Label anything not supported by a cited source as an inference.
5. Preserve optional integrations. Do not add hard dependencies unless the documentation requires them or the user requests them.
6. Make the smallest compatible changes, then validate startup order, configuration, database setup, client/server events, and the primary gameplay flow.
7. Cite the public repository and source commit when reporting behavior.

## Reference routing

- Read `references/peak-bridge.md` for shared framework, identity, economy, or notification integration.
- Read `references/peak-chess.md` for chess tables, AI/PvP, spectators, targets, or wagers.
- Read `references/peak-clothingitems.md` for clothing metadata and inventory integration.
- Read `references/peak-sprays.md` for graffiti placement, persistence, DUI, and spray integrations.
- Read `references/peak-trucking.md` for trucking progression, missions, companies, SQL, or the dispatch NUI.

## Safety and knowledge boundary

- Treat bundled references and MCP results as public documentation, not access to private Peak Studios source.
- Inspect the user's installed files before applying a documented path or symbol because versions may differ.
- Never invent exports, events, configuration keys, SQL tables, or compatibility claims.
- Prefer repository documentation over remembered behavior and include its source URL in the result.
