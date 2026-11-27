import type { Lang } from "@/translation/ui";

export interface NewsListItem {
  term?: string;
  text: string;
  items?: NewsListItem[];
}

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: NewsListItem[] }
  | { type: "code"; code: string; language?: string }
  | { type: "heading"; text: string };

export interface NewsLink {
  label: string;
  url: string;
}

export type NewsTag = "Long Term Support" | "Leading Edge" | "Archived";

export interface NewsSection {
  heading: string;
  anchor: string | null;
  content: NewsBlock[];
  links?: NewsLink[];
  images?: string[];
}

export interface NewsRelease {
  id: string;
  version_title: string;
  slogan: string | null;
  tag: NewsTag;
  release_date: Date;
  download_url: string;
  release_notes_url: string;
  migration_guide_url: string;
  overview: string[];
  sections: NewsSection[];
}

export interface NewsSectionTranslation {
  heading: string;
  content: NewsBlock[];
  linkLabels?: string[];
}

export interface NewsReleaseTranslation {
  releaseId: string;
  slogan: string | null;
  overview: string[];
  sections: NewsSectionTranslation[];
}

const englishModules = import.meta.glob<{ default: NewsRelease }>(
  "./en/releases/*/index.ts",
  { eager: true },
);
const germanModules = import.meta.glob<{ default: NewsReleaseTranslation }>(
  "./de/releases/*/index.ts",
  { eager: true },
);

const englishReleases = Object.values(englishModules).map(
  (module) => module.default,
);
const germanTranslations = new Map(
  Object.values(germanModules).map((module) => [
    module.default.releaseId,
    module.default,
  ]),
);

function localizeRelease(release: NewsRelease): NewsRelease {
  const translation = germanTranslations.get(release.id);
  if (!translation) {
    throw new Error(`Missing German news translation for ${release.id}`);
  }
  if (translation.overview.length !== release.overview.length) {
    throw new Error(`German news overview mismatch for ${release.id}`);
  }
  if (translation.sections.length !== release.sections.length) {
    throw new Error(`German news section count mismatch for ${release.id}`);
  }

  const sections = release.sections.map((sourceSection, index) => {
    const translatedSection = translation.sections[index];
    const sourceLinks = sourceSection.links ?? [];
    const linkLabels = translatedSection.linkLabels ?? [];
    if (sourceLinks.length !== linkLabels.length) {
      throw new Error(
        `German news link count mismatch in ${release.id}, section ${index + 1}`,
      );
    }

    return {
      ...sourceSection,
      heading: translatedSection.heading,
      content: translatedSection.content,
      links: sourceSection.links?.map((link, linkIndex) => ({
        ...link,
        label: linkLabels[linkIndex],
      })),
    };
  });

  return {
    ...release,
    slogan: translation.slogan,
    overview: translation.overview,
    sections,
  };
}

export function getNews(lang: Lang): NewsRelease[] {
  const releases =
    lang === "de" ? englishReleases.map(localizeRelease) : englishReleases;
  return [...releases].sort(
    (left, right) => right.release_date.getTime() - left.release_date.getTime(),
  );
}
