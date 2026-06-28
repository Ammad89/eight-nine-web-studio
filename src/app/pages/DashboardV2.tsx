import { useEffect, useState, type FormEvent } from "react";
import CmsShell from "../../cms-core/dashboard/CmsShell";
import PagesPanel from "../../cms-core/dashboard/PagesPanel";
import BlocksPanel from "../../cms-core/dashboard/BlocksPanel";
import FieldsPanel from "../../cms-core/dashboard/FieldsPanel";
import PreviewRenderer from "../../cms-core/dashboard/PreviewRenderer";
import ThemePanel from "../../cms-core/dashboard/ThemePanel";
import SiteSettingsPanel from "../../cms-core/dashboard/SiteSettingsPanel";
import MediaLibrary from "../../cms-core/dashboard/MediaLibrary";
import VersionHistoryPanel from "../../cms-core/dashboard/VersionHistoryPanel";
import PlatformOverviewPanel from "../../cms-core/dashboard/platform/PlatformOverviewPanel";
import PlatformSiteSettingsPanel from "../../cms-core/dashboard/platform/PlatformSiteSettingsPanel";
import PlatformNavigationPanel from "../../cms-core/dashboard/platform/PlatformNavigationPanel";
import PlatformPagesPanel from "../../cms-core/dashboard/platform/PlatformPagesPanel";
import PlatformSectionsPanel from "../../cms-core/dashboard/platform/PlatformSectionsPanel";
import {
  loadLocalVersions,
  saveLocalVersion,
} from "../../cms-core/versioning/version-storage";
import {
  loadPublishedSnapshot,
  publishSnapshot,
  publishPlatformSnapshot,
} from "../../cms-core/versioning/publish-storage";
import { saveRemoteSnapshot } from "../../cms-core/versioning/remote-publish-storage";
import {
  getBackendSetupMessage,
  getDashboardUser,
  getSupabaseClient,
  isDashboardAdmin,
  isSupabaseConfigured,
  signInDashboard,
  signOutDashboard,
} from "../../app/cms/remoteStorage";
import type { User } from "@supabase/supabase-js";
import { useCmsEditor } from "../../cms-core/dashboard/useCmsEditor";
import { useWebsite } from "../../cms-core/platform";

type EditorTab =
  | "platform"
  | "site"
  | "navigation"
  | "pages"
  | "sections"
  | "content"
  | "theme"
  | "settings"
  | "media"
  | "versions";

export default function DashboardV2() {
  const editor = useCmsEditor();
  const { website, setWebsite } = useWebsite();
  const [activeTab, setActiveTab] = useState<EditorTab>("platform");
  const [versions, setVersions] = useState(() => loadLocalVersions());
  const [published, setPublished] = useState(() => loadPublishedSnapshot());

  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setAuthChecked(true);
      return;
    }

    const supabase = getSupabaseClient();
    let active = true;

    getDashboardUser()
      .then(async currentUser => {
        if (!active) return;
        setUser(currentUser);
        setAuthChecked(true);

        if (currentUser) {
          const adminResult = await isDashboardAdmin();
          if (!active) return;
          setIsAdmin(adminResult);
        }

        setAdminChecked(true);
      })
      .catch(() => {
        if (!active) return;
        setAuthChecked(true);
      });

    const subscription = supabase?.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setAdminChecked(false);

      if (session?.user) {
        const adminResult = await isDashboardAdmin();
        setIsAdmin(adminResult);
      } else {
        setIsAdmin(false);
      }

      setAdminChecked(true);
    }).data.subscription;

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError("");

    try {
      const signedInUser = await signInDashboard(email, password);
      setUser(signedInUser);

      const adminResult = await isDashboardAdmin();
      setIsAdmin(adminResult);
      setAdminChecked(true);

      setPassword("");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    setAuthBusy(true);

    try {
      await signOutDashboard();
      setUser(null);
      setIsAdmin(false);
      setAdminChecked(true);
      setPassword("");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Unable to sign out.");
    } finally {
      setAuthBusy(false);
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8 text-foreground">
        Checking authentication...
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8 text-foreground">
        <div className="w-full max-w-xl rounded-2xl border border-border p-6">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Backend setup required
          </p>
          <h1 className="mb-3 text-2xl font-semibold">
            Connect Supabase before using Dashboard V2
          </h1>
          <p className="text-sm opacity-70">
            {getBackendSetupMessage()}
          </p>
        </div>
      </div>
    );
  }

  if (user && !adminChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8 text-foreground">
        Checking permissions...
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <div className="w-full max-w-md rounded-2xl border border-border p-6 shadow-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Access denied
          </p>

          <h1 className="mb-3 text-2xl font-semibold">
            You are signed in but not authorized
          </h1>

          <p className="mb-6 text-sm opacity-70">
            Your account is authenticated, but it is not listed as an approved CMS admin for this website.
          </p>

          <p className="mb-6 text-xs opacity-60">
            Signed in as {user.email}
          </p>

          {authError && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={authBusy}
            className="w-full rounded-lg border border-border px-4 py-3 text-sm disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-border p-6 shadow-sm"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-60">
            Secure CMS
          </p>

          <h1 className="mb-3 text-2xl font-semibold">
            Sign in to Dashboard V2
          </h1>

          <p className="mb-6 text-sm opacity-70">
            Use your approved Eight Nine Web Studio CMS login.
          </p>

          {authError && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {authError}
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>

            <button
              type="submit"
              disabled={authBusy}
              className="w-full rounded-lg bg-foreground px-4 py-3 text-sm text-background disabled:opacity-50"
            >
              {authBusy ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <CmsShell
      sidebar={
        <div>
          <PagesPanel
            selectedSlug={editor.selectedPageSlug}
            onSelect={editor.selectPage}
          />

          <BlocksPanel
            blocks={editor.selectedPage?.blocks || []}
            allowedBlocks={editor.allowedBlocks}
            selectedBlockId={editor.selectedBlock?.id}
            onSelect={editor.selectBlock}
            onDelete={editor.removeBlock}
            onAddBlock={editor.addBlock}
          />
        </div>
      }
      editor={
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-border p-4">
            <div className="text-xs opacity-70">
              <div>
                {published
                  ? `Published ${new Date(published.publishedAt).toLocaleString()}`
                  : "Not published yet"}
              </div>
              <div className="mt-1">
                Signed in as {user.email}
              </div>
            </div>

            <div className="flex gap-2">
              <button
              type="button"
              onClick={() => {
                saveLocalVersion(
                  {
                    pages: editor.pages,
                    theme: editor.theme,
                    siteSettings: editor.siteSettings,
                  },
                  `Manual Save ${new Date().toLocaleTimeString()}`
                );

                setVersions(loadLocalVersions());
                setActiveTab("versions");
              }}
              className="rounded-lg bg-foreground px-4 py-2 text-sm text-background"
            >
              Save Version
              </button>

              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={authBusy}
                className="rounded-lg border border-border px-4 py-2 text-sm"
              >
                Logout
              </button>

              <button
                type="button"
                onClick={async () => {
                  const snapshot = {
                    pages: editor.pages,
                    theme: editor.theme,
                    siteSettings: editor.siteSettings,
                  };

                  const nextPublished = publishSnapshot(snapshot);
                  setPublished(nextPublished);

                  const platformPublished = publishPlatformSnapshot(website);
                  setWebsite(platformPublished.website);

                  try {
                    await saveRemoteSnapshot("published", snapshot);
                    await saveRemoteSnapshot("platform-published", {
                      website: platformPublished.website,
                    });
                    alert("Published legacy CMS state and platform WebsiteSchema to Supabase");
                  } catch (error) {
                    console.error(error);
                    alert(
                      "Saved locally, but Supabase publish failed. Check the CMS v2 schema and admin permissions."
                    );
                  }
                }}
                className="rounded-lg border border-border px-4 py-2 text-sm"
              >
                Publish
              </button>
            </div>
          </div>

          <div className="sticky top-0 z-10 flex gap-2 border-b border-border bg-background p-4">
            {(["platform", "site", "navigation", "pages", "sections", "content", "theme", "settings", "media", "versions"] as EditorTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-sm capitalize ${
                  activeTab === tab
                    ? "bg-foreground text-background"
                    : "border border-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "platform" && (
            <PlatformOverviewPanel />
          )}

          {activeTab === "site" && (
            <PlatformSiteSettingsPanel />
          )}

          {activeTab === "navigation" && (
            <PlatformNavigationPanel />
          )}

          {activeTab === "pages" && (
            <PlatformPagesPanel />
          )}

          {activeTab === "sections" && (
            <PlatformSectionsPanel />
          )}

          {activeTab === "content" && (
            <FieldsPanel
              block={editor.selectedBlock}
              onChangeField={editor.updateBlockField}
            />
          )}

          {activeTab === "theme" && (
            <ThemePanel
              theme={editor.theme}
              onChange={editor.setTheme}
            />
          )}

          {activeTab === "settings" && (
            <SiteSettingsPanel
              settings={editor.siteSettings}
              onChange={editor.setSiteSettings}
            />
          )}

          {activeTab === "media" && (
            <MediaLibrary
              onSelect={(url) => {
                if (!editor.selectedBlock) return;

                const imageField = Object.keys(editor.selectedBlock.fields).find((key) =>
                  key.toLowerCase().includes("image")
                );

                if (!imageField) return;

                editor.updateBlockField(imageField, url);
                setActiveTab("content");
              }}
            />
          )}

          {activeTab === "versions" && (
            <VersionHistoryPanel
              versions={versions}
              onRestore={(version) => {
                editor.restoreSnapshot(version.snapshot);

                alert(
                   `Restored ${version.label}`
               );
              }}
            />
          )}
        </div>
      }
      preview={
        <PreviewRenderer
          page={editor.selectedPage}
          theme={editor.theme}
          siteSettings={editor.siteSettings}
        />
      }
    />
  );
}
