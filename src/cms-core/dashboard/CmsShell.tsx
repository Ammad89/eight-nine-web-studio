import { ReactNode } from "react";

interface CmsShellProps {
  sidebar: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
  focusMode?: boolean;
}

export default function CmsShell({
  sidebar,
  editor,
  preview,
  focusMode = false,
}: CmsShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {!focusMode && (
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-border">
          {sidebar}
        </aside>
      )}

      <main
        className={
          focusMode
            ? "min-w-0 flex-1 overflow-y-auto"
            : "min-w-0 flex-1 overflow-y-auto border-r border-border"
        }
      >
        {editor}
      </main>

      {!focusMode && (
        <section className="w-[45%] shrink-0 overflow-y-auto bg-white">
          {preview}
        </section>
      )}
    </div>
  );
}
