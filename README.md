# Peak Studios Agent Toolkit

Official, open-source AI documentation for public [Peak Studios](https://github.com/Peak-Studios) FiveM scripts.

The project exposes a read-only Model Context Protocol server, a reusable agent skill, and a static JSON catalog. Every answer is grounded in approved public repository documentation; private or unpublished source is never indexed.

## Public interfaces

- MCP: `https://peak-agent-toolkit.vercel.app/mcp`
- Catalog: `https://peak-agent-toolkit.vercel.app/catalog.json`
- Health: `https://peak-agent-toolkit.vercel.app/health`
- Skill: [`skills/peak-scripts`](skills/peak-scripts)

The production URL may change to a Peak-controlled domain. The Vercel URL remains the fallback.

## Indexed scripts

| Script | Public repository |
| --- | --- |
| peak-bridge | https://github.com/Peak-Studios/peak-bridge |
| peak-barbers | https://github.com/Peak-Studios/peak-barbers |
| peak-chess | https://github.com/Peak-Studios/peak-chess |
| peak-clothingitems | https://github.com/Peak-Studios/peak-clothingitems |
| peak-sprays | https://github.com/Peak-Studios/peak-sprays |
| peak-trucking | https://github.com/Peak-Studios/peak-trucking |
| peak-readme-generator | https://github.com/Peak-Studios/peak-readme-generator |
| peak-police-report-writer | https://github.com/Peak-Studios/peak-police-report-writer |

## Development

Requires Node.js 20 or newer.

```bash
npm install
npm run sync
npm run build
npm test
npm run dev
```

GitHub synchronization reads only repositories and Markdown paths approved in `catalog/allowlist.json`. New repositories require a reviewed allowlist change.

See [client setup](docs/clients.md), [architecture](docs/architecture.md), and [contributing](CONTRIBUTING.md).

## License

MIT © Peak Studios.
