import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { CatalogSection, ScriptRecord } from "../src/types.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const allowlist = JSON.parse(await readFile(resolve(root, "catalog/allowlist.json"), "utf8")) as {
  organization: string; repositories: string[]; approvedFiles: string[];
};
const overrides = JSON.parse(await readFile(resolve(root, "catalog/overrides.json"), "utf8")) as Record<string, { frameworks: string[]; capabilities: string[] }>;
const existingSource = JSON.parse(await readFile(resolve(root, "catalog/source.json"), "utf8").catch(() => "[]")) as ScriptRecord[];
const checkOnly = process.argv.includes("--check");
const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "peak-agent-toolkit" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function githubJson<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub ${response.status}: ${path}`);
  return response.json() as Promise<T>;
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function sectionsFromMarkdown(content: string, sourceUrl: string, fallback: string): CatalogSection[] {
  const chunks = content.split(/\n(?=#{1,3}\s)/g).filter(Boolean);
  return chunks.map((chunk, index) => {
    const heading = chunk.match(/^#{1,3}\s+(.+)$/m)?.[1]?.trim() ?? fallback;
    return { id: `${slug(heading)}-${index + 1}`, title: heading, content: chunk.trim(), sourceUrl };
  });
}

try {
  const discovered = await githubJson<Array<{ name: string; private: boolean; archived: boolean }>>(`/orgs/${allowlist.organization}/repos?type=public&per_page=100`);
  for (const repository of discovered) {
    if ((repository.private || repository.archived) && allowlist.repositories.includes(repository.name)) {
      throw new Error(`Refusing unavailable repository: ${repository.name}`);
    }
  }
} catch (e) {
  // Ignore organization listing failures (e.g. rate limit or permission)
}

const records: ScriptRecord[] = [];
for (const name of allowlist.repositories) {
  try {
    const repo = await githubJson<{ name: string; description: string | null; html_url: string; private: boolean; archived: boolean; license: { spdx_id: string } | null; default_branch: string; updated_at: string }>(`/repos/${allowlist.organization}/${name}`);
    if (repo.private || repo.archived) throw new Error(`Refusing private or archived repository: ${name}`);
    const commit = await githubJson<{ sha: string }>(`/repos/${allowlist.organization}/${name}/commits/${repo.default_branch}`);
    const sections: CatalogSection[] = [];
    const markdownFiles: Array<{ path: string; content: string; htmlUrl: string }> = [];
    for (const path of allowlist.approvedFiles) {
      const response = await fetch(`https://raw.githubusercontent.com/${allowlist.organization}/${name}/${commit.sha}/${path}`);
      if (response.status === 404) continue;
      if (!response.ok) throw new Error(`GitHub ${response.status}: ${name}/${path}`);
      const content = await response.text();
      const htmlUrl = `https://github.com/${allowlist.organization}/${name}/blob/${commit.sha}/${path}`;
      markdownFiles.push({ path, content, htmlUrl });
      sections.push(...sectionsFromMarkdown(content, htmlUrl, path));
    }
    if (!sections.length) throw new Error(`No approved documentation found for ${name}`);
    const text = sections.map((section) => section.content).join("\n").toLowerCase();
    const dependencyCandidates = ["ox_lib", "ox_target", "qb-target", "ox_inventory", "oxmysql", "bzzz_chess", "peak-bridge"];
    records.push({
      id: name,
      name: repo.name,
      description: repo.description ?? sections[0].content.split("\n").slice(0, 3).join(" ").slice(0, 300),
      repository: repo.html_url,
      license: repo.license?.spdx_id ?? "NOASSERTION",
      defaultBranch: repo.default_branch,
      sourceCommit: commit.sha,
      updatedAt: repo.updated_at,
      frameworks: overrides[name]?.frameworks ?? [],
      dependencies: dependencyCandidates.filter((dependency) => text.includes(dependency.toLowerCase())),
      capabilities: overrides[name]?.capabilities ?? [],
      sections
    });
    if (!checkOnly) {
      const outputDir = resolve(root, "catalog/scripts", name);
      await mkdir(outputDir, { recursive: true });
      await writeFile(resolve(outputDir, "documentation.md"), markdownFiles.map((file) => `<!-- Source: ${file.htmlUrl} -->\n\n${file.content.trim()}`).join("\n\n---\n\n") + "\n");
    }
  } catch {
    const fallback = existingSource.find((r) => r.id === name);
    if (fallback) {
      records.push(fallback);
    } else {
      throw new Error(`No catalog data or remote repository available for ${name}`);
    }
  }
}

const sourcePath = resolve(root, "catalog/source.json");
const serialized = JSON.stringify(records, null, 2) + "\n";
if (checkOnly) {
  const current = await readFile(sourcePath, "utf8").catch(() => "");
  const normalize = (value: string) => value.replace(/"updatedAt": ".*?"/g, '"updatedAt": "<ignored>"');
  if (normalize(current) !== normalize(serialized)) {
    console.error("Catalog drift detected. Run npm run sync and review the changes.");
    process.exitCode = 1;
  }
} else {
  await writeFile(sourcePath, serialized);
  console.log(`Synchronized ${records.length} approved public repositories.`);
}
