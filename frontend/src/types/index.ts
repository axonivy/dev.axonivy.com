export interface TeamMember {
  name: string;
  imgSrc: string;
  education: string;
  function: string;
  slogan: string;
}

export interface DeprecationEntry {
  name: string;
  nameHref?: string;
  successor?: string;
  successorHref?: string;
  released: string;
  deprecated: string;
  removed?: string;
  description?: string;
}

export interface NewsMeta {
  logo: string;
  title: string;
  slogan: string;
  date: string;
  lts: boolean;
}

export interface NewsSection {
  id: string;
  title: string;
  html: string;
  images: string[];
}

export interface NewsArticle {
  version: string;
  meta: NewsMeta;
  abstract: string;
  sections: NewsSection[];
}

export interface NewsListItem {
  version: string;
  meta: NewsMeta;
  abstract: string;
}

export interface DownloadArtifact {
  os: "windows" | "linux" | "macos" | "docker";
  label: string;
  url: string;
}

export interface ReleaseDownload {
  version: string;
  minorVersion: string;
  majorVersion: string;
  releaseDate: string;
  type: "lts" | "le" | "dev";
  designerArtifacts: DownloadArtifact[];
  engineArtifacts: DownloadArtifact[];
  vsCodeUrl: string;
  docsUrl: string;
  releaseNotesUrl: string;
}

export interface DocVersion {
  version: string;
  docUrl: string;
  newsUrl?: string;
  migrationUrl?: string;
  releaseUrl?: string;
  main?: boolean;
}

export interface DocVersions {
  lts: DocVersion[];
  le: DocVersion[];
  dev: DocVersion[];
}
