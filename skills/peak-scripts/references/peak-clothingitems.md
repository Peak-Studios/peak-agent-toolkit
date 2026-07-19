# peak-clothingitems

FiveM resource that turns worn clothing into metadata-backed inventory items.

Repository: https://github.com/Peak-Studios/peak-clothingitems
Source commit: 71c0bf8f8cf4597a267d8e02dacf024386607fe2

## peak-clothingitems

# peak-clothingitems

Turn worn GTA V clothing into inventory items for FiveM servers. Players can remove clothing, store it, trade it, and wear it again while preserving drawable, texture, model, and sex metadata.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Features

## Features

- 15 supported clothing slots: masks, torso, pants, bags, shoes, accessories, undershirts, vests, decals, tops, hats, glasses, earrings, watches, and bracelets.
- Framework auto-detection for QBCore, QBox, ESX, and standalone mode.
- Inventory support for `ox_inventory`, `qb-inventory`, `ps-inventory`, `qs-inventory`, and `codem-inventory`.
- Appearance persistence through `illenium-appearance`, `rcore_clothing`, `fivem-appearance`, or `skinchanger`.
- Command flow with `/clothing remove <slot|all>` and `/clothing list`.
- Optional radial menu integration through `ox_lib` or `qb-radialmenu`.
- Admin item grant command with ACE/framework permission checks.
- Server-side item-use confirmation tracking to prevent forged refund events.
- Localized strings for English, French, Spanish, and Arabic.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Requirements

## Requirements

- FiveM artifact with `lua54` support.
- One supported framework, or standalone mode.
- One supported inventory system for item storage.
- Optional but recommended: one supported appearance resource for persistence.
- Optional: `ox_lib` for notifications/radial menu.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Quick Start

## Quick Start

1. Place `peak-clothingitems` in your server `resources` folder.
2. Add the inventory item definitions from `install/` to your inventory.
3. Copy the transparent item icons from `images/` into your inventory image folder.
4. Add this to `server.cfg` after your framework, inventory, and appearance resources:

```cfg
ensure peak-clothingitems
```

5. Leave `shared/config.lua` on `auto` or set your exact systems.
6. Restart the server and test `/clothing list`, `/clothing remove hat`, and using the generated clothing item.

For a full setup guide, see [INSTALLATION.md](INSTALLATION.md).

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Commands

## Commands

| Command | Description |
| :--- | :--- |
| `/clothing remove <slot>` | Removes one worn clothing slot and converts it into an inventory item. |
| `/clothing remove all` | Converts all currently worn non-default supported slots into inventory items. |
| `/clothing list` | Lists currently worn removable slots. |
| `/clothingadmin give <player_id> <slot> <drawable> <texture>` | Gives a metadata-backed clothing item to a player. |

Available slots:

```text
mask, torso, pants, bag, shoes, accessory, undershirt, vest, decal, top,
hat, glasses, earring, watch, bracelet
```

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Documentation

## Documentation

- [Installation](INSTALLATION.md)
- [Configuration](CONFIGURATION.md)
- [API Reference](API.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Security](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

`PROMPT.md` is included for AI-assisted installation in customer servers.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Included Item Images

## Included Item Images

The `images/` folder contains one 256x256 transparent PNG for each clothing item. Copy these files into your inventory image directory, such as `qb-inventory/html/images/`, `ps-inventory/html/images/`, or the equivalent folder for your inventory resource.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Security Notes

## Security Notes

The server validates slot payloads, rate-limits clothing conversion, and only refunds worn items when a matching server-created pending wear action exists. Client ped state still originates from the player client because FiveM clothing drawable reads are client-side in this resource flow. Do not expose additional server events that grant clothing items without similar validation.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## License

## License

MIT. See [LICENSE](LICENSE).

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/README.md

## Installation

# Installation

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## 1. Install The Resource

## 1. Install The Resource

Place the folder in your FiveM server resources directory:

```text
resources/[peak]/peak-clothingitems
```

Start it after your framework, inventory, and appearance resources:

```cfg
ensure ox_lib
ensure qb-core
ensure ox_inventory
ensure illenium-appearance
ensure peak-clothingitems
```

Adjust the example for your actual stack.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## 2. Register Inventory Items

## 2. Register Inventory Items

Every clothing item must be unique or non-stacking because metadata stores the exact drawable, texture, model, and sex.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## ox_inventory

### ox_inventory

Copy the entries from `install/ox_inventory_items.lua` into:

```text
ox_inventory/data/items.lua
```

The ox entries must include `server = { export = 'peak-clothingitems.useClothingItem' }`.
Without that export, ox_inventory will show the items but will not call this resource when a player uses them.

Copy the included icons from `images/` into the image path used by your `ox_inventory` build or theme.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## QBCore / qb-inventory / ps-inventory

### QBCore / qb-inventory / ps-inventory

Copy the entries from `install/qb_shared_items.lua` into:

```text
qb-core/shared/items.lua
```

Then copy the included icons from `images/` into your inventory image folder, for example:

```text
qb-inventory/html/images/
ps-inventory/html/images/
```

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## ESX

### ESX

Run the SQL from `install/esx_items.sql` against your database.

If your ESX inventory UI uses item icons, copy the included PNGs from `images/` into that inventory's image folder.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## 3. Configure The Resource

## 3. Configure The Resource

Open `shared/config.lua`. The defaults use `auto` detection:

```lua
Config.Framework = 'auto'
Config.Inventory = 'auto'
Config.Appearance = 'auto'
Config.Notify = 'auto'
Config.RadialMenu = 'auto'
```

If auto-detection chooses the wrong resource, set the exact value documented in [CONFIGURATION.md](CONFIGURATION.md).

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## 4. Permissions

## 4. Permissions

The admin command is ACE-restricted and also checks framework admin groups:

```cfg
add_ace group.admin command.clothingadmin allow
```

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## 5. Validation Checklist

## 5. Validation Checklist

After restart, confirm the server logs show:

```text
[peak-clothingitems] Server initialized. Framework: <name> | Inventory: <name>
[peak-clothingitems] Registered 15 usable clothing items
```

Then test in game:

1. Wear a supported item, such as a hat.
2. Run `/clothing list`.
3. Run `/clothing remove hat`.
4. Confirm the item appears in inventory with metadata.
5. Use the item.
6. Confirm it returns to the same clothing slot.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/INSTALLATION.md

## Configuration

# Configuration

All user-facing options live in `shared/config.lua`.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## System Detection

## System Detection

| Option | Default | Values |
| :--- | :--- | :--- |
| `Config.Framework` | `'auto'` | `'auto'`, `'qbcore'`, `'qbox'`, `'esx'`, `'standalone'` |
| `Config.Inventory` | `'auto'` | `'auto'`, `'ox_inventory'`, `'qb-inventory'`, `'qs-inventory'`, `'codem-inventory'`, `'ps-inventory'` |
| `Config.Appearance` | `'auto'` | `'auto'`, `'illenium-appearance'`, `'rcore_clothing'`, `'fivem-appearance'`, `'skinchanger'` |
| `Config.Notify` | `'auto'` | `'auto'`, `'ox_lib'`, `'qb-core'`, `'esx'`, `'native'` |
| `Config.RadialMenu` | `'auto'` | `'auto'`, `'ox_lib'`, `'qb-radialmenu'`, `'none'` |

Use `auto` unless your server has multiple compatible resources running.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## Commands

## Commands

| Option | Default | Description |
| :--- | :--- | :--- |
| `Config.Command` | `'clothing'` | Base player command. |
| `Config.AllowRemoveAll` | `true` | Enables `/clothing remove all`. |

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## Items

## Items

| Option | Default | Description |
| :--- | :--- | :--- |
| `Config.ItemPrefix` | `'clothing_'` | Naming convention for bundled item definitions. |
| `Config.DefaultWeight` | `100` | Default weight reference for clothing definitions. |

The included slot definitions currently use explicit item names in `shared/items.lua`. If you rename items, update both `shared/items.lua` and the inventory definitions in `install/`.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## Behavior

## Behavior

| Option | Default | Description |
| :--- | :--- | :--- |
| `Config.Cooldown` | `2000` | Client and server cooldown in milliseconds between conversion actions. |
| `Config.EnableRadialMenu` | `true` | Enables supported radial menu registration. |
| `Config.Locale` | `'en'` | Active locale file. |
| `Config.Debug` | `false` | Prints extra diagnostics to console. |

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## Clothing Defaults

## Clothing Defaults

Default bare values are defined in `shared/items.lua` under `ClothingItems.DefaultValues`. Adjust them if your server uses custom base clothing packs where the default bare drawable differs from the included freemode defaults.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/CONFIGURATION.md

## API Reference

# API Reference

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Server Exports

## Server Exports

```lua
exports['peak-clothingitems']:GetFrameworkName()
exports['peak-clothingitems']:IsReady()
exports['peak-clothingitems']:AddItem(source, itemName, count, metadata)
exports['peak-clothingitems']:RemoveItem(source, itemName, count, slot)
exports['peak-clothingitems']:HasItem(source, itemName, count)
```

These exports are thin wrappers around the active framework and inventory bridge.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Client Functions

## Client Functions

The resource exposes functions on the shared `Peak.Client` table for internal integrations:

```lua
Peak.Client.RemoveClothingPiece('prop', 0)
Peak.Client.RemoveAllClothing()
Peak.Client.WearClothingPiece(metadata)
Peak.Client.GetWornClothing()
```

Prefer commands or inventory item usage for normal gameplay. Direct calls should only be used by trusted client-side integrations in your own resources.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Events

## Events

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Client Events

### Client Events

```lua
TriggerClientEvent('peak-clothingitems:client:wearItem', source, metadata)
TriggerClientEvent('peak-clothingitems:client:adminNotify', source, message, type)
```

`wearItem` is intended for this resource's server flow after the inventory item has been removed.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Server Events

### Server Events

```lua
TriggerServerEvent('peak-clothingitems:server:confirmWear', success, metadata)
```

The server only honors this event when the player has a matching pending wear action that was created by item use. Forged confirmations are ignored and logged.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Metadata Shape

## Metadata Shape

Inventory items use this metadata:

```lua
{
    description = 'Hat (mp_m_freemode_01^prop_0_12)',
    type = 'prop', -- 'component' or 'prop'
    componentId = 0,
    drawableId = 12,
    textureId = 0,
    model = 'mp_m_freemode_01',
    sex = 'male',
    label = 'Hat'
}
```

`componentId` is used for both GTA component IDs and prop IDs. The `type` field determines which native is used.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/API.md

## Troubleshooting

# Troubleshooting

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Items Do Not Appear In Inventory

## Items Do Not Appear In Inventory

- Confirm the item definitions were added to your inventory resource.
- Confirm clothing items are unique or non-stacking.
- Confirm the inventory resource starts before `peak-clothingitems`.
- Enable `Config.Debug = true` and check the server console for bridge warnings.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Item Can Be Removed But Not Worn

## Item Can Be Removed But Not Worn

- Check that the item metadata exists in the inventory item.
- For `ox_inventory`, confirm every clothing item definition has `server = { export = 'peak-clothingitems.useClothingItem' }`.
- Make sure the player model matches the metadata model. Male and female freemode clothing is not interchangeable.
- Remove clothing already occupying the target slot before using the item.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Clothing Does Not Persist After Reconnect

## Clothing Does Not Persist After Reconnect

- Confirm a supported appearance resource is running.
- Set `Config.Appearance` explicitly if auto-detection finds the wrong resource.
- Check the appearance resource logs for save errors.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Radial Menu Does Not Show

## Radial Menu Does Not Show

- Confirm `Config.EnableRadialMenu = true`.
- Confirm `Config.RadialMenu` is set to `auto`, `ox_lib`, or `qb-radialmenu`.
- Make sure the radial menu resource starts before `peak-clothingitems`.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Admin Command Denied

## Admin Command Denied

Add ACE permission:

```cfg
add_ace group.admin command.clothingadmin allow
```

Framework admin and god groups are also accepted for QBCore, QBox, and ESX.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md

## Custom Clothing Packs Use Different Bare Values

## Custom Clothing Packs Use Different Bare Values

Edit `ClothingItems.DefaultValues` in `shared/items.lua`. If a default value is wrong, the script may think a bare slot is removable or may reset to the wrong drawable.

Source: https://github.com/Peak-Studios/peak-clothingitems/blob/71c0bf8f8cf4597a267d8e02dacf024386607fe2/TROUBLESHOOTING.md
