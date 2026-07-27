import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Renderer } from "marked";
import type {
  TeamMember,
  DeprecationEntry,
  NewsListItem,
  NewsArticle,
  NewsSection,
  ReleaseDownload,
  DocVersion,
  DocVersions,
} from "../types/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
// frontend/src/lib -> frontend/src -> frontend -> repo-root
const repoRoot = resolve(__dirname, "../../..");
const phpPagesDir = join(repoRoot, "src/app/pages");

// ─── marked setup ─────────────────────────────────────────────────────────────
// Custom renderer to turn ## Title {#my-id} into <h2 id="my-id">Title</h2>
const renderer: Partial<Renderer> = {
  heading({ text, depth }: { text: string; depth: number }): string {
    const idMatch = text.match(/\s*\{#([^}]+)\}\s*$/);
    const id = idMatch
      ? idMatch[1]
      : text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const cleanText = text.replace(/\s*\{#[^}]+\}\s*$/, "");
    return `<h${depth} id="${id}">${cleanText}</h${depth}>\n`;
  },
};
marked.use({ renderer });

// ─── Team ─────────────────────────────────────────────────────────────────────
export function getTeamMembers(): TeamMember[] {
  const file = join(phpPagesDir, "team/members.json");
  return JSON.parse(readFileSync(file, "utf-8")) as TeamMember[];
}

// ─── Deprecation ──────────────────────────────────────────────────────────────
export function getDeprecations(): DeprecationEntry[] {
  const file = join(phpPagesDir, "deprecation/deprecation.json");
  return JSON.parse(readFileSync(file, "utf-8")) as DeprecationEntry[];
}

export function getCurrentDeprecations(): DeprecationEntry[] {
  return getDeprecations().filter((e) => !e.removed);
}

export function getRemovedDeprecations(): DeprecationEntry[] {
  return getDeprecations().filter((e) => !!e.removed);
}

// ─── News ─────────────────────────────────────────────────────────────────────
function getNewsDir(): string {
  return join(phpPagesDir, "news");
}

function isReleasedVersion(version: string): boolean {
  const releaseDir = join(repoRoot, "src/web/releases/ivy", version);
  return existsSync(releaseDir);
}

export function getNewsVersions(): string[] {
  const newsDir = getNewsDir();
  return readdirSync(newsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((v) => {
      const metaFile = join(newsDir, v, "meta.json");
      return existsSync(metaFile);
    })
    .sort()
    .reverse();
}

export function getNewsList(): NewsListItem[] {
  return getNewsVersions().map((version) => {
    const newsDir = getNewsDir();
    const meta = JSON.parse(
      readFileSync(join(newsDir, version, "meta.json"), "utf-8"),
    ) as import("../types/index.ts").NewsMeta;
    const abstractFile = join(newsDir, version, "abstract.html");
    const abstract = existsSync(abstractFile)
      ? readFileSync(abstractFile, "utf-8")
      : "";
    return { version, meta, abstract };
  });
}

export function getNewsDetail(version: string): NewsArticle | null {
  const versionDir = join(getNewsDir(), version);
  if (!existsSync(versionDir)) return null;

  const metaFile = join(versionDir, "meta.json");
  if (!existsSync(metaFile)) return null;

  const meta = JSON.parse(
    readFileSync(metaFile, "utf-8"),
  ) as import("../types/index.ts").NewsMeta;
  const abstractFile = join(versionDir, "abstract.html");
  const abstract = existsSync(abstractFile)
    ? readFileSync(abstractFile, "utf-8")
    : "";

  const mdFiles = readdirSync(versionDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const sections: NewsSection[] = mdFiles.map((mdFile) => {
    const raw = readFileSync(join(versionDir, mdFile), "utf-8");

    // Extract first heading for section title/id
    const headingMatch = raw.match(/^#{1,6}\s+(.+?)(?:\s+\{#([^}]+)\})?$/m);
    const rawTitle = headingMatch
      ? headingMatch[1]
      : mdFile.replace(/^\d+-/, "").replace(/\.md$/, "");
    const id =
      headingMatch?.[2] ?? rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const title = rawTitle.replace(/\s*\{#[^}]+\}\s*$/, "");

    // Replace ${docBaseUrl} placeholder
    const docBaseUrl = isReleasedVersion(version)
      ? `/doc/${version}`
      : "/doc/dev";
    const processed = raw.replace(/\$\{docBaseUrl\}/g, docBaseUrl);

    const html = marked.parse(processed) as string;

    return { id, title, html, images: [] };
  });

  // Deduplicate IDs — if two sections share the same id, append -2, -3, etc.
  const idCounts = new Map<string, number>();
  for (const section of sections) {
    const count = (idCounts.get(section.id) ?? 0) + 1;
    idCounts.set(section.id, count);
  }
  const idSeen = new Map<string, number>();
  for (const section of sections) {
    if ((idCounts.get(section.id) ?? 0) > 1) {
      const seen = (idSeen.get(section.id) ?? 0) + 1;
      idSeen.set(section.id, seen);
      if (seen > 1) section.id = `${section.id}-${seen}`;
    }
  }

  return { version, meta, abstract, sections };
}

// ─── Download ─────────────────────────────────────────────────────────────────
const CDN = "https://download.axonivy.com";

function permalinkUrl(
  version: string,
  product: string,
  os: string,
  ext: string,
): string {
  return `${CDN}/${version}/axonivy-${product}-${os}.${ext}`;
}

function buildDesignerArtifacts(
  version: string,
): import("../types/index.ts").DownloadArtifact[] {
  return [
    {
      os: "windows",
      label: "Windows",
      url: permalinkUrl(version, "designer", "windows", "zip"),
    },
    {
      os: "macos",
      label: "macOS",
      url: permalinkUrl(version, "designer", "macos", "zip"),
    },
    {
      os: "linux",
      label: "Linux",
      url: permalinkUrl(version, "designer", "linux", "zip"),
    },
  ];
}

function buildEngineArtifacts(
  version: string,
): import("../types/index.ts").DownloadArtifact[] {
  return [
    {
      os: "windows",
      label: "Windows",
      url: permalinkUrl(version, "engine", "windows", "zip"),
    },
    {
      os: "docker",
      label: "Docker",
      url: "https://hub.docker.com/r/axonivy/axonivy-engine",
    },
    {
      os: "linux",
      label: "Linux",
      url: permalinkUrl(version, "engine", "linux", "deb"),
    },
  ];
}

export async function getLTSRelease(): Promise<ReleaseDownload | null> {
  try {
    const res = await fetch("http://localhost:8080/api/currentRelease");
    if (!res.ok) return null;
    const data = (await res.json()) as { latestReleaseVersion?: string };
    const v = data.latestReleaseVersion;
    if (!v) return null;
    const parts = v.split(".");
    const major = parts[0];
    const minor = `${parts[0]}.${parts[1]}`;
    return {
      version: v,
      minorVersion: minor,
      majorVersion: major,
      releaseDate: "",
      type: "lts",
      designerArtifacts: buildDesignerArtifacts(v),
      engineArtifacts: buildEngineArtifacts(v),
      vsCodeUrl:
        "https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer",
      docsUrl: `/doc/${minor}`,
      releaseNotesUrl: `/news/${minor}`,
    };
  } catch {
    return null;
  }
}

// ─── Documentation Versions ───────────────────────────────────────────────────
export async function getDocVersions(): Promise<DocVersions> {
  try {
    const res = await fetch("http://localhost:8080/api/doc-versions");
    return (await res.json()) as DocVersions;
  } catch {
    return { lts: [], le: [], dev: [] };
  }
}

// ─── Download Versions ────────────────────────────────────────────────────────
export function getDownloadVersions(): ReleaseDownload[] {
  try {
    const res = fetch("http://localhost:8080/api/downloadVersions");
    // Fallback to hardcoded versions if endpoint not available
    return [
      {
        version: "14.0.0",
        minorVersion: "14.0",
        majorVersion: "14",
        releaseDate: "October 2026",
        type: "lts",
        designerArtifacts: buildDesignerArtifacts("14.0"),
        engineArtifacts: buildEngineArtifacts("14.0"),
        vsCodeUrl:
          "https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer",
        docsUrl: "/doc/14.0",
        releaseNotesUrl: "/news/14.0",
      },
      {
        version: "12.0.0",
        minorVersion: "12.0",
        majorVersion: "12",
        releaseDate: "October 2025",
        type: "lts",
        designerArtifacts: buildDesignerArtifacts("12.0"),
        engineArtifacts: buildEngineArtifacts("12.0"),
        vsCodeUrl:
          "https://marketplace.visualstudio.com/items?itemName=axonivy.vscode-designer",
        docsUrl: "/doc/12.0",
        releaseNotesUrl: "/news/12.0",
      },
    ];
  } catch {
    return [];
  }
}
