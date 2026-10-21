import type { UiLegacyDocResponse } from "@/components/documentation/legacy-documentation";
import type { UiArchiveResponse } from "@/components/download/archive/archive";
import { BACKEND_URL } from "astro:env/server";

export async function fetchBackend<T>(path: string): Promise<T> {
  const res = await fetch(new URL(path, BACKEND_URL));
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

let versions: Promise<{ current: string; lts: string }> | undefined;

export function getVersions() {
  versions ??= fetchBackend<UiArchiveResponse>("/ui/archive").then(
    (archive) => ({
      current: archive.currentMajorVersion,
      lts:
        archive.categorizedVersions["Long Term Support"]?.find(
          (version) => version.id !== archive.currentMajorVersion,
        )?.id ?? archive.currentMajorVersion,
    }),
  );
  return versions;
}

export function fetchLegacyDocData(version: string, path?: string) {
  return fetchBackend<UiLegacyDocResponse>(
    path ? `/ui/legacy/doc/${version}/${path}` : `/ui/legacy/doc/${version}`,
  );
}
