import type { IncomingMessage, ServerResponse } from "node:http";
import { NodeStreamableHTTPServerTransport } from "@modelcontextprotocol/node";
import { createPeakServer } from "../src/mcp-server.js";
import { allowRequest } from "../src/rate-limit.js";

const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS ?? "https://peakrp.net").split(",").map((value) => value.trim()).filter(Boolean));

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    res.statusCode = 403;
    return res.end("Forbidden origin");
  }
  const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown").split(",")[0].trim();
  if (!allowRequest(ip)) {
    res.statusCode = 429;
    res.setHeader("Retry-After", "60");
    return res.end("Rate limit exceeded");
  }
  if (!['GET', 'POST', 'DELETE'].includes(req.method ?? "")) {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.end();
  }
  res.setHeader("Cache-Control", "no-store");
  const server = createPeakServer();
  const transport = new NodeStreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => void server.close());
  await server.connect(transport);
  await transport.handleRequest(req, res);
}
