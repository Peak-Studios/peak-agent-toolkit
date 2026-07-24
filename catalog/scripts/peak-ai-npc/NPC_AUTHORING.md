# Peak AI NPC Authoring Guide

This document details how to author custom AI peds in `npcs/*.lua`.

## Definition Format

```lua
AINPCDefinitions.shopkeeper = {
    id = 'shopkeeper',
    model = 'mp_m_shopkeep_01',
    coords = vec4(24.4, -1345.2, 29.5, 266.0),
    identity = { name = 'Martha', occupation = 'shopkeeper' },
    personality = 'Patient, observant, and concise. Never invents stock or prices.',
    knowledge = 'Only knows the shop catalog, public server lore, and facts returned by tools.',
    allowedTools = { 'get_shop_catalog', 'get_shop_stock', 'create_purchase_quote', 'confirm_purchase' },
    shop = { id = '247supermarket', label = '24/7 Supermarket', stock = { water = 50, sandwich = 25 } },
    interactionDistance = 3.0
}
```

## Schema Reference

- `id`: Unique identifier string matching table key.
- `model`: GTA V ped model hash string.
- `coords`: Spawn coordinate `vec4(x, y, z, heading)`.
- `identity`: Table with `name` and `occupation`.
- `personality`: Prompt guiding NPC behavioral tone.
- `knowledge`: Prompt guiding facts and boundaries.
- `allowedTools`: List of tool names authorized for this ped.
