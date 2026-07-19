export type CatalogSection = {
  id: string;
  title: string;
  content: string;
  sourceUrl: string;
};

export type ScriptRecord = {
  id: string;
  name: string;
  description: string;
  repository: string;
  license: string;
  defaultBranch: string;
  sourceCommit: string;
  updatedAt: string;
  frameworks: string[];
  dependencies: string[];
  capabilities: string[];
  sections: CatalogSection[];
};

export type Catalog = {
  schemaVersion: "1.0";
  toolkitVersion: string;
  generatedAt: string;
  organization: string;
  scripts: ScriptRecord[];
};
