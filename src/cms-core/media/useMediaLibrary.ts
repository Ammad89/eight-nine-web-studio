import { useCallback, useEffect, useState } from "react";
import {
  deleteMediaFile,
  listMediaFiles,
  uploadMediaFile,
} from "./media-storage";

export interface MediaLibraryAsset {
  name: string;
  path: string;
  publicUrl: string;
  size?: number;
  updatedAt?: string;
}

export function useMediaLibrary(folder = "cms-v2") {
  const [assets, setAssets] = useState<MediaLibraryAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const files = await listMediaFiles(folder);
      setAssets(files);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load media files.",
      );
    } finally {
      setLoading(false);
    }
  }, [folder]);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");

      try {
        const uploaded = await uploadMediaFile(file, folder);
        await refresh();
        return uploaded;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to upload media file.",
        );
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [folder, refresh],
  );

  const remove = useCallback(
    async (path: string) => {
      setLoading(true);
      setError("");

      try {
        await deleteMediaFile(path);
        await refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to delete media file.",
        );
      } finally {
        setLoading(false);
      }
    },
    [refresh],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    assets,
    loading,
    uploading,
    error,
    refresh,
    upload,
    remove,
  };
}
