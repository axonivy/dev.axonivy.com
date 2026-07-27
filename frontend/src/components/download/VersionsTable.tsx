import { useState } from 'react';

interface DevRelease {
  name: string;
  date: string;
  windowsUrl: string;
  macosUrl: string;
  linuxUrl: string;
  releaseNotesUrl?: string;
}

interface ArchiveRelease {
  version: string;
  date: string;
  windowsUrl: string;
  macosUrl: string;
  linuxUrl: string;
  releaseNotesUrl?: string;
}

interface Props {
  devReleases: DevRelease[];
  archivesByMajor: Record<string, ArchiveRelease[]>;
}

const INITIAL_VISIBLE = 6;

export default function VersionsTable({ devReleases, archivesByMajor }: Props) {
  const majorVersions = Object.keys(archivesByMajor).sort((a, b) => Number(b) - Number(a));
  const [tab, setTab] = useState<'designer' | 'engine'>('designer');
  const [selectedMajor, setSelectedMajor] = useState(majorVersions[0] ?? '');
  const [showAll, setShowAll] = useState(false);

  const archives = archivesByMajor[selectedMajor] ?? [];
  const visibleArchives = showAll ? archives : archives.slice(0, INITIAL_VISIBLE);

  return (
    <div className="rounded-2xl border border-(--n200) bg-(--background) p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-(--body)">Versions and Download Options</h2>
          <p className="mt-1 text-sm text-(--n700)">Explore older versions and dev releases.</p>
        </div>
        <div className="flex rounded-lg border border-(--n200) overflow-hidden text-sm font-medium">
          <button
            type="button"
            onClick={() => setTab('designer')}
            className={`px-4 py-2 transition ${tab === 'designer' ? 'bg-(--p300) text-(--background)' : 'hover:bg-(--n50) text-(--n800)'}`}
          >
            ⬡ Designer Versions
          </button>
          <button
            type="button"
            onClick={() => setTab('engine')}
            className={`px-4 py-2 transition ${tab === 'engine' ? 'bg-(--p300) text-(--background)' : 'hover:bg-(--n50) text-(--n800)'}`}
          >
            ◯ Engine Versions
          </button>
        </div>
      </div>

      {/* Dev Releases */}
      {devReleases.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-(--n600)">Dev Releases</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--n200) text-left text-(--n600)">
                  <th className="pb-2 pr-4 font-medium">Version</th>
                  <th className="pb-2 pr-4 font-medium">Release date</th>
                  <th className="pb-2 pr-4 font-medium">Windows</th>
                  {tab === 'designer' && <th className="pb-2 pr-4 font-medium">macOS</th>}
                  <th className="pb-2 pr-4 font-medium">Linux</th>
                  <th className="pb-2 font-medium">Release notes</th>
                </tr>
              </thead>
              <tbody>
                {devReleases.map((r) => (
                  <tr key={r.name} className="border-b border-(--n200) hover:bg-(--n25)">
                    <td className="py-2 pr-4 font-medium text-(--body)">{r.name}</td>
                    <td className="py-2 pr-4 text-(--n700)">{r.date}</td>
                    <td className="py-2 pr-4">
                      <a href={r.windowsUrl} className="text-xs text-(--p300) hover:underline">
                        ↓ 64-bit (exe) 250 MB
                      </a>
                    </td>
                    {tab === 'designer' && (
                      <td className="py-2 pr-4">
                        <a href={r.macosUrl} className="text-xs text-(--p300) hover:underline">
                          ↓ 64-bit (exe) 250 MB
                        </a>
                      </td>
                    )}
                    <td className="py-2 pr-4">
                      <a href={r.linuxUrl} className="text-xs text-(--p300) hover:underline">
                        ↓ 64-bit (exe) 250 MB
                      </a>
                    </td>
                    <td className="py-2">
                      {r.releaseNotesUrl && (
                        <a href={r.releaseNotesUrl} className="text-xs text-(--p300) hover:underline">
                          View release notes →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Archives */}
      {majorVersions.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-(--n600)">Archives</h3>
            <select
              value={selectedMajor}
              onChange={(e) => { setSelectedMajor(e.target.value); setShowAll(false); }}
              className="rounded-(--r2) border border-(--n200) bg-(--background) px-3 py-1.5 text-sm text-(--body)"
            >
              {majorVersions.map((v) => (
                <option key={v} value={v}>Version {v}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--n200) text-left text-(--n600)">
                  <th className="pb-2 pr-4 font-medium">Version</th>
                  <th className="pb-2 pr-4 font-medium">Release date</th>
                  <th className="pb-2 pr-4 font-medium">Windows</th>
                  {tab === 'designer' && <th className="pb-2 pr-4 font-medium">macOS</th>}
                  <th className="pb-2 pr-4 font-medium">Linux</th>
                  <th className="pb-2 font-medium">Release notes</th>
                </tr>
              </thead>
              <tbody>
                {visibleArchives.map((r) => (
                  <tr key={r.version} className="border-b border-(--n200) hover:bg-(--n25)">
                    <td className="py-2 pr-4 font-medium text-(--body)">{r.version}</td>
                    <td className="py-2 pr-4 text-(--n700)">{r.date}</td>
                    <td className="py-2 pr-4">
                      <a href={r.windowsUrl} className="text-xs text-(--p300) hover:underline">
                        ↓ 64-bit (exe) 250 MB
                      </a>
                    </td>
                    {tab === 'designer' && (
                      <td className="py-2 pr-4">
                        <a href={r.macosUrl} className="text-xs text-(--p300) hover:underline">
                          ↓ 64-bit (exe) 250 MB
                        </a>
                      </td>
                    )}
                    <td className="py-2 pr-4">
                      <a href={r.linuxUrl} className="text-xs text-(--p300) hover:underline">
                        ↓ 64-bit (exe) 250 MB
                      </a>
                    </td>
                    <td className="py-2">
                      {r.releaseNotesUrl && (
                        <a href={r.releaseNotesUrl} className="text-xs text-(--p300) hover:underline">
                          View release notes →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {archives.length > INITIAL_VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-sm text-(--p300) hover:underline"
            >
              {showAll ? 'Show less' : `Show more (${archives.length - INITIAL_VISIBLE} more)`}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
