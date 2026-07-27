import { useState } from "react";

interface VersionOption {
  version: string;
  docUrl: string;
  newsUrl?: string;
  migrationUrl?: string;
  releaseUrl?: string;
}

interface Props {
  title: string;
  description: string;
  versions: VersionOption[];
  showNews?: boolean;
  main?: boolean;
}

export default function DocVersionCard({
  title,
  description,
  versions,
  showNews = true,
  main = false,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="rounded-2xl border border-(--n200) bg-(--background) p-4 h-full flex flex-col">
      <h3 className="text-lg font-bold text-(--body) mb-2">{title}</h3>
      <p className="text-sm text-(--n700) mb-6">{description}</p>

      <div className="flex flex-wrap gap-3 mt-auto">
        {versions.map((version, idx) => (
          <div key={idx} className="relative inline-flex">
            {/* Main Documentation Button */}
            <a
              href={version.docUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex items-center gap-2 rounded-l-lg px-4 py-2 text-sm font-medium transition ${
                main
                  ? "bg-(--p300) text-(--background) hover:bg-(--p500)"
                  : "bg-(--p50) text-(--p300) hover:bg-(--p75)"
              }`}
            >
              <div
                className="h-4 w-4 block"
                style={{
                  backgroundColor: main ? "var(--background)" : "var(--p300)",
                  mask: "url('/icons/book-close-2.svg') no-repeat center / contain",
                  WebkitMask:
                    "url('/icons/book-close-2.svg') no-repeat center / contain",
                }}
              />
              Version {version.version}
            </a>

            <button
              onClick={() => toggleDropdown(idx)}
              className={`inline-flex items-center justify-center rounded-r-lg px-3 py-2 text-sm transition ${
                main
                  ? "bg-(--p300) text-(--background) hover:bg-(--p500)"
                  : "bg-(--p50) text-(--p300) hover:bg-(--p75)"
              }`}
            >
              <div
                className={`h-4 w-4 block transition ${openDropdown === idx ? "rotate-180" : ""}`}
                style={{
                  backgroundColor: main ? "var(--background)" : "var(--p300)",
                  mask: "url('/icons/arrow-down-1.svg') no-repeat center / contain",
                  WebkitMask:
                    "url('/icons/arrow-down-1.svg') no-repeat center / contain",
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === idx && (
              <div className="absolute left-0 top-full mt-1 bg-(--background) border border-(--n200) rounded-lg shadow-lg z-10 min-w-48 overflow-hidden">
                {showNews && version.newsUrl && (
                  <a
                    href={version.newsUrl}
                    className="block px-4 py-2 text-sm text-(--body) hover:bg-(--n25) border-b border-(--n200)"
                  >
                    📰 News
                  </a>
                )}
                {version.migrationUrl && (
                  <a
                    href={version.migrationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block px-4 py-2 text-sm text-(--body) hover:bg-(--n25) border-b border-(--n200)"
                  >
                    🔄 Migration Note
                  </a>
                )}
                {version.releaseUrl && (
                  <a
                    href={version.releaseUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block px-4 py-2 text-sm text-(--body) hover:bg-(--n25)"
                  >
                    ✨ Release Notes
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
