<!-- Source: https://github.com/Peak-Studios/peak-police-report-writer/blob/742494731329cd09552406ed20d7e17d131fee54/README.md -->

# Peak AI Police Report Writer

Peak AI Police Report Writer gives officers a focused field-notes workflow: dictate or type incident details, generate a structured draft, review it, and save the approved report into `ps-mdt` v3.

The officer remains in control. AI output is labeled as a draft, charges are suggestions, and the server never accepts a report from a player without the configured ACE permission.

## Requirements

- FiveM artifact with Lua 5.4
- `oxmysql`
- `ps-mdt` v3, with its SQL schema installed
- Node/browser speech recognition support for voice dictation (typing always works)
- Optional: any OpenAI-compatible chat-completions endpoint, or Ollama

## Install (server-owner checklist)

1. Place this folder at `resources/[peak]/peak-police-report-writer`.
2. Add an API key as a server convar; never put it in Lua or NUI files. The key is read only on the server:

```cfg
set peak_police_openai_key "YOUR_SERVER_SIDE_KEY"
add_ace group.police peak.police.report allow
ensure oxmysql
ensure ps-mdt
ensure peak-police-report-writer
```

3. Edit `shared/config.lua` for your endpoint, model, ACE, resource name, and policy.
4. Use `/policereport` in game.

5. Give the officer group access. ACE names are case-sensitive:

```cfg
add_principal identifier.license:YOUR_LICENSE group.police
```

Without an API key, the resource creates a local factual draft. With Ollama or another local endpoint configured, it can still use an AI model without sending data to a hosted provider.

### AI provider setup

The writer speaks the widely supported OpenAI-compatible chat-completions format. This covers OpenAI, Azure OpenAI gateways, OpenRouter, Together, Groq, LM Studio, vLLM, llama.cpp servers, LiteLLM, and other compatible services. Set `Config.Ai.Endpoint` to that provider's `/v1/chat/completions` URL, set `Config.Ai.Model`, and keep `ApiKeyConvar` pointed at a server convar. For non-Bearer authentication, change `Config.Ai.ApiKeyHeader` and `Config.Ai.ApiKeyPrefix` (Azure commonly uses `api-key` and an empty prefix).

For Ollama, start `ollama serve`, pull a model, and use its local OpenAI-compatible endpoint:

```cfg
# shared/config.lua
Config.Ai.Provider = 'ollama'
Config.Ai.Endpoint = 'http://127.0.0.1:11434/v1/chat/completions'
Config.Ai.Model = 'llama3.2'
Config.Ai.ApiKeyConvar = ''
```

For Ollama's native API instead, set `Provider = 'ollama-native'`, use an `/api/chat` endpoint, and leave `ApiKeyConvar` empty. For local OpenAI-compatible servers, use `Provider = 'local'` or `openai-compatible`, set the local endpoint, and leave the key empty. Set `Config.Ai.JsonMode = false` for providers that reject `response_format`; the prompt still requires JSON and the server validates the result.

## ps-mdt integration

The adapter targets the current `ps-mdt` v3 normalized schema: `mdt_reports`, `mdt_reports_involved`, `mdt_reports_charges`, `mdt_reports_evidence`, `mdt_reports_tags`, and `mdt_reports_restrictions`. It creates the report only after the officer submits the reviewed draft. The resource does not call private ps-mdt callbacks or patch ps-mdt files.

The current upstream report flow requires a title, content, and at least one tag; this resource supplies the configured `Config.PsMdt.DefaultTag`. Charge labels are foreign-keyed to `mdt_penal_codes`, so AI suggestions are checked against your installed Penal Codes and unknown charges stop the save. Verify the schema and permissions after upgrading ps-mdt.

## Configuration

- `Config.Ace`: ACE permission required for opening and submitting reports.
- `Config.Ai`: endpoint, model, server-only key convar, and timeout settings.
- `Config.Ai.Provider`: `openai-compatible`, `ollama`, `ollama-native`, or `local`.
- `Config.Ai.JsonMode`: enables provider JSON mode when supported; disable it for incompatible gateways.
- `Config.Prompt`: strict JSON contract and no-invention policy.
- `Config.PsMdt.Resource`: resource name and start-order guard.
- `Config.PsMdt.RestrictToJobType`: adds the default `leo` visibility restriction. Change this only if your ps-mdt job type is different.
- `Config.PsMdt.RestrictionIdentifier`: the exact ps-mdt job type written to report visibility restrictions (default `leo`).
- `Config.MaxItemsPerSection`: prevents oversized client payloads; increase cautiously.

### First test

1. Start `oxmysql`, then `ps-mdt`, then this resource.
2. Confirm the officer can open `/policereport` and receives no ACE error.
3. Type a short incident and click **Draft report**. With no key, the local fallback should appear.
4. Review/edit the JSON, use a charge label that exists in ps-mdt Penal Codes, then click **Save to ps-mdt**.
5. Open the report in ps-mdt and verify the title, summary, people, charges, evidence, tag, and visibility.

## Security and privacy

Dictation is sent to the configured AI endpoint only when AI drafting is enabled. Avoid sending unnecessary personally identifying information, configure an approved provider, and follow your server’s retention policy. API keys stay in server convars. The client can request drafts, but only an ACE-authorized server can submit them.

## API/events

- `peak-police-report-writer:server:draft` — internal server event for draft generation.
- `peak-police-report-writer:server:submit` — internal server event for reviewed report submission.
- `/policereport` — opens the officer UI.

The UI is intentionally a review workflow: AI output never saves automatically, and the server validates the submitted draft again. This resource does not create warrants, arrests, images, or chain-of-custody records; add those in ps-mdt.

MIT © Peak Studios
