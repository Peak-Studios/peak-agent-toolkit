# peak-barbers

Peak Barbers FiveM barbershop resource

Repository: https://github.com/Peak-Studios/peak-barbers
Source commit: 8e7a96923e36752e03b003e2b58de0d00f85512b

## Peak Barbers

# Peak Barbers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)](version.json)
[![Discord](https://img.shields.io/badge/Discord-Peak_Studios-7289DA.svg)](https://dsc.gg/peakstudios)

Peak Barbers is a FiveM barbershop resource with GTA chair scenario seating, barber NPC animations, live appearance preview, `peak-bridge` integration, and a React + TypeScript NUI.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Features

## Features

- Native GTA chair scenario seating with camera setup and cleanup
- Temporary barber NPC and scissors prop during sessions
- Hair, beard, eyebrow, eye color, and makeup controls
- Live preview with save on payment or rollback on cancel
- ESX, QBCore, and Qbox support through `peak-bridge`
- Appearance save/reload support through `peak-bridge`
- `ox_target`, `qb-target`, `qtarget`, or marker interaction modes
- Localized UI strings in English, French, Spanish, and Arabic
- Built NUI included in `ui/dist`
- Configurable side-docked NUI offsets, chair placement, and camera framing
- Server-authoritative chair IDs, single-chair reservations, and proximity validation

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Dependencies

## Dependencies

Required:

- A supported framework: `es_extended`, `qb-core`, or `qbx_core`
- `peak-bridge`
- A supported appearance resource configured in `peak-bridge`: `illenium-appearance`, `fivem-appearance`, `qb-clothing`, `rcore_clothing`, or `skinchanger`

Optional, based on configuration:

- `ox_target`, `qb-target`, or `qtarget`

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Installation

## Installation

For a step-by-step beginner setup, read [INSTALL.md](INSTALL.md).

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## AI-First Setup

### AI-First Setup

1. Open [PROMPT.md](PROMPT.md).
2. Paste it into your AI coding assistant.
3. Let it inspect your server resources and update [shared/config.lua](shared/config.lua).

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Manual Setup

### Manual Setup

1. Place this folder in your resources directory as `peak-barbers`.
2. Ensure `peak-bridge` is installed and configured for your framework and appearance resource.
3. Open [shared/config.lua](shared/config.lua) and set `Config.InteractionType`.
4. Ensure dependencies before this resource:

```cfg
ensure es_extended
ensure illenium-appearance
ensure ox_target
ensure peak-bridge
ensure peak-barbers
```

Use your own framework, appearance, and target resource names if different.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Configuration

## Configuration

- [INSTALL.md](INSTALL.md): beginner setup guide with framework examples and common fixes.
- [docs/documentation.md](docs/documentation.md): full configuration and release notes.
- [shared/config.lua](shared/config.lua): main beginner-friendly config, pricing, target mode, UI placement, chair placement, camera framing, and shop locations.
- [locales](locales): language files used by the UI and notifications.
- [client/bridge.lua](client/bridge.lua): thin client-side wrapper around `peak-bridge`.
- [server/bridge.lua](server/bridge.lua): thin server-side wrapper around `peak-bridge`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## UI Development

## UI Development

The source NUI is in [ui](ui). Rebuild it after frontend changes:

```powershell
cd ui
npm install
npm run build
```

The manifest loads `ui/dist/index.html`. Keep `ui/dist` in release archives and do not include `ui/node_modules`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Publishing Notes

## Publishing Notes

- Do not publish `ui/node_modules`.
- Keep `ui/dist` packaged so server owners can drag and drop the resource.
- Include [INSTALL.md](INSTALL.md), [CHANGELOG.md](CHANGELOG.md), [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
- Review default shop coordinates and price before releasing a server-specific fork.
- Keep framework-specific customizations inside the bridge files where possible.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Contributing

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening issues or pull requests.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/README.md

## Peak Barbers Installation

# Peak Barbers Installation

This guide is for server owners who want the fastest safe setup.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## 1. Copy the Resource

## 1. Copy the Resource

Put the folder in your FiveM resources directory:

```text
resources/[peak]/peak-barbers
```

The folder name must stay `peak-barbers` unless you also update references and rebuild the release.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## 2. Confirm Dependencies

## 2. Confirm Dependencies

You need one framework:

- `es_extended`
- `qb-core`
- `qbx_core`

You need one appearance resource:

- `illenium-appearance`
- `fivem-appearance`
- `qb-clothing`

You also need:

- `peak-bridge`

Optional target resources:

- `ox_target`
- `qb-target`
- `qtarget`

If you do not use a target resource, set `Config.InteractionType = "marker"`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## 3. Edit Config

## 3. Edit Config

Open `shared/config.lua` and set:

```lua
Config.InteractionType = "ox_target"
Config.Price = 75
Config.Locale = "en"
```

Configure your framework and appearance resource in `peak-bridge/shared/config.lua`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## 4. Add to server.cfg

## 4. Add to server.cfg

Example ESX setup:

```cfg
ensure es_extended
ensure illenium-appearance
ensure ox_target
ensure peak-bridge
ensure peak-barbers
```

Example QBCore setup:

```cfg
ensure qb-core
ensure qb-clothing
ensure qb-target
ensure peak-bridge
ensure peak-barbers
```

Example Qbox setup:

```cfg
ensure qbx_core
ensure illenium-appearance
ensure ox_target
ensure peak-bridge
ensure peak-barbers
```

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## 5. Test In Game

## 5. Test In Game

1. Restart your server.
2. Go to a configured barber shop blip.
3. Use a chair.
4. Change hair or overlays.
5. Press Confirm & Pay.
6. Relog or reload skin to confirm the saved appearance persists.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## Common Fixes

## Common Fixes

| Problem | Fix |
| ------- | --- |
| No interaction appears | Check `Config.InteractionType` and make sure the target resource is ensured before `peak-barbers`. |
| UI opens but changes do not save | Check the appearance setting in `peak-bridge/shared/config.lua`. |
| Player cannot pay | Make sure `peak-bridge` detects your framework cash account and `Config.Price` is not higher than the player's cash. |
| No target dependency installed | Set `Config.InteractionType = "marker"`. |
| Missing text | Check `Config.Locale` and add any custom keys to the matching file in `locales/`. |
| Menu overlaps your HUD | Adjust `Config.MenuOffset.right`, `Config.MenuOffset.left`, or `Config.MenuOffset.top`. |
| Player sits too high or low | Tune the chair vector's `z` value or `Config.ChairPlacement.standZOffset`, then restart the resource. |

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## Updating the UI

## Updating the UI

Only needed if you edit files in `ui/src`:

```powershell
cd ui
npm install
npm run build
```

Keep `ui/dist` in your release. Do not ship `ui/node_modules`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/INSTALL.md

## Peak Barbers Documentation

# Peak Barbers Documentation

Peak Barbers is a FiveM barbershop resource built for easy server installation and straightforward customization.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Quick Start

## Quick Start

1. Put `peak-barbers` in your resources folder.
2. Follow [../INSTALL.md](../INSTALL.md) for the beginner setup path.
3. Configure [../shared/config.lua](../shared/config.lua).
4. Ensure your framework, appearance resource, optional target resource, `peak-bridge`, then `peak-barbers`.

Example:

```cfg
ensure es_extended
ensure illenium-appearance
ensure ox_target
ensure peak-bridge
ensure peak-barbers
```

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Main Config

## Main Config

Edit [../shared/config.lua](../shared/config.lua).

| Setting | Description |
| ------- | ----------- |
| `Config.Locale` | Active locale from the `locales` folder |
| `Config.InteractionType` | `ox_target`, `qb-target`, `qtarget`, or `marker` |
| `Config.Price` | Cash price charged when a player confirms changes |
| `Config.BarberModel` | NPC model spawned during a session |
| `Config.MenuPosition` | `left` or `right` |
| `Config.MenuOffset` | Pixel offsets used to dock the NUI away from the screen edge |
| `Config.ShowKeyHints` | Shows or hides the bottom keyboard hint bar |
| `Config.UIColors` | Accent colors for the NUI |
| `Config.ChairPlacement` | Scenario seating, camera, and exit placement tuning |
| `Config.Positions` | Shop blips and chair coordinates |

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Chair And UI Placement

## Chair And UI Placement

`Config.ChairPlacement` controls how the player enters the GTA seated chair scenario. The default placement follows the foltone barbershop approach: each chair is a `vector4`, the seated scenario starts at `z + standZOffset`, and the scenario heading is the chair heading minus 180 degrees. Use `forwardOffset`, `rightOffset`, `standZOffset`, and `headingOffset` only when a map/interior needs small corrections. Camera values in the same table control how the face and hair are framed while the NUI is open.

`Config.MenuPosition = "right"` docks the NUI on the right side by default. Adjust `Config.MenuOffset.right`, `Config.MenuOffset.left`, or `Config.MenuOffset.top` if your server HUD overlaps the barber menu.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Interaction Modes

## Interaction Modes

Use `ox_target`, `qb-target`, or `qtarget` if your server already runs a target system.

Use `marker` for a dependency-light setup. Marker mode draws a marker at each configured chair and uses the normal interact key.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Framework Bridge

## Framework Bridge

Framework-specific behavior is handled by `peak-bridge`. `peak-barbers` keeps thin compatibility wrappers in:

- [../client/bridge.lua](../client/bridge.lua)
- [../server/bridge.lua](../server/bridge.lua)

Customize `peak-bridge` for non-standard frameworks, custom notification systems, or custom money handling.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Appearance Saving

## Appearance Saving

On confirm, the script charges the configured price and saves the current appearance through `peak-bridge`.

On cancel or close, the script reloads the previous skin and releases the chair.

If `Config.Price` is `0`, the confirmation flow saves for free.

Chair reservations and payment eligibility are validated server-side. A player can reserve only one configured chair and must be within 5 meters of it when starting a session.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Adding Shops

## Adding Shops

Add a new entry to `Config.Positions`:

```lua
{
    pos = vector3(0.0, 0.0, 0.0),
    blip = { sprite = 71, color = 47, scale = 0.8, name = "Barber Shop" },
    chairs = {
        vector4(0.0, 0.0, 0.0, 0.0),
    },
}
```

`pos` controls the map blip. `chairs` controls where players can sit. A chair can be a simple `vector4` matching the in-world chair position and heading, or a table with `target`, `stand`, `exit`, and optional `camera`, `barberSpawn`, and `barberWork` values for fully custom seating.

Simple `vector4` chairs are the default path and should match the chair coordinates directly. For custom interiors, tune `target`, `stand`, and `exit` values only when the vector4 placement is not enough. Set `Config.Debug = true` to print which chairs are using custom table placement versus the default vector4 approach.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## UI Development

## UI Development

The UI source is React + TypeScript in [../ui](../ui).

```powershell
cd ui
npm install
npm run build
```

Keep `ui/dist` in releases. Do not publish `ui/node_modules`.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md

## Release Checklist

## Release Checklist

- `fxmanifest.lua` loads the correct files.
- `ui/dist` exists after running `npm run build`.
- `README.md`, `INSTALL.md`, `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `version.json` are included.
- No private credentials, webhook URLs, or server-specific secrets are included.
- Default config values are documented and beginner friendly.
- `ui/node_modules` is excluded from the release archive.

Source: https://github.com/Peak-Studios/peak-barbers/blob/8e7a96923e36752e03b003e2b58de0d00f85512b/docs/documentation.md
