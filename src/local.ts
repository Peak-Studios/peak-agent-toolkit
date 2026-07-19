import { createServer } from "node:http";
import mcpHandler from "../api/mcp.js";
import healthHandler from "../api/health.js";
import versionHandler from "../api/version.js";
import catalogHandler from "../api/catalog.js";

const routes = new Map([["/mcp", mcpHandler], ["/health", healthHandler], ["/version", versionHandler], ["/catalog.json", catalogHandler]]);
createServer((req, res) => {
  const handler = routes.get(new URL(req.url ?? "/", "http://localhost").pathname);
  if (!handler) { res.statusCode = 404; return res.end("Not found"); }
  return handler(req, res);
}).listen(3000, "127.0.0.1", () => console.error("Peak MCP listening on http://127.0.0.1:3000/mcp"));
