# Architecture

`catalog/allowlist.json` is the publication gate. The synchronization command reads only approved public repositories and approved Markdown paths through the GitHub API. It records the exact source commit and canonical URL in `catalog/source.json` and normalized Markdown.

The generation command creates one versioned `catalog/catalog.json`, the static HTTP export, and skill references. The MCP server imports that generated catalog and exposes only resources and read-only tools.

Vercel runs a stateless Streamable HTTP transport. Requests are origin-checked when an Origin header is supplied, rate-limited per forwarded address, bounded by Zod schemas, and served without credentials. The service stores no user content.

Website-only documentation is kept outside this catalog unless its repository is public and reviewed into the allowlist.
