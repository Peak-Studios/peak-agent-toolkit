<!-- Source: https://github.com/Peak-Studios/peak-police-report-writer/blob/742494731329cd09552406ed20d7e17d131fee54/README.md -->

# Peak AI Police Report Writer

Peak AI Police Report Writer gives officers a focused field-notes workflow: dictate or type incident details, generate a structured draft, review it, and save the approved report into `ps-mdt` v3.

The officer remains in control. AI output is labeled as a draft, charges are suggestions, and the server never accepts a report from a player without the configured ACE permission.

## Requirements

- FiveM artifact with Lua 5.4
- `oxmysql`
- `ps-mdt` v3, with its SQL schema installed
- Node/browser speech recognition support for voice dictation (typing always works)
- Optional: any OpenAI-compatible chat-completions endpoint, Ollama, or a local open-weight model server

## Install

1. Place this folder at `resources/[peak]/peak-police-report-writer`.
2. Add an API key as a server convar; never put it in Lua or NUI files:

```cfg
set peak_police_openai_key "YOUR_SERVER_SIDE_KEY"
add_ace group.police peak.police.report allow
ensure oxmysql
ensure ps-mdt
ensure peak-police-report-writer
```

3. Edit `shared/config.lua` for your endpoint, model, ACE, resource name, and policy.
4. Use `/policereport` in game.

Without an API key, the resource creates a local factual draft. Ollama and other local endpoints can run AI drafting without sending data to a hosted provider.

### AI provider setup

Use `Config.Ai.Provider = 'openai-compatible'` for hosted gateways, `'ollama'` for Ollama's OpenAI-compatible endpoint, `'ollama-native'` for `/api/chat`, or `'local'` for a local compatible server. Set `Config.Ai.Endpoint` and `Config.Ai.Model` accordingly. Set `Config.Ai.JsonMode = false` for providers that reject `response_format`. Custom auth is supported with `Config.Ai.ApiKeyHeader` and `Config.Ai.ApiKeyPrefix`.

## ps-mdt integration

The adapter targets the current `ps-mdt` v3 normalized schema: `mdt_reports`, `mdt_reports_involved`, `mdt_reports_charges`, `mdt_reports_evidence`, `mdt_reports_tags`, and `mdt_reports_restrictions`. It creates the report only after the officer submits the reviewed draft. The resource does not call private ps-mdt callbacks or patch ps-mdt files.

The current upstream report flow requires a title, content, and at least one tag; this resource supplies the configured `Config.PsMdt.DefaultTag`. Verify the schema and permissions after upgrading ps-mdt.

## Configuration

- `Config.Ace`: ACE permission required for opening and submitting reports.
- `Config.Ai`: provider, endpoint, model, optional server-only key convar, JSON mode, custom auth, and timeout settings.
- `Config.Prompt`: strict JSON contract and no-invention policy.
- `Config.PsMdt.Resource`: resource name and start-order guard.
- `Config.PsMdt.RestrictToJobType`: adds the default `leo` visibility restriction. Change this only if your ps-mdt job type is different.

## Security and privacy

Dictation is sent to the configured AI endpoint only when AI drafting is enabled. Avoid sending unnecessary personally identifying information, configure an approved provider, and follow your server’s retention policy. API keys stay in server convars. The client can request drafts, but only an ACE-authorized server can submit them.

## API/events

- `peak-police-report-writer:server:draft` — internal server event for draft generation.
- `peak-police-report-writer:server:submit` — internal server event for reviewed report submission.
- `/policereport` — opens the officer UI.

MIT © Peak Studios
