import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const path = resolve("skills/peak-scripts/SKILL.md");
const content = await readFile(path, "utf8");
const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!match) throw new Error("SKILL.md must start with YAML frontmatter.");
const lines = match[1].split(/\r?\n/).filter(Boolean);
const keys = lines.map((line) => line.split(":", 1)[0]);
if (keys.join(",") !== "name,description") throw new Error("SKILL.md frontmatter must contain only name and description.");
if (!/^name: peak-scripts$/m.test(match[1])) throw new Error("Skill name must be peak-scripts.");
if (!/^description: .{40,}$/m.test(match[1])) throw new Error("Skill description is missing or too short.");
if (content.split(/\r?\n/).length > 500) throw new Error("SKILL.md must stay under 500 lines.");
console.log("Skill is valid.");
