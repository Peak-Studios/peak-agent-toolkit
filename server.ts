import type { IncomingMessage, ServerResponse } from "node:http";
import mcp from "./api/mcp.js";
import health from "./api/health.js";
import version from "./api/version.js";
import catalog from "./api/catalog.js";

const routes = new Map<string, (req: IncomingMessage, res: ServerResponse) => unknown>([
  ["/mcp", mcp], ["/api/mcp", mcp],
  ["/health", health], ["/api/health", health],
  ["/version", version], ["/api/version", version],
  ["/catalog.json", catalog], ["/api/catalog", catalog]
]);

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const path = new URL(req.url ?? "/", "http://localhost").pathname;
  const route = routes.get(path);
  if (!route) {
    res.statusCode = 404;
    return res.end("Not found");
  }
  return route(req, res);
}
