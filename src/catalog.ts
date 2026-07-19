import catalogJson from "../catalog/catalog.json" with { type: "json" };
import type { Catalog, ScriptRecord } from "./types.js";

export const catalog = catalogJson as Catalog;

export function findScript(id: string): ScriptRecord | undefined {
  const value = id.trim().toLowerCase();
  return catalog.scripts.find((script) => script.id === value || script.name.toLowerCase() === value);
}

export function filterScripts(filters: { framework?: string; dependency?: string; capability?: string }): ScriptRecord[] {
  const matches = (values: string[], query?: string) => !query || values.some((value) => value.toLowerCase().includes(query.toLowerCase()));
  return catalog.scripts.filter((script) =>
    matches(script.frameworks, filters.framework) &&
    matches(script.dependencies, filters.dependency) &&
    matches(script.capabilities, filters.capability)
  );
}

export function searchCatalog(query: string, limit = 8) {
  const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 1);
  return catalog.scripts.flatMap((script) => script.sections.map((section) => {
    const haystack = `${script.name} ${script.description} ${section.title} ${section.content}`.toLowerCase();
    const score = terms.reduce((total, term) => total + (haystack.split(term).length - 1), 0);
    const first = Math.max(0, ...terms.map((term) => haystack.indexOf(term)).filter((index) => index >= 0));
    const excerpt = section.content.slice(Math.max(0, first - 160), first + 640).trim();
    return { script: script.id, section: section.id, title: section.title, excerpt, sourceUrl: section.sourceUrl, score };
  })).filter((result) => result.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}
