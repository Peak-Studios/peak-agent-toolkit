# Client setup

Use the hosted Streamable HTTP endpoint:

```text
https://peak-agent-toolkit.vercel.app/mcp
```

## Codex

```toml
[mcp_servers.peak-studios]
url = "https://peak-agent-toolkit.vercel.app/mcp"
```

Install or copy `skills/peak-scripts` into the Codex skills directory for the guided workflow.

## Claude Code

```bash
claude mcp add --transport http peak-studios https://peak-agent-toolkit.vercel.app/mcp
```

Use the repository `CLAUDE.md` as project guidance when working without MCP.

## Cursor

```json
{
  "mcpServers": {
    "peak-studios": {
      "url": "https://peak-agent-toolkit.vercel.app/mcp"
    }
  }
}
```

Copy `.cursor/rules/peak-scripts.mdc` into a project for version-controlled guidance.

## VS Code and GitHub Copilot

```json
{
  "servers": {
    "peak-studios": {
      "type": "http",
      "url": "https://peak-agent-toolkit.vercel.app/mcp"
    }
  }
}
```

Tools without MCP support can read `/catalog.json` or the generated Markdown under `skills/peak-scripts/references`.
