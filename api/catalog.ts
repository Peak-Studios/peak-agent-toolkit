import type { IncomingMessage, ServerResponse } from "node:http";
import { catalog } from "../src/catalog.js";
export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
  res.end(JSON.stringify(catalog));
}
