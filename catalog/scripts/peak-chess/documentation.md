<!-- Source: https://github.com/Peak-Studios/peak-chess/blob/2e2378d97f1ea9099494045ca98c849f1a4c333e/README.md -->

# Peak Chess

![Peak Chess — 3D Multiplayer Chess, Open Source](docs/images/peak-chess-thumbnail.png)

<p align="center">
  <strong>Playable 3D chess tables for FiveM — PvP, AI, spectators, wagers, and a fully open-source NUI.</strong>
</p>

<p align="center">
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-f0b35a.svg"></a>
  <a href="version.json"><img alt="Version 1.1.0" src="https://img.shields.io/badge/version-1.1.0-171923.svg"></a>
  <a href="https://github.com/Peak-Studios/peak-chess"><img alt="GitHub" src="https://img.shields.io/badge/source-GitHub-f4f0e6.svg"></a>
  <a href="https://dsc.gg/peakstudios"><img alt="Peak Studios Discord" src="https://img.shields.io/badge/Discord-Peak%20Studios-5865F2.svg"></a>
</p>

Peak Chess is a standalone-first FiveM chess resource built for real in-world matches. Players can sit at a 3D table, challenge another player or an AI opponent, spectate active games, wager through an optional framework integration, and play a fully validated game of chess without leaving the world.

The complete Lua, chess engine, integration layer, and React/Vite interface are released under the MIT license. No escrow. No required framework. No database.

Full hosted documentation is available at [peakrp.net/docs/peak-chess](https://peakrp.net/docs/peak-chess).

![Peak Chess gameplay and in-match HUD](docs/images/peak-chess-gameplay.png)

## Features

- Complete chess rules: legal move validation, check, checkmate, stalemate, castling, en passant, promotion, resignation, and draw handling
- Player-versus-player tables with seat selection and ready states
- Configurable AI matches with easy, medium, and hard engine profiles
- Spectator support for active tables
- Optional cash wagers with server-side validation, payout, refund, and house-cut handling
- Modern React/Vite NUI for the lobby, match HUD, promotion picker, and result state
- Standalone operation with no mandatory framework, target system, database, or bridge
- Optional `peak-bridge`, ESX, QBCore, and Qbox integrations
- Optional `ox_target` and `qb-target` support
- Dependency-free draw-text interaction available by default
- Configurable tables, camera, seating, models, controls, sounds, markers, spotlights, AI profiles, and locale
- English and French locales included
- Server and client exports for integration with other resources
- Restart-safe cleanup for spawned tables, chairs, pieces, cameras, peds, and NUI state

## Requirements

- A FiveM server using the `cerulean` FXv2 runtime
- The `bzzz_chess` prop pack containing the configured table, board, chair, piece, and animation assets

Everything else is optional. Peak Chess does not require SQL, `ox_lib`, a framework, a target resource, or `peak-bridge`.

## Installation

1. Download or clone this repository into your server resources as `peak-chess`.
2. Install the `bzzz_chess` prop pack.
3. Ensure the prop pack before Peak Chess in `server.cfg`:

```cfg
ensure your_bzzz_chess_prop_pack
ensure peak-chess
```

4. Open [`shared/sh.lua`](shared/sh.lua) and configure your tables, framework mode, interaction system, wagers, and AI settings.
5. Restart the server and approach a configured chess table.

If you use `peak-bridge`, load it first:

```cfg
ensure peak-bridge
ensure your_bzzz_chess_prop_pack
ensure peak-chess
```

See [INSTALL.md](INSTALL.md) for the complete setup walkthrough.

## Configuration

The main configuration lives in [`shared/sh.lua`](shared/sh.lua).

```lua
Config.Locations = {
    { coords = vec3(-1319.881348, -925.411011, 10.19995), heading = 104.881889, blip = true },
}

Config.Target.system = 'drawtext' -- auto, ox_target, or qb-target

Config.Betting = {
    enabled  = true,
    account  = 'cash',
    min      = 0,
    max      = 50000,
    presets  = { 0, 100, 500, 1000, 5000 },
    houseCut = 0.0,
    drawRefund = true,
}
```

Standalone servers can always play zero-wager chess. Non-zero wagers are exposed only when a supported money provider is available.

## Supported Integrations

| Category | Supported options |
| --- | --- |
| Framework / money | Standalone, `peak-bridge`, ESX, QBCore, Qbox |
| Interaction | Draw text, `ox_target`, `qb-target` |
| UI | React 19 + Vite, bundled locally for FiveM NUI |
| Persistence | None required; matches are live server state |

Automatic framework detection prefers `peak-bridge`, then ESX, QBCore/Qbox, and finally standalone mode. Every gameplay payload is validated by the server; the browser UI is never treated as authoritative.

## Controls

| Control | Action |
| --- | --- |
| `E` | Open or interact with a chess table |
| Mouse | Aim at and select board squares |
| Left click | Select a piece or legal destination |
| Right click | Cancel the current selection |
| `X` | Stand up / leave the table |
| `Esc` | Close the lobby |

Controls are configurable in `Config.Target` and `Config.Interact`.

## UI Development

The editable NUI source is in [`web/src`](web/src). FiveM loads the compiled bundle from `web/build`.

```powershell
cd web
npm install
npm run build
```

Browser-safe preview states are available during development:

```text
http://localhost:5173/?debug=lobby
http://localhost:5173/?debug=hud
http://localhost:5173/?debug=promotion
http://localhost:5173/?debug=result
http://localhost:5173/?debug=all
```

While any debug preview is open, press `1` for the lobby, `2` for the HUD, `3` for promotion, `4` for the result banner, or `5` for the combined state.

Keep `web/build` in release archives and do not distribute `web/node_modules`.

## Documentation

- [Hosted Peak Chess documentation](https://peakrp.net/docs/peak-chess)
- [Installation guide](INSTALL.md)
- [Full configuration and API reference](docs/documentation.md)
- [AI-assisted server setup prompt](PROMPT.md)
- [Changelog](CHANGELOG.md)
- [Security policy](SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)

## Open Source

Peak Chess is licensed under the [MIT License](LICENSE). You can use it, inspect it, modify it, and submit improvements. Pull requests and reproducible bug reports are welcome.

Built by [Peak Studios](https://github.com/Peak-Studios).

---

<!-- Source: https://github.com/Peak-Studios/peak-chess/blob/2e2378d97f1ea9099494045ca98c849f1a4c333e/INSTALL.md -->

# Peak Chess Installation

This guide installs `peak-chess` as a standalone FiveM resource. Framework, target, and bridge integrations are optional.

The latest hosted documentation is also available at [peakrp.net/docs/peak-chess](https://peakrp.net/docs/peak-chess).

## 1. Install Files

Place the resource at:

```text
resources/[peak]/peak-chess
```

The folder name should remain `peak-chess` unless you also update every resource reference and NUI callback expectation.

## 2. Install Assets

Install the `bzzz_chess` prop pack and ensure it before `peak-chess`. The full 3D table experience expects these models and animations:

- `bzzz_chess_table_a`
- `bzzz_chess_board_a`
- `bzzz_chess_chair_a`
- `bzzz_chess_color_a1` through `bzzz_chess_color_a6`
- `bzzz_chess_color_b1` through `bzzz_chess_color_b6`
- `bzzz_chess_animations`

## 3. Add Server Ensures

Standalone server:

```cfg
ensure your_bzzz_chess_prop_pack
ensure peak-chess
```

Server using `peak-bridge`:

```cfg
ensure peak-bridge
ensure your_bzzz_chess_prop_pack
ensure peak-chess
```

Optional target resources such as `ox_target` and `qb-target` should start before `peak-chess` when used.

## 4. Configure Framework Mode

Open [shared/sh.lua](shared/sh.lua).

By default, `Shared.Framework.autoDetect = true`:

1. Uses `peak-bridge` when the resource is started.
2. Falls back to ESX when `es_extended` is started.
3. Falls back to QBCore when `qb-core` is started.
4. Falls back to Qbox when `qbx_core` is started.
5. Uses standalone mode otherwise.

Manual framework selection is also supported:

```lua
Shared.Framework = {
    autoDetect = false,
    PeakBridge = false,
    ESX        = false,
    QBCore     = false,
    Qbox       = false,
    Standalone = true,
}
```

## 5. Configure Tables

Edit `Config.Locations` in [shared/sh.lua](shared/sh.lua):

```lua
Config.Locations = {
    { coords = vec3(-1319.881348, -925.411011, 10.19995), heading = 104.881889, blip = true },
}
```

Each entry becomes a chess table. Table IDs are the array index, starting at `1`.

## 6. Configure Interaction

`drawtext` is the default and has no dependency:

```lua
Config.Target.system = 'drawtext'
```

Optional values:

- `auto`
- `ox_target`
- `qb-target`

If the configured target resource is missing, use `drawtext` or `auto`.

## 7. Configure Wagers

Wagers are optional. Standalone mode always supports playable no-wager chess.

```lua
Config.Betting = {
    enabled  = true,
    account  = 'cash',
    min      = 0,
    max      = 50000,
    presets  = { 0, 100, 500, 1000, 5000 },
    houseCut = 0.0,
    drawRefund = true,
}
```

Non-zero wagers require a money provider through `peak-bridge`, ESX, QBCore, or Qbox. Without a provider, the UI hides wager controls and the server sanitizes wager values to `0`.

## 8. Configure AI

AI play is enabled by default:

```lua
Config.AI.enabled = true
```

Each AI level has a search depth, randomness value, and move delay. Keep `Config.AI.maxThinkMs` conservative on busy servers.

## 9. Build The UI

The repository includes `web/build`, but run a fresh build after UI changes:

```powershell
cd web
npm install
npm run build
```

The generated bundle must remain at `web/build/index.html` because `fxmanifest.lua` points there.

## 10. Validate In Game

Check these flows after installation:

- Start with no framework and no `peak-bridge`; confirm a zero-wager PvP game can be played.
- Start with `peak-bridge`; confirm identity, notifications, and optional money integration work.
- Start an AI game from the lobby.
- Run a PvP ready flow from both seats.
- Attempt an illegal move and confirm it is rejected.
- Promote a pawn and confirm the promotion modal appears.
- Test resignation, checkmate, stalemate, spectator mode, and resource restart cleanup.

---

<!-- Source: https://github.com/Peak-Studios/peak-chess/blob/2e2378d97f1ea9099494045ca98c849f1a4c333e/docs/documentation.md -->

# Peak Chess Documentation

The hosted documentation is available at [peakrp.net/docs/peak-chess](https://peakrp.net/docs/peak-chess).

## Overview

`peak-chess` provides playable chess tables for FiveM. It supports PvP, AI matches, spectators, optional wagers, and a React/Vite NUI. The runtime is standalone by default and does not require a framework, target system, database, or `peak-bridge`.

The full 3D chess table experience requires the `bzzz_chess` prop pack.

## Screenshots And Publication Assets

Release-ready images live in `docs/images/`:

- `peak-chess-thumbnail.png`: primary GitHub and Cfx.re forum thumbnail
- `peak-chess-gameplay.png`: in-game board and active HUD screenshot

The repository README references both files. Keep the filenames stable so GitHub image links continue to work.

## Resource Layout

```text
client/             Client gameplay, rendering, NUI, exports, framework wrappers
server/             Match lifecycle, validation, AI, betting, exports
shared/             Config, locale, chess engine
web/src/            React + Vite NUI source
web/build/          Compiled NUI loaded by fxmanifest.lua
docs/               Long-form documentation
```

## Required Asset

Install and ensure the `bzzz_chess` prop pack before `peak-chess`. The config expects table, board, chair, piece, and animation assets from that pack.

## Optional Integrations

### Framework And Bridge

`Shared.Framework.autoDetect = true` checks resources in this order:

1. `peak-bridge`
2. `es_extended`
3. `qb-core`
4. `qbx_core`
5. Standalone

`peak-bridge` is optional. When it is started and ready, `peak-chess` uses it for framework detection, identity, money, and notifications. If it is absent, the resource falls back to local ESX/QBCore/Qbox wrappers or standalone behavior.

### Target System

`Config.Target.system` supports:

- `drawtext`: default, no dependency
- `auto`: detect a supported optional target
- `ox_target`
- `qb-target`

Use `drawtext` for the most portable setup.

### Betting

Standalone play works with wagers set to `0`. Non-zero wagers require a money provider through `peak-bridge`, ESX, QBCore, or Qbox.

The server sanitizes wagers and refuses economy movement without a money provider.

## Core Config

### Tables

```lua
Config.Locations = {
    { coords = vec3(-1319.881348, -925.411011, 10.19995), heading = 104.881889, blip = true },
}
```

Each entry creates one table. Table IDs are the array indexes.

### AI

```lua
Config.AI = {
    enabled = true,
    levels = {
        { id = 'easy', depth = 2, randomness = 0.35, moveDelay = { 1800, 3500 } },
        { id = 'medium', depth = 3, randomness = 0.12, moveDelay = { 2200, 4500 } },
        { id = 'hard', depth = 4, randomness = 0.0, moveDelay = { 2800, 6000 } },
    },
    maxThinkMs = 1500,
}
```

Only configured AI level IDs are accepted by the server.

## Server Events

These are internal gameplay events. Payloads are validated server-side.

```lua
TriggerServerEvent('peak-chess:sit', tableId, 'white' or 'black')
TriggerServerEvent('peak-chess:spectate', tableId)
TriggerServerEvent('peak-chess:requestState', tableId)
TriggerServerEvent('peak-chess:leave', tableId)
TriggerServerEvent('peak-chess:startAI', tableId, 'white' or 'black', 'easy' or 'medium' or 'hard', bet)
TriggerServerEvent('peak-chess:setReady', tableId, ready, bet)
TriggerServerEvent('peak-chess:move', tableId, fromSquare, toSquare, promotionPiece)
TriggerServerEvent('peak-chess:resign', tableId)
```

Valid squares use chess notation from `a1` through `h8`. Valid promotion pieces are `q`, `r`, `b`, and `n`.

## Client Events

```lua
RegisterNetEvent('peak-chess:self', function(data) end)
RegisterNetEvent('peak-chess:sync', function(snapshot) end)
RegisterNetEvent('peak-chess:gameover', function(data) end)
RegisterNetEvent('peak-chess:lobbyState', function(snapshot) end)
RegisterNetEvent('peak-chess:notify', function(message, kind) end)
```

## Server Exports

### GetMatch

```lua
local match = exports['peak-chess']:GetMatch(1)
```

Returns a sanitized match object or `nil`.

### GetPlayerMatch

```lua
local data = exports['peak-chess']:GetPlayerMatch(source)
```

Returns `{ tableId, color, status }` when the player is seated, otherwise `nil`.

### IsPlayerInGame

```lua
local inGame = exports['peak-chess']:IsPlayerInGame(source)
```

Returns `true` when the player is seated in a playing match.

### GetActiveMatches

```lua
local active = exports['peak-chess']:GetActiveMatches()
```

Returns an array of active playing matches.

### StartAIGame

```lua
local ok = exports['peak-chess']:StartAIGame(source, 1, 'white', 'medium', 0)
```

Starts an AI game when the table, side, level, and wager are valid.

### ForceEndMatch

```lua
local ok = exports['peak-chess']:ForceEndMatch(1, 'white')
```

Force-ends a playing match. `winnerColor` may be `white`, `black`, or `nil` for no winner.

## Client Exports

### IsSeated

```lua
local seated = exports['peak-chess']:IsSeated()
```

### IsInGame

```lua
local playing = exports['peak-chess']:IsInGame()
```

### GetCurrentTable

```lua
local tableId = exports['peak-chess']:GetCurrentTable()
```

### GetColor

```lua
local color = exports['peak-chess']:GetColor()
```

Returns `white`, `black`, or `nil`.

### OpenLobby

```lua
local opened = exports['peak-chess']:OpenLobby(1)
```

Opens the NUI lobby for a valid table.

## NUI Messages

The client sends these messages into the React app:

- `lobby`: show or update the lobby
- `hud`: show or update the active HUD
- `promotion`: show or hide promotion selection
- `gameover`: show the result banner
- `closeAll`: close all UI states

## NUI Callbacks

The React app posts these callbacks back to FiveM:

- `sit`
- `spectate`
- `startAI`
- `setReady`
- `resign`
- `promote`
- `leave`
- `closeLobby`

## UI Development

Install dependencies and build:

```powershell
cd web
npm install
npm run build
```

Debug views are available in a browser preview:

```text
?debug=lobby
?debug=hud
?debug=promotion
?debug=result
?debug=all
```

Debug pages also support state shortcuts without navigation: `1` lobby, `2` HUD, `3` promotion, `4` result, and `5` combined.

The UI uses plain CSS tokens and components. It intentionally avoids Tailwind output, `backdrop-filter`, `backdrop-blur`, and blur overlay utilities.

### Visual System

The interface uses a transparent FiveM document with an ink-and-brass visual system:

- `BBH Sans Bartle` is the display face for the product name, result state, and pot value.
- `Poppins` is the utility face for controls and match information.
- Warm brass is the single primary action and selection color.
- Lobby, HUD, promotion, and result states share the same surface, border, spacing, and motion tokens.
- Motion is limited to panel entry, state entry, hover feedback, and the active-turn pulse.
- `prefers-reduced-motion` collapses animation and transition durations for accessibility.

Do not add an opaque background to `html`, `body`, or `#root`; hidden NUI transparency is required to prevent the interface from covering gameplay.

## Validation Checklist

- Start without `peak-bridge`; play a zero-wager PvP game.
- Start with `peak-bridge`; confirm money, identity, and notifications.
- Start an AI game.
- Complete a PvP ready flow.
- Attempt legal and illegal moves.
- Promote a pawn.
- Resign.
- Reach checkmate and stalemate.
- Open spectator HUD.
- Restart the resource during and after a match.
- Run the UI build and audit for forbidden backdrop CSS.

## Troubleshooting

### Props Do Not Spawn

Confirm the `bzzz_chess` prop pack is installed, started before `peak-chess`, and uses the model names configured in `Config.Models`.

### Wagers Do Not Appear

Wagers are hidden when no money provider is available. Start `peak-bridge`, ESX, QBCore, or Qbox before `peak-chess`, or keep wagers at `0`.

### Target Interaction Does Not Appear

Use `Config.Target.system = 'drawtext'` first. Once drawtext works, switch to an optional target system if desired.

### UI Does Not Load

Run `npm run build` from `web` and confirm `web/build/index.html` exists. The manifest must continue to load `web/build/index.html`.
