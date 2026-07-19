import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Catalog, ScriptRecord } from "../src/types.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8")) as { version: string };
const scripts = JSON.parse(await readFile(resolve(root, "catalog/source.json"), "utf8")) as ScriptRecord[];
const catalog: Catalog = {
  schemaVersion: "1.0",
  toolkitVersion: pkg.version,
  generatedAt: scripts.map((script) => script.updatedAt).sort().at(-1) ?? new Date(0).toISOString(),
  organization: "Peak-Studios",
  scripts
};
const serialized = JSON.stringify(catalog, null, 2) + "\n";
await mkdir(resolve(root, "public"), { recursive: true });
await writeFile(resolve(root, "catalog/catalog.json"), serialized);
await writeFile(resolve(root, "public/catalog.json"), serialized);

const references = resolve(root, "skills/peak-scripts/references");
await mkdir(references, { recursive: true });
for (const script of scripts) {
  const body = [`# ${script.name}`, "", script.description, "", `Repository: ${script.repository}`, `Source commit: ${script.sourceCommit}`, "", ...script.sections.flatMap((section) => [`## ${section.title}`, "", section.content, "", `Source: ${section.sourceUrl}`, ""])].join("\n");
  await writeFile(resolve(references, `${script.id}.md`), body.trim() + "\n");
}
console.log(`Generated catalog and ${scripts.length} skill references.`);
