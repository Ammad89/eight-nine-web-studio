import type {
  ElementStyle,
  PageSection,
  ResponsiveDevice,
} from "../../platform";

interface SectionStyleInspectorProps {
  section: PageSection;
  previewMode: ResponsiveDevice;
  onUpdate: (
    field: keyof ElementStyle,
    value: string | number | undefined,
  ) => void;
  onReset: () => void;
}

function fieldClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

export default function SectionStyleInspector({
  section,
  previewMode,
  onUpdate,
  onReset,
}: SectionStyleInspectorProps) {
  const style =
    section.style?.[previewMode] || {};

  return (
    <div className="border-t border-border pt-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
          Layout and Layers
        </p>

        <span className="rounded-full border border-border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
          {previewMode}
        </span>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Width
          </span>

          <input
            id="section-style-width"
            name="sectionStyleWidth"
            value={style.width || ""}
            onChange={event =>
              onUpdate(
                "width",
                event.target.value || undefined,
              )
            }
            className={fieldClass()}
            placeholder="100%, 800px or auto"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Minimum Height
          </span>

          <input
            id="section-style-min-height"
            name="sectionStyleMinHeight"
            value={style.minHeight || ""}
            onChange={event =>
              onUpdate(
                "minHeight",
                event.target.value || undefined,
              )
            }
            className={fieldClass()}
            placeholder="500px or 80vh"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Padding Top
            </span>

            <input
              id="section-style-padding-top"
              name="sectionStylePaddingTop"
              type="number"
              min="0"
              value={style.paddingTop ?? ""}
              onChange={event =>
                onUpdate(
                  "paddingTop",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              className={fieldClass()}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Padding Bottom
            </span>

            <input
              id="section-style-padding-bottom"
              name="sectionStylePaddingBottom"
              type="number"
              min="0"
              value={style.paddingBottom ?? ""}
              onChange={event =>
                onUpdate(
                  "paddingBottom",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              className={fieldClass()}
            />
          </label>
        </div>

        <label className="block">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              Opacity
            </span>

            <span className="text-xs opacity-60">
              {Math.round((style.opacity ?? 1) * 100)}%
            </span>
          </div>

          <input
            id="section-style-opacity"
            name="sectionStyleOpacity"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={style.opacity ?? 1}
            onChange={event =>
              onUpdate(
                "opacity",
                Number(event.target.value),
              )
            }
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Background Colour
          </span>

          <div className="flex gap-2">
            <input
              id="section-style-background-picker"
              name="sectionStyleBackgroundPicker"
              type="color"
              value={style.backgroundColor || "#ffffff"}
              onChange={event =>
                onUpdate(
                  "backgroundColor",
                  event.target.value,
                )
              }
              className="h-10 w-12 rounded-lg border border-border"
            />

            <input
              id="section-style-background"
              name="sectionStyleBackground"
              value={style.backgroundColor || ""}
              onChange={event =>
                onUpdate(
                  "backgroundColor",
                  event.target.value || undefined,
                )
              }
              className={fieldClass()}
              placeholder="#ffffff"
            />
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Radius
            </span>

            <input
              id="section-style-radius"
              name="sectionStyleRadius"
              type="number"
              min="0"
              value={style.borderRadius ?? ""}
              onChange={event =>
                onUpdate(
                  "borderRadius",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              className={fieldClass()}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              Layer Order
            </span>

            <input
              id="section-style-z-index"
              name="sectionStyleZIndex"
              type="number"
              value={style.zIndex ?? ""}
              onChange={event =>
                onUpdate(
                  "zIndex",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              className={fieldClass()}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Overflow
          </span>

          <select
            id="section-style-overflow"
            name="sectionStyleOverflow"
            value={style.overflow || ""}
            onChange={event =>
              onUpdate(
                "overflow",
                event.target.value || undefined,
              )
            }
            className={fieldClass()}
          >
            <option value="">Theme default</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
            <option value="auto">Auto</option>
          </select>
        </label>

        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
        >
          Reset {previewMode} styles
        </button>
      </div>
    </div>
  );
}
