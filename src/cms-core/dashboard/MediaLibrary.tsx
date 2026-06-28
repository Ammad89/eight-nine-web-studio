import { ChangeEvent } from "react";
import { useMediaLibrary } from "../media/useMediaLibrary";

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
}

export default function MediaLibrary({
  onSelect,
}: MediaLibraryProps) {
  const {
    assets,
    loading,
    uploading,
    error,
    refresh,
    upload,
    remove,
  } = useMediaLibrary();

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    await upload(file);

    event.target.value = "";
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] opacity-60 mb-2">
          Media Library
        </p>

        <h2 className="text-2xl font-semibold">
          Images and assets
        </h2>

        <p className="text-sm opacity-70 mt-2">
          Upload, browse, reuse and delete images across the website.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-6">
        <label className="block cursor-pointer">
          <span className="block font-medium mb-2">
            Upload image
          </span>

          <span className="block text-sm opacity-70 mb-4">
            Images are uploaded to the connected Supabase Storage bucket.
          </span>

          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleUpload}
            className="block w-full text-sm"
          />
        </label>

        {uploading && (
          <p className="text-sm mt-3 opacity-70">
            Uploading image...
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          Uploaded assets
        </h3>

        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-lg border border-border px-3 py-2 text-sm"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {assets.length === 0 ? (
        <div className="rounded-xl border border-border p-6 text-sm opacity-70">
          No media assets yet. Uploaded images will appear here.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.path}
              className="overflow-hidden rounded-xl border border-border"
            >
              <button
                type="button"
                onClick={() => onSelect?.(asset.publicUrl)}
                className="block w-full text-left"
              >
                <img
                  src={asset.publicUrl}
                  alt=""
                  className="h-36 w-full object-cover"
                />

                <div className="p-3 text-xs opacity-70 truncate">
                  {asset.name}
                </div>
              </button>

              <div className="flex gap-2 border-t border-border p-3">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(asset.publicUrl)}
                  className="rounded border border-border px-2 py-1 text-xs"
                >
                  Copy URL
                </button>

                <button
                  type="button"
                  onClick={() => void remove(asset.path)}
                  className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
