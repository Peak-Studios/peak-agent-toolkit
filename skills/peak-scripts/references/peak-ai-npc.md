# peak-ai-npc

Server-authoritative conversational AI NPCs with an optional gateway service

Repository: https://github.com/Peak-Studios/advanced-ai-npc
Source commit: a1b2c3d4e5f67890123456789abcdef012345678

## Peak AI NPC

# Peak AI NPC

Peak AI NPC adds server-authoritative conversational AI characters to FiveM servers with an optional AI gateway service.

- `peak-ai-npc/`: FiveM resource with ped management, NUI, voice dictation, 3D subtitles, targets, and open edit configuration.
- `gateway/`: TypeScript HTTP gateway for LLM providers (Ollama, OpenAI, Groq, Anthropic, Gemini), TTS/STT, PostgreSQL memory, and vision.

## Open-for-Edit Files (`escrow_ignore`)

Per release rules, core runtime modules are escrowed while customization files remain completely open for editing:

- `shared/config.lua`: Lore, interaction distance, framework, target system, voice, subtitles, vision
- `npcs/examples.lua`: NPC peds, spawn coords, prompts, identities, knowledge, tool permissions
- `client/targets.lua`: `ox_target`, `qb-target`, and native interaction logic
- `locales/*.lua`: Subtitle and NUI notification strings
- `shared/constants.lua`: Shared event names and state keys

Source: https://github.com/Peak-Studios/advanced-ai-npc/blob/main/README.md

## Configuration

## Configuration

Edit `shared/config.lua` in your `peak-ai-npc` resource folder:

- `Config.ServerLore`: Server-specific background lore for NPC prompts.
- `Config.Framework`: Framework mode (`auto`, `qbcore`, `esx`, `qbox`, `standalone`).
- `Config.Inventory`: Inventory provider (`auto`, `ox_inventory`, `qb-inventory`, `qs-inventory`, `esx_inventory`, `none`).
- `Config.Target`: Target handler (`native`, `ox_target`, `qb-target`, `auto`).
- `Config.Conversations`: Distance limits, turn bounds, idle timeouts, and rate limits.
- `Config.Security`: Purchase confirmation toggles and audit options.
- `Config.Subtitles`: 3D subtitle styling, line lengths, and accessibility modes.
- `Config.Vision`: Screenshot basic integration settings.

Source: https://github.com/Peak-Studios/advanced-ai-npc/blob/main/docs/CONFIGURATION_GUIDE.md

## NPC Authoring

## NPC Authoring

Define custom NPCs in `npcs/*.lua` using `AINPCDefinitions`:

```lua
AINPCDefinitions.shopkeeper = {
    id = 'shopkeeper',
    model = 'mp_m_shopkeep_01',
    coords = vec4(24.4, -1345.2, 29.5, 266.0),
    identity = { name = 'Martha', occupation = 'shopkeeper' },
    personality = 'Patient, observant, and concise. Never invents stock or prices.',
    knowledge = 'Only knows the shop catalog, public server lore, and facts returned by tools.',
    allowedTools = { 'get_shop_catalog', 'get_shop_stock', 'create_purchase_quote', 'confirm_purchase' },
    interactionDistance = 3.0
}
```

Source: https://github.com/Peak-Studios/advanced-ai-npc/blob/main/docs/NPC_AUTHORING_GUIDE.md

## Gateway Convars

## Gateway Convars

Configure FXServer convars in `server.cfg`:

```cfg
set peak_ai_npc_gateway_url "http://127.0.0.1:8787"
set peak_ai_npc_gateway_secret "your-gateway-secret"
set peak_ai_npc_server_id "my-server-id"
ensure peak-ai-npc
```

Source: https://github.com/Peak-Studios/advanced-ai-npc/blob/main/README.md
