import type { CmsTheme } from "../types";

interface ThemePanelProps {
  theme: CmsTheme;
  onChange: (theme: CmsTheme) => void;
}

export default function ThemePanel({ theme, onChange }: ThemePanelProps) {
  function updateSection<K extends keyof CmsTheme>(
    section: K,
    key: keyof CmsTheme[K],
    value: string | number | boolean,
  ) {
    onChange({
      ...theme,
      [section]: {
        ...theme[section],
        [key]: value,
      },
    });
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] opacity-60 mb-2">
          Global Theme
        </p>
        <h2 className="text-2xl font-semibold">Design controls</h2>
        <p className="text-sm opacity-70 mt-2">
          Update colors, typography, spacing, buttons and image styling.
        </p>
      </div>

      <section>
        <h3 className="font-semibold mb-4">Colors</h3>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(theme.colors).map(([key, value]) => (
            <label key={key} className="block">
              <span className="block text-sm font-medium capitalize mb-2">
                {key}
              </span>

              <div className="flex gap-2">
                <input
                  type="color"
                  value={value}
                  onChange={(event) =>
                    updateSection("colors", key as keyof CmsTheme["colors"], event.target.value)
                  }
                  className="h-10 w-12 rounded border border-border"
                />

                <input
                  value={value}
                  onChange={(event) =>
                    updateSection("colors", key as keyof CmsTheme["colors"], event.target.value)
                  }
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-4">Typography</h3>

        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Heading font</span>
            <input
              value={theme.typography.headingFont}
              onChange={(event) =>
                updateSection("typography", "headingFont", event.target.value)
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Body font</span>
            <input
              value={theme.typography.bodyFont}
              onChange={(event) =>
                updateSection("typography", "bodyFont", event.target.value)
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Base font size</span>
            <input
              type="number"
              value={theme.typography.baseFontSize}
              onChange={(event) =>
                updateSection("typography", "baseFontSize", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Line height</span>
            <input
              type="number"
              step="0.1"
              value={theme.typography.lineHeight}
              onChange={(event) =>
                updateSection("typography", "lineHeight", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-4">Layout</h3>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Container width</span>
            <input
              type="number"
              value={theme.layout.containerWidth}
              onChange={(event) =>
                updateSection("layout", "containerWidth", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Section padding</span>
            <input
              type="number"
              value={theme.layout.sectionPadding}
              onChange={(event) =>
                updateSection("layout", "sectionPadding", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Border radius</span>
            <input
              type="number"
              value={theme.layout.borderRadius}
              onChange={(event) =>
                updateSection("layout", "borderRadius", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-4">Buttons and images</h3>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-medium mb-2">Button radius</span>
            <input
              type="number"
              value={theme.buttons.radius}
              onChange={(event) =>
                updateSection("buttons", "radius", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Image radius</span>
            <input
              type="number"
              value={theme.images.defaultRadius}
              onChange={(event) =>
                updateSection("images", "defaultRadius", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium mb-2">Overlay opacity</span>
            <input
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={theme.images.defaultOverlayOpacity}
              onChange={(event) =>
                updateSection("images", "defaultOverlayOpacity", Number(event.target.value))
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
