import type {
  ElementStyle,
  ResponsiveDevice,
} from "../../platform";

interface TextElementStyleInspectorProps {
  style: ElementStyle;
  previewMode: ResponsiveDevice;
  onUpdate: (
    property: keyof ElementStyle,
    value: ElementStyle[keyof ElementStyle],
  ) => void;
  onReset: () => void;
}

function fieldClass() {
  return "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";
}

export default function TextElementStyleInspector({
  style,
  previewMode,
  onUpdate,
  onReset,
}: TextElementStyleInspectorProps) {
  return (
    <div className="mt-5 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
          Typography
        </p>

        <span className="rounded-full border border-border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
          {previewMode}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Font Size
          </span>

          <input
            type="number"
            min="1"
            value={style.fontSize ?? ""}
            onChange={event =>
              onUpdate(
                "fontSize",
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className={fieldClass()}
            placeholder="48"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Weight
          </span>

          <select
            value={style.fontWeight ?? ""}
            onChange={event =>
              onUpdate(
                "fontWeight",
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className={fieldClass()}
          >
            <option value="">Theme default</option>
            <option value="300">Light 300</option>
            <option value="400">Regular 400</option>
            <option value="500">Medium 500</option>
            <option value="600">Semibold 600</option>
            <option value="700">Bold 700</option>
            <option value="800">Extra Bold 800</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Line Height
          </span>

          <input
            type="number"
            min="0.5"
            max="4"
            step="0.05"
            value={style.lineHeight ?? ""}
            onChange={event =>
              onUpdate(
                "lineHeight",
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className={fieldClass()}
            placeholder="1.2"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Letter Spacing
          </span>

          <input
            type="number"
            step="0.1"
            value={style.letterSpacing ?? ""}
            onChange={event =>
              onUpdate(
                "letterSpacing",
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            className={fieldClass()}
            placeholder="0"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Alignment
        </span>

        <select
          value={style.textAlign ?? ""}
          onChange={event =>
            onUpdate(
              "textAlign",
              event.target.value === ""
                ? undefined
                : event.target.value as ElementStyle["textAlign"],
            )
          }
          className={fieldClass()}
        >
          <option value="">Theme default</option>
          <option value="left">Left</option>
          <option value="center">Centre</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Maximum Width
        </span>

        <input
          value={style.maxWidth ?? ""}
          onChange={event =>
            onUpdate(
              "maxWidth",
              event.target.value || undefined,
            )
          }
          className={fieldClass()}
          placeholder="720px, 80% or none"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Text Colour
        </span>

        <div className="flex gap-2">
          <input
            type="color"
            value={style.color || "#ffffff"}
            onChange={event =>
              onUpdate("color", event.target.value)
            }
            className="h-10 w-12 rounded-lg border border-border"
          />

          <input
            value={style.color ?? ""}
            onChange={event =>
              onUpdate(
                "color",
                event.target.value || undefined,
              )
            }
            className={fieldClass()}
            placeholder="#ffffff"
          />
        </div>
      </label>

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

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
      >
        Reset {previewMode} element styles
      </button>
    </div>
  );
}
