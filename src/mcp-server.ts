import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { catalog, filterScripts, findScript, searchCatalog } from "./catalog.js";

const text = (value: unknown) => ({ content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] });

export function createPeakServer(): McpServer {
  const server = new McpServer({ name: "peak-studios-agent-toolkit", version: catalog.toolkitVersion });

  server.registerResource("Peak Studios script catalog", "peak://catalog", { title: "Peak Studios Script Catalog", description: "Approved public Peak Studios scripts and provenance", mimeType: "application/json" }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(catalog, null, 2) }] }));
  for (const script of catalog.scripts) {
    server.registerResource(`${script.name} documentation`, `peak://scripts/${script.id}`, { title: `${script.name} Documentation`, description: script.description, mimeType: "text/markdown" }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: script.sections.map((section) => `${section.content}\n\nSource: ${section.sourceUrl}`).join("\n\n---\n\n") }] }));
  }

  server.registerTool("list_scripts", {
    title: "List Peak Studios scripts",
    description: "List approved public scripts, optionally filtered by framework, dependency, or capability.",
    inputSchema: z.object({ framework: z.string().max(80).optional(), dependency: z.string().max(80).optional(), capability: z.string().max(120).optional() }),
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async (args) => text(filterScripts(args).map(({ sections, ...script }) => ({ ...script, sectionCount: sections.length }))));

  server.registerTool("get_script_docs", {
    title: "Get script documentation",
    description: "Get complete or section-filtered public documentation for one Peak Studios script.",
    inputSchema: z.object({ script: z.string().min(1).max(80), section: z.string().max(120).optional() }),
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async ({ script: id, section }) => {
    const script = findScript(id);
    if (!script) return { ...text(`Unknown script: ${id}`), isError: true };
    const sections = section ? script.sections.filter((item) => `${item.id} ${item.title}`.toLowerCase().includes(section.toLowerCase())) : script.sections;
    if (!sections.length) return { ...text(`No matching section '${section}' for ${script.id}.`), isError: true };
    return text({ ...script, sections });
  });

  server.registerTool("search_peak_docs", {
    title: "Search Peak Studios documentation",
    description: "Search approved public documentation and return ranked excerpts with canonical sources.",
    inputSchema: z.object({ query: z.string().min(2).max(240), limit: z.number().int().min(1).max(20).default(8) }),
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async ({ query, limit }) => text(searchCatalog(query, limit)));

  server.registerTool("recommend_script_setup", {
    title: "Recommend script setup",
    description: "Produce documentation-grounded setup guidance for a script and server environment.",
    inputSchema: z.object({ script: z.string().min(1).max(80), framework: z.string().max(80).optional(), inventory: z.string().max(80).optional(), target: z.string().max(80).optional(), database: z.string().max(80).optional() }),
    annotations: { readOnlyHint: true, openWorldHint: false }
  }, async ({ script: id, ...environment }) => {
    const script = findScript(id);
    if (!script) return { ...text(`Unknown script: ${id}`), isError: true };
    const query = ["install", "configuration", ...Object.values(environment).filter(Boolean)].join(" ");
    return text({ script: script.id, environment, compatibility: { documentedFrameworks: script.frameworks, documentedDependencies: script.dependencies }, guidance: searchCatalog(`${script.id} ${query}`, 10), caveat: "Use only the cited public documentation. Inspect the user's installed version before changing files; treat uncited compatibility claims as inference." });
  });
  return server;
}
