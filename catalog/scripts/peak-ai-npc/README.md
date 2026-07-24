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

## Quick Start

1. Copy `peak-ai-npc/` into your FiveM server's resources directory.
2. Set configuration convars in `server.cfg`:

```cfg
set peak_ai_npc_gateway_secret "replace-with-a-long-random-secret"
set peak_ai_npc_gateway_url "http://127.0.0.1:8787"
set peak_ai_npc_server_id "local-development"
ensure peak-ai-npc
```

3. Start the gateway service:

```powershell
cd gateway
npm install
npm run dev
```

## In-Game Commands

- `/ainpc`: Start conversation with nearest configured AI ped
- `/ainpcvision [prompt]`: Request screenshot analysis (when vision provider & `screenshot-basic` are enabled)
- `/ainpc_subtitles [mode]`: Set personal 3D subtitle mode preference (`always`, `never`, `audio_failed`, `accessibility`)
- `/ainpc_accessibility [on|off]`: Toggle accessibility high-contrast subtitle overlay
- `ainpc_status`: Server console / ACE admin diagnostic status report
