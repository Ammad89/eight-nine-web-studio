import { getSupabaseClient, getBackendSetupMessage } from "../../app/cms/remoteStorage";

const mediaBucket = import.meta.env.VITE_SUPABASE_MEDIA_BUCKET?.trim() || "ehray-media";

function safeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
}

export async function uploadMediaFile(file: File, folder = "cms-v2") {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(getBackendSetupMessage());
  }

  const path = `${folder}/${Date.now()}-${safeFileName(file.name)}`;

  const { data, error } = await supabase.storage
    .from(mediaBucket)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from(mediaBucket)
    .getPublicUrl(data.path);

  if (!publicData.publicUrl) {
    throw new Error("Image uploaded but no public URL was returned.");
  }

  return {
    path: data.path,
    publicUrl: publicData.publicUrl,
  };
}

export async function listMediaFiles(folder = "cms-v2") {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(getBackendSetupMessage());
  }

  const { data, error } = await supabase.storage
    .from(mediaBucket)
    .list(folder, {
      limit: 100,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) throw error;

  return (data || []).map((file) => {
    const path = `${folder}/${file.name}`;

    const { data: publicData } = supabase.storage
      .from(mediaBucket)
      .getPublicUrl(path);

    return {
      name: file.name,
      path,
      publicUrl: publicData.publicUrl,
      size: file.metadata?.size,
      updatedAt: file.updated_at,
    };
  });
}

export async function deleteMediaFile(path: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(getBackendSetupMessage());
  }

  const { error } = await supabase.storage
    .from(mediaBucket)
    .remove([path]);

  if (error) throw error;
}
