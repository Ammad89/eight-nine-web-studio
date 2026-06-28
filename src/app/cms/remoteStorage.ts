import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { defaultCmsContent } from "./defaultContent";
import type { CmsContent } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const cmsTable = import.meta.env.VITE_SUPABASE_CMS_TABLE?.trim() || "cms_content";
const mediaBucket = import.meta.env.VITE_SUPABASE_MEDIA_BUCKET?.trim() || "ehray-media";

export const DRAFT_CONTENT_ID = "draft";
export const PUBLISHED_CONTENT_ID = "published";

let supabaseClient: SupabaseClient | null = null;

function cloneDefaultContent(): CmsContent {
  return JSON.parse(JSON.stringify(defaultCmsContent)) as CmsContent;
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  return supabaseClient;
}

export function getBackendSetupMessage() {
  if (isSupabaseConfigured()) return "";
  return "Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using the live dashboard.";
}

export async function signInDashboard(email: string, password: string) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error(getBackendSetupMessage());

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signOutDashboard() {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}


export async function isDashboardAdmin() {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user?.email) return false;

  const { data, error } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", userData.user.email)
    .maybeSingle();

  if (error) return false;

  return Boolean(data);
}

export async function getDashboardUser() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

async function fetchCmsDocument(id: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return cloneDefaultContent();

  const { data, error } = await supabase
    .from(cmsTable)
    .select("content")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data?.content as CmsContent | null) || cloneDefaultContent();
}

async function saveCmsDocument(id: string, content: CmsContent, user: User | null) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error(getBackendSetupMessage());

  const nextContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await supabase
    .from(cmsTable)
    .upsert(
      {
        id,
        content: nextContent,
        updated_by: user?.id || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

  if (error) throw error;
  return nextContent;
}

export function buildPublishedContent(content: CmsContent): CmsContent {
  return {
    ...content,
    updatedAt: new Date().toISOString(),
    pages: content.pages.filter(page => page.status === "published"),
  };
}

export async function loadDraftCmsContent() {
  return fetchCmsDocument(DRAFT_CONTENT_ID);
}

export async function loadPublishedCmsContent() {
  return fetchCmsDocument(PUBLISHED_CONTENT_ID);
}

export async function saveDraftCmsContent(content: CmsContent, user: User | null) {
  return saveCmsDocument(DRAFT_CONTENT_ID, content, user);
}

export async function publishCmsContent(content: CmsContent, user: User | null) {
  return saveCmsDocument(PUBLISHED_CONTENT_ID, buildPublishedContent(content), user);
}

function safeFileName(fileName: string) {
  const cleaned = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "image";
}

export async function uploadCmsImage(file: File, user: User | null) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error(getBackendSetupMessage());
  if (!user) throw new Error("Please sign in before uploading images.");

  const path = `${user.id}/${Date.now()}-${safeFileName(file.name)}`;
  const { data, error } = await supabase.storage
    .from(mediaBucket)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage.from(mediaBucket).getPublicUrl(data.path);
  if (!publicData.publicUrl) throw new Error("Image uploaded but no public URL was returned.");

  return publicData.publicUrl;
}
