import { CmsVersionRecord } from "../versioning/version-storage";

interface VersionHistoryPanelProps {
  versions: CmsVersionRecord[];
  onRestore?: (version: CmsVersionRecord) => void;
}

export default function VersionHistoryPanel({
  versions,
  onRestore,
}: VersionHistoryPanelProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] opacity-60 mb-2">
          Version History
        </p>

        <h2 className="text-2xl font-semibold">
          Saved Versions
        </h2>

        <p className="text-sm opacity-70 mt-2">
          Restore previous versions of the website.
        </p>
      </div>

      {versions.length === 0 ? (
        <div className="rounded-xl border border-border p-6 text-sm opacity-70">
          No saved versions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className="rounded-xl border border-border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    {version.label}
                  </h3>

                  <p className="text-xs opacity-60 mt-1">
                    {new Date(version.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRestore?.(version)}
                  className="rounded-lg border border-border px-3 py-2 text-sm"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
