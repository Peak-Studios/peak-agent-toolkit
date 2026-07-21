<!-- Source: https://github.com/Peak-Studios/peak-readme-generator/blob/b70fd9d331653b661d774dc2974f48bafa7698d7/README.md -->

# Peak Resource README Generator

Peak Resource README Generator scans a FiveM resource and drafts the documentation server owners usually need: installation, dependencies, configuration files, permissions, commands, events, exports, troubleshooting, and a release checklist.

It is intentionally local-first. Source code stays on the machine running the command. AI polishing is optional and supports hosted OpenAI-compatible endpoints, Ollama, and local servers; it never runs unless `--ai` is selected.

## Quick start

Requires Node.js 20+.

```bash
npm test
node bin/peak-readme.js --resource "./resources/[peak]/my-resource" --out ./README.generated.md
```

Use `--include-source` to print the detected metadata as JSON for a review pipeline. Add `--ai` for optional provider-backed polishing. The result is always a draft: verify behavior, defaults, framework compatibility, and permissions before shipping it.

For Ollama, set `PEAK_README_AI_PROVIDER=ollama`, point `PEAK_README_AI_ENDPOINT` at `http://127.0.0.1:11434/v1/chat/completions`, and set `PEAK_README_AI_MODEL` to a pulled model. Hosted providers use `PEAK_README_AI_KEY`; custom auth can use `PEAK_README_AI_KEY_HEADER` and `PEAK_README_AI_KEY_PREFIX`.

## What it detects

- `fxmanifest.lua` or legacy `__resource.lua` metadata
- `dependency`/`dependencies` declarations and common load-order hints
- likely config files under `config` or `shared`
- `RegisterCommand`, `RegisterNetEvent`, `AddEventHandler`, and `exports`
- permission-related references such as ACE checks, groups, jobs, and permissions
- source files while skipping `.git`, `node_modules`, build output, and symlinks

## Release notes

The generated file is not a security audit and does not infer undocumented runtime behavior. Keep secrets out of resource source before sharing scans.

MIT © Peak Studios
