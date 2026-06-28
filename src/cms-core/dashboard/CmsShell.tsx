import { ReactNode } from "react";

interface CmsShellProps {
  sidebar: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
}

export default function CmsShell({
  sidebar,
  editor,
  preview,
}: CmsShellProps) {
  return (
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      <aside className="w-72 border-r border-border overflow-y-auto">
        {sidebar}
      </aside>

      <main className="flex-1 border-r border-border overflow-y-auto">
        {editor}
      </main>

      <section className="w-[45%] overflow-y-auto bg-white">
        {preview}
      </section>
    </div>
  );
}
