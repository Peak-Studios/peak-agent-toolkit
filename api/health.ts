import type { IncomingMessage, ServerResponse } from "node:http";
export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.end(JSON.stringify({ status: "ok", service: "peak-studios-agent-toolkit" }));
}
