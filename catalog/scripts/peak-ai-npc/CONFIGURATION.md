# Peak AI NPC Configuration

This document covers all open configuration settings in `shared/config.lua`.

## Configuration Options

- `Config.Debug`: Enable verbose console logging.
- `Config.ServerLore`: Text string providing server context/lore to NPC system prompts.
- `Config.Framework`: Framework integration mode (`auto`, `qbcore`, `esx`, `qbox`, `standalone`).
- `Config.Inventory`: Inventory provider (`auto`, `ox_inventory`, `qb-inventory`, `qs-inventory`, `esx_inventory`, `none`).
- `Config.Target`: Target system (`native`, `ox_target`, `qb-target`, `auto`).

## Gateway Convars

Add to `server.cfg`:

```cfg
set peak_ai_npc_gateway_url "http://127.0.0.1:8787"
set peak_ai_npc_gateway_secret "your-gateway-secret"
set peak_ai_npc_server_id "your-server-id"
ensure peak-ai-npc
```

## Security & Limits

- `Config.Conversations.interactionDistance`: Maximum distance (meters) to start conversation (default: 3.0).
- `Config.Conversations.maximumDistance`: Maximum distance before conversation breaks (default: 8.0).
- `Config.Security.requireConfirmationForPurchases`: Require NUI confirmation before purchases (default: true).
- `Config.Security.maximumTransactionValue`: Maximum purchase value per transaction (default: 5000).
- `Config.Subtitles.mode`: 3D subtitle mode (`always`, `never`, `player_preference`, `audio_failed`, `accessibility`).
