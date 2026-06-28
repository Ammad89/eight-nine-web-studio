import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Cloud,
  Download,
  Eye,
  FilePlus2,
  Image,
  Layers,
  ListPlus,
  LogIn,
  LogOut,
  MoveDown,
  MoveUp,
  Plus,
  RefreshCw,
  Save,
  Send,
  Trash2,
  Type,
  Upload,
} from "lucide-react";
import SEO from "../components/SEO";
import { defaultCmsContent } from "../cms/defaultContent";
import { createCmsId } from "../cms/storage";
import {
  getBackendSetupMessage,
  getDashboardUser,
  getSupabaseClient,
  isSupabaseConfigured,
  loadDraftCmsContent,
  publishCmsContent,
  saveDraftCmsContent,
  signInDashboard,
  signOutDashboard,
  uploadCmsImage,
} from "../cms/remoteStorage";
import type { CmsContent, CmsElement, CmsElementType, CmsPage, CmsSection, CmsSectionType } from "../cms/types";

const sectionTypes: CmsSectionType[] = ["hero", "content", "gallery", "cards", "stats", "testimonials", "pricing", "cta"];
const elementTypes: CmsElementType[] = ["eyebrow", "heading", "text", "image", "button", "stat", "testimonial", "package", "listItem"];

function cloneDefaultContent(): CmsContent {
  return JSON.parse(JSON.stringify(defaultCmsContent)) as CmsContent;
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "new-page";
}

function createPage(pageCount: number): CmsPage {
  const id = createCmsId("page");
  const title = `New Page ${pageCount + 1}`;

  return {
    id,
    slug: slugify(title),
    title,
    navLabel: title,
    status: "draft",
    seoTitle: `${title} | EHRay Photography`,
    seoDescription: "Draft page managed through the EHRay dashboard.",
    sections: [
      {
        id: createCmsId("section"),
        type: "content",
        title: "New Section",
        subtitle: "",
        elements: [
          {
            id: createCmsId("element"),
            type: "heading",
            label: "Heading",
            text: "Add a clear heading here",
          },
        ],
      },
    ],
  };
}

function createSection(): CmsSection {
  return {
    id: createCmsId("section"),
    type: "content",
    title: "New Section",
    subtitle: "",
    elements: [
      {
        id: createCmsId("element"),
        type: "text",
        label: "Paragraph",
        text: "Write the section copy here.",
      },
    ],
  };
}

function createElement(type: CmsElementType = "text"): CmsElement {
  const base = {
    id: createCmsId("element"),
    type,
    label: type === "listItem" ? "Card item" : type[0].toUpperCase() + type.slice(1),
    text: "",
  };

  if (type === "image") return { ...base, label: "Image", imageUrl: "", alt: "" };
  if (type === "button") return { ...base, label: "Button", text: "Learn more", href: "/#contact" };
  if (type === "stat") return { ...base, label: "Stat", text: "8+\nYears of Experience (draft)" };
  if (type === "testimonial") return { ...base, label: "Testimonial", text: "Client quote goes here.\nClient name\nDraft testimonial" };
  if (type === "package") return { ...base, label: "Package", text: "Package name\nIndicative AED 1,200\nFeature one\nFeature two" };
  if (type === "listItem") return { ...base, text: "Card title\nShort supporting copy", href: "#" };
  if (type === "heading") return { ...base, text: "New heading" };
  if (type === "eyebrow") return { ...base, text: "EHRay Photography" };

  return { ...base, text: "Write the copy here." };
}

function getElementHint(type: CmsElementType) {
  if (type === "stat") return "Line 1 is the number. Line 2 is the label.";
  if (type === "testimonial") return "Line 1 is the quote. Line 2 is the name. Line 3 is the role or source.";
  if (type === "package") return "Line 1 is the package name. Line 2 is the price. Each extra line becomes a feature.";
  if (type === "listItem") return "Line 1 is the card title. Line 2 is the supporting copy.";
  if (type === "image") return "Use the image URL field or upload to the live media library.";
  return "Edit this text directly.";
}

function exportContent(content: CmsContent) {
  const file = new Blob([JSON.stringify({ ...content, updatedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ehray-content-draft.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function SidebarButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${active ? "bg-foreground text-background" : "hover:bg-muted text-foreground"}`}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">{children}</label>;
}

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground ${props.className || ""}`}
    />
  );
}

function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full min-h-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground ${props.className || ""}`}
    />
  );
}

function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground ${props.className || ""}`}
    />
  );
}

function IconButton({
  label,
  children,
  disabled,
  onClick,
}: {
  label: string;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-35 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function DashboardGate({
  authChecked,
  email,
  password,
  authError,
  busy,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  authChecked: boolean;
  email: string;
  password: string;
  authError: string;
  busy: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (!authChecked) {
    return (
      <main className="min-h-screen bg-secondary text-foreground grid place-items-center px-5">
        <SEO title="EHRay Dashboard Login" description="Secure EHRay Photography dashboard login." />
        <div className="w-full max-w-md rounded-lg border border-border bg-background p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Secure dashboard</p>
          <h1 className="text-2xl font-medium text-foreground mb-3">Checking login</h1>
          <p className="text-sm text-muted-foreground">Connecting to the dashboard backend.</p>
        </div>
      </main>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-secondary text-foreground grid place-items-center px-5">
        <SEO title="EHRay Dashboard Setup" description="Supabase setup required for the EHRay dashboard." />
        <div className="w-full max-w-xl rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
            <Cloud size={18} />
            Backend setup required
          </div>
          <h1 className="text-2xl font-medium text-foreground mb-3">Connect Supabase before using the dashboard</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{getBackendSetupMessage()}</p>
          <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted-foreground">
            Add the values in `.env`, then deploy the same environment variables with the hosting provider.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary text-foreground grid place-items-center px-5">
      <SEO title="EHRay Dashboard Login" description="Secure EHRay Photography dashboard login." />
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg border border-border bg-background p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
          <LogIn size={18} />
          Admin login
        </div>
        <h1 className="text-2xl font-medium text-foreground mb-3">Sign in to edit the website</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">Only approved dashboard users can change content or upload media.</p>
        {authError && <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive mb-4">{authError}</div>}
        <div className="grid gap-4">
          <div>
            <FieldLabel>Email</FieldLabel>
            <TextInput type="email" autoComplete="email" value={email} onChange={event => onEmailChange(event.target.value)} required />
          </div>
          <div>
            <FieldLabel>Password</FieldLabel>
            <TextInput type="password" autoComplete="current-password" value={password} onChange={event => onPasswordChange(event.target.value)} required />
          </div>
          <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm text-background hover:opacity-85 disabled:opacity-50">
            <LogIn size={16} />
            {busy ? "Signing in" : "Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function Dashboard() {
  const [content, setContent] = useState<CmsContent>(() => cloneDefaultContent());
  const [selectedPageId, setSelectedPageId] = useState(() => content.pages[0]?.id || "");
  const [selectedSectionId, setSelectedSectionId] = useState(() => content.pages[0]?.sections[0]?.id || "");
  const [selectedElementId, setSelectedElementId] = useState(() => content.pages[0]?.sections[0]?.elements[0]?.id || "");
  const [notice, setNotice] = useState("Checking dashboard access");
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  function applyContent(nextContent: CmsContent, nextNotice?: string) {
    setContent(nextContent);
    setSelectedPageId(nextContent.pages[0]?.id || "");
    setSelectedSectionId(nextContent.pages[0]?.sections[0]?.id || "");
    setSelectedElementId(nextContent.pages[0]?.sections[0]?.elements[0]?.id || "");
    if (nextNotice) setNotice(nextNotice);
  }

  async function loadRemoteDraft() {
    setBusy(true);
    try {
      const draftContent = await loadDraftCmsContent();
      applyContent(draftContent, "Draft loaded from Supabase");
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setAuthChecked(true);
      setNotice("Supabase setup required");
      return;
    }

    const supabase = getSupabaseClient();
    let active = true;

    getDashboardUser()
      .then(currentUser => {
        if (!active) return;
        setUser(currentUser);
        setAuthChecked(true);
        if (currentUser) {
          void loadRemoteDraft();
        } else {
          setNotice("Sign in to manage the website");
        }
      })
      .catch(() => {
        if (!active) return;
        setAuthChecked(true);
        setNotice("Sign in to manage the website");
      });

    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    }).data.subscription;

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  const selectedPage = useMemo(
    () => content.pages.find(page => page.id === selectedPageId) || content.pages[0],
    [content.pages, selectedPageId],
  );
  const selectedSection = useMemo(
    () => selectedPage?.sections.find(section => section.id === selectedSectionId) || selectedPage?.sections[0],
    [selectedPage, selectedSectionId],
  );
  const selectedElement = useMemo(
    () => selectedSection?.elements.find(element => element.id === selectedElementId) || selectedSection?.elements[0],
    [selectedSection, selectedElementId],
  );

  function updateContent(updater: (current: CmsContent) => CmsContent) {
    setContent(current => updater(current));
  }

  function updatePage(patch: Partial<CmsPage>) {
    if (!selectedPage) return;
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (page.id === selectedPage.id ? { ...page, ...patch } : page)),
    }));
  }

  function updateSection(patch: Partial<CmsSection>) {
    if (!selectedPage || !selectedSection) return;
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id
          ? {
            ...page,
            sections: page.sections.map(section => (section.id === selectedSection.id ? { ...section, ...patch } : section)),
          }
          : page
      )),
    }));
  }

  function updateElement(patch: Partial<CmsElement>) {
    if (!selectedPage || !selectedSection || !selectedElement) return;
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id
          ? {
            ...page,
            sections: page.sections.map(section => (
              section.id === selectedSection.id
                ? {
                  ...section,
                  elements: section.elements.map(element => (element.id === selectedElement.id ? { ...element, ...patch } : element)),
                }
                : section
            )),
          }
          : page
      )),
    }));
  }

  function handleAddPage() {
    const nextPage = createPage(content.pages.length);
    updateContent(current => ({ ...current, pages: [...current.pages, nextPage] }));
    setSelectedPageId(nextPage.id);
    setSelectedSectionId(nextPage.sections[0]?.id || "");
    setSelectedElementId(nextPage.sections[0]?.elements[0]?.id || "");
    setNotice("New page added");
  }

  function handleDeletePage() {
    if (!selectedPage || content.pages.length === 1) return;
    const remainingPages = content.pages.filter(page => page.id !== selectedPage.id);
    updateContent(current => ({ ...current, pages: current.pages.filter(page => page.id !== selectedPage.id) }));
    setSelectedPageId(remainingPages[0]?.id || "");
    setSelectedSectionId(remainingPages[0]?.sections[0]?.id || "");
    setSelectedElementId(remainingPages[0]?.sections[0]?.elements[0]?.id || "");
    setNotice("Page deleted");
  }

  function handleAddSection() {
    if (!selectedPage) return;
    const nextSection = createSection();
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id ? { ...page, sections: [...page.sections, nextSection] } : page
      )),
    }));
    setSelectedSectionId(nextSection.id);
    setSelectedElementId(nextSection.elements[0]?.id || "");
    setNotice("Section added");
  }

  function handleDeleteSection() {
    if (!selectedPage || !selectedSection || selectedPage.sections.length === 1) return;
    const remainingSections = selectedPage.sections.filter(section => section.id !== selectedSection.id);
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id ? { ...page, sections: page.sections.filter(section => section.id !== selectedSection.id) } : page
      )),
    }));
    setSelectedSectionId(remainingSections[0]?.id || "");
    setSelectedElementId(remainingSections[0]?.elements[0]?.id || "");
    setNotice("Section deleted");
  }

  function handleAddElement(type: CmsElementType = "text") {
    if (!selectedPage || !selectedSection) return;
    const nextElement = createElement(type);
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id
          ? {
            ...page,
            sections: page.sections.map(section => (
              section.id === selectedSection.id
                ? { ...section, elements: [...section.elements, nextElement] }
                : section
            )),
          }
          : page
      )),
    }));
    setSelectedElementId(nextElement.id);
    setNotice("Element added");
  }

  function handleDeleteElement() {
    if (!selectedPage || !selectedSection || !selectedElement || selectedSection.elements.length === 1) return;
    const remainingElements = selectedSection.elements.filter(element => element.id !== selectedElement.id);
    updateContent(current => ({
      ...current,
      pages: current.pages.map(page => (
        page.id === selectedPage.id
          ? {
            ...page,
            sections: page.sections.map(section => (
              section.id === selectedSection.id
                ? { ...section, elements: section.elements.filter(element => element.id !== selectedElement.id) }
                : section
            )),
          }
          : page
      )),
    }));
    setSelectedElementId(remainingElements[0]?.id || "");
    setNotice("Element deleted");
  }

  function moveSection(direction: -1 | 1) {
    if (!selectedPage || !selectedSection) return;
    const index = selectedPage.sections.findIndex(section => section.id === selectedSection.id);
    const target = index + direction;
    if (target < 0 || target >= selectedPage.sections.length) return;

    const sections = [...selectedPage.sections];
    const [moved] = sections.splice(index, 1);
    sections.splice(target, 0, moved);
    updatePage({ sections });
  }

  function moveElement(direction: -1 | 1) {
    if (!selectedSection || !selectedElement) return;
    const index = selectedSection.elements.findIndex(element => element.id === selectedElement.id);
    const target = index + direction;
    if (target < 0 || target >= selectedSection.elements.length) return;

    const elements = [...selectedSection.elements];
    const [moved] = elements.splice(index, 1);
    elements.splice(target, 0, moved);
    updateSection({ elements });
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setAuthError("");

    try {
      const signedInUser = await signInDashboard(email, password);
      setUser(signedInUser);
      setPassword("");
      await loadRemoteDraft();
    } catch (error) {
      setAuthError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setBusy(true);
    try {
      await signOutDashboard();
      setUser(null);
      setNotice("Signed out");
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleSave() {
    if (!user) {
      setNotice("Sign in before saving changes");
      return;
    }

    setBusy(true);
    try {
      const nextContent = await saveDraftCmsContent(content, user);
      setContent(nextContent);
      setNotice("Draft saved to Supabase");
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  async function handlePublish() {
    if (!user) {
      setNotice("Sign in before publishing changes");
      return;
    }

    const publishedPageCount = content.pages.filter(page => page.status === "published").length;
    if (publishedPageCount === 0) {
      setNotice("Mark at least one page as published before publishing the site");
      return;
    }

    setBusy(true);
    try {
      const draftContent = await saveDraftCmsContent(content, user);
      const publishedContent = await publishCmsContent(draftContent, user);
      setContent(draftContent);
      setNotice(`${publishedContent.pages.length} page${publishedContent.pages.length === 1 ? "" : "s"} published to the website`);
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }

  function handleReset() {
    applyContent(cloneDefaultContent(), "Starter content loaded. Save draft to keep it.");
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result)) as CmsContent;
        if (!Array.isArray(imported.pages)) throw new Error("Missing pages");
        setContent(imported);
        setSelectedPageId(imported.pages[0]?.id || "");
        setSelectedSectionId(imported.pages[0]?.sections[0]?.id || "");
        setSelectedElementId(imported.pages[0]?.sections[0]?.elements[0]?.id || "");
        setNotice("Content imported. Save draft to keep it in Supabase.");
      } catch {
        setNotice("Import failed. Use a dashboard JSON export.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setBusy(true);
    try {
      const imageUrl = await uploadCmsImage(file, user);
      updateElement({ imageUrl, alt: selectedElement?.alt || file.name });
      setNotice("Image uploaded to Supabase media storage");
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setBusy(false);
    }

    event.target.value = "";
  }

  const selectedSectionIndex = selectedPage?.sections.findIndex(section => section.id === selectedSection?.id) ?? -1;
  const selectedElementIndex = selectedSection?.elements.findIndex(element => element.id === selectedElement?.id) ?? -1;

  if (!authChecked || !user) {
    return (
      <DashboardGate
        authChecked={authChecked}
        email={email}
        password={password}
        authError={authError}
        busy={busy}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-screen bg-secondary text-foreground">
      <SEO title="EHRay Dashboard" description="Draft content dashboard for EHRay Photography." />
      <div className="border-b border-border bg-background">
        <div className="max-w-[1500px] mx-auto px-5 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Secure CMS</p>
            <h1 className="text-2xl font-medium text-foreground">EHRay content dashboard</h1>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground">{notice}</span>
            <button type="button" onClick={() => importInputRef.current?.click()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted disabled:opacity-50">
              <Upload size={16} />
              Import
            </button>
            <button type="button" onClick={() => exportContent(content)} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted disabled:opacity-50">
              <Download size={16} />
              Export
            </button>
            <button type="button" onClick={handleReset} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted disabled:opacity-50">
              <RefreshCw size={16} />
              Reset
            </button>
            <button type="button" onClick={handleSave} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted disabled:opacity-50">
              <Save size={16} />
              Save draft
            </button>
            <button type="button" onClick={handlePublish} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm text-background hover:opacity-85 disabled:opacity-50">
              <Send size={16} />
              Publish
            </button>
            <button type="button" onClick={handleSignOut} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted disabled:opacity-50">
              <LogOut size={16} />
              Sign out
            </button>
            <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto p-5 grid gap-5 xl:grid-cols-[280px_340px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FilePlus2 size={16} />
              Pages
            </div>
            <button type="button" title="Add page" aria-label="Add page" onClick={handleAddPage} className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Plus size={17} />
            </button>
          </div>
          <div className="space-y-2">
            {content.pages.map(page => (
              <SidebarButton
                key={page.id}
                active={page.id === selectedPage?.id}
                onClick={() => {
                  setSelectedPageId(page.id);
                  setSelectedSectionId(page.sections[0]?.id || "");
                  setSelectedElementId(page.sections[0]?.elements[0]?.id || "");
                }}
              >
                <span className="block text-sm font-medium">{page.navLabel || page.title}</span>
                <span className="block text-xs opacity-70">/{page.slug}</span>
              </SidebarButton>
            ))}
          </div>
        </aside>

        <aside className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Layers size={16} />
              Sections
            </div>
            <button type="button" title="Add section" aria-label="Add section" onClick={handleAddSection} className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <Plus size={17} />
            </button>
          </div>
          <div className="space-y-2">
            {selectedPage?.sections.map(section => (
              <SidebarButton
                key={section.id}
                active={section.id === selectedSection?.id}
                onClick={() => {
                  setSelectedSectionId(section.id);
                  setSelectedElementId(section.elements[0]?.id || "");
                }}
              >
                <span className="block text-sm font-medium">{section.title}</span>
                <span className="block text-xs opacity-70">{section.type} - {section.elements.length} elements</span>
              </SidebarButton>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ListPlus size={16} />
                Elements
              </div>
              <button type="button" title="Add element" aria-label="Add element" onClick={() => handleAddElement("text")} className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
                <Plus size={17} />
              </button>
            </div>
            <div className="space-y-2">
              {selectedSection?.elements.map(element => (
                <SidebarButton
                  key={element.id}
                  active={element.id === selectedElement?.id}
                  onClick={() => setSelectedElementId(element.id)}
                >
                  <span className="block text-sm font-medium">{element.label}</span>
                  <span className="block text-xs opacity-70">{element.type}</span>
                </SidebarButton>
              ))}
            </div>
          </div>
        </aside>

        <section className="rounded-lg border border-border bg-background p-5">
          {selectedPage && (
            <div className="grid gap-6">
              <div className="flex flex-col gap-3 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Selected page</p>
                  <h2 className="text-xl font-medium text-foreground">{selectedPage.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`/draft/${selectedPage.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
                    <Eye size={16} />
                    Preview
                  </a>
                  <button type="button" onClick={handleDeletePage} disabled={content.pages.length === 1} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted disabled:opacity-35 disabled:hover:bg-transparent">
                    <Trash2 size={16} />
                    Delete page
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel>Page title</FieldLabel>
                  <TextInput value={selectedPage.title} onChange={event => updatePage({ title: event.target.value })} />
                </div>
                <div>
                  <FieldLabel>Navigation label</FieldLabel>
                  <TextInput value={selectedPage.navLabel} onChange={event => updatePage({ navLabel: event.target.value })} />
                </div>
                <div>
                  <FieldLabel>Page URL slug</FieldLabel>
                  <TextInput value={selectedPage.slug} onChange={event => updatePage({ slug: slugify(event.target.value) })} />
                </div>
                <div>
                  <FieldLabel>Status</FieldLabel>
                  <Select value={selectedPage.status} onChange={event => updatePage({ status: event.target.value as CmsPage["status"] })}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </Select>
                </div>
                <div>
                  <FieldLabel>SEO title</FieldLabel>
                  <TextInput value={selectedPage.seoTitle} onChange={event => updatePage({ seoTitle: event.target.value })} />
                </div>
                <div>
                  <FieldLabel>SEO description</FieldLabel>
                  <TextInput value={selectedPage.seoDescription} onChange={event => updatePage({ seoDescription: event.target.value })} />
                </div>
              </div>

              {selectedSection && (
                <div className="border-t border-border pt-6">
                  <div className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Selected section</p>
                      <h3 className="text-lg font-medium text-foreground">{selectedSection.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <IconButton label="Move section up" disabled={selectedSectionIndex <= 0} onClick={() => moveSection(-1)}>
                        <MoveUp size={16} />
                      </IconButton>
                      <IconButton label="Move section down" disabled={!selectedPage || selectedSectionIndex >= selectedPage.sections.length - 1} onClick={() => moveSection(1)}>
                        <MoveDown size={16} />
                      </IconButton>
                      <IconButton label="Delete section" disabled={selectedPage.sections.length === 1} onClick={handleDeleteSection}>
                        <Trash2 size={16} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <FieldLabel>Section title</FieldLabel>
                      <TextInput value={selectedSection.title} onChange={event => updateSection({ title: event.target.value })} />
                    </div>
                    <div>
                      <FieldLabel>Section type</FieldLabel>
                      <Select value={selectedSection.type} onChange={event => updateSection({ type: event.target.value as CmsSectionType })}>
                        {sectionTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </Select>
                    </div>
                    <div>
                      <FieldLabel>Section subtitle</FieldLabel>
                      <TextInput value={selectedSection.subtitle || ""} onChange={event => updateSection({ subtitle: event.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {selectedElement && (
                <div className="border-t border-border pt-6">
                  <div className="flex flex-col gap-3 mb-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">Selected element</p>
                      <h3 className="text-lg font-medium text-foreground">{selectedElement.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <IconButton label="Move element up" disabled={selectedElementIndex <= 0} onClick={() => moveElement(-1)}>
                        <MoveUp size={16} />
                      </IconButton>
                      <IconButton label="Move element down" disabled={!selectedSection || selectedElementIndex >= selectedSection.elements.length - 1} onClick={() => moveElement(1)}>
                        <MoveDown size={16} />
                      </IconButton>
                      <IconButton label="Delete element" disabled={selectedSection.elements.length === 1} onClick={handleDeleteElement}>
                        <Trash2 size={16} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <FieldLabel>Element label</FieldLabel>
                      <TextInput value={selectedElement.label} onChange={event => updateElement({ label: event.target.value })} />
                    </div>
                    <div>
                      <FieldLabel>Element type</FieldLabel>
                      <Select value={selectedElement.type} onChange={event => updateElement({ ...createElement(event.target.value as CmsElementType), id: selectedElement.id, label: selectedElement.label })}>
                        {elementTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <FieldLabel>Text</FieldLabel>
                        <span className="text-xs text-muted-foreground">{getElementHint(selectedElement.type)}</span>
                      </div>
                      <TextArea value={selectedElement.text} onChange={event => updateElement({ text: event.target.value })} />
                    </div>
                    <div>
                      <FieldLabel>Link target</FieldLabel>
                      <TextInput value={selectedElement.href || ""} onChange={event => updateElement({ href: event.target.value })} placeholder="/#contact" />
                    </div>
                    <div>
                      <FieldLabel>Image alt text</FieldLabel>
                      <TextInput value={selectedElement.alt || ""} onChange={event => updateElement({ alt: event.target.value })} placeholder="Describe the image" />
                    </div>
                    <div className="md:col-span-2">
                      <FieldLabel>Image URL</FieldLabel>
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
                        <TextInput value={selectedElement.imageUrl || ""} onChange={event => updateElement({ imageUrl: event.target.value })} placeholder="Paste an image URL or upload to media storage" />
                        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
                          <Upload size={16} />
                          Replace image
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                      {selectedElement.imageUrl && (
                        <div className="mt-4 grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
                          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                            <img src={selectedElement.imageUrl} alt={selectedElement.alt || selectedElement.label} className="h-full w-full object-cover" />
                          </div>
                          <div className="rounded-lg border border-border bg-secondary p-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 text-foreground mb-2">
                              <Image size={16} />
                              Draft image preview
                            </div>
                            Uploaded images are stored in the Supabase media bucket and can be used on published pages.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-6">
                <div className="flex flex-wrap gap-2">
                  {elementTypes.map(type => (
                    <button key={type} type="button" onClick={() => handleAddElement(type)} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
                      {type === "image" ? <Image size={15} /> : <Type size={15} />}
                      Add {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
