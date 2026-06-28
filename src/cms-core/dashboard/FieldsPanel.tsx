import { cmsBlockLibrary } from "../block-library";
import type { CmsBlock } from "../types";

interface FieldsPanelProps {
  block?: CmsBlock;
  onChangeField?: (fieldId: string, value: unknown) => void;
}

function getFieldValue(block: CmsBlock, fieldId: string) {
  const value = block.fields[fieldId];

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return "";
}

export default function FieldsPanel({
  block,
  onChangeField,
}: FieldsPanelProps) {
  if (!block) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          Select a block
        </h2>
        <p className="text-sm opacity-70">
          Choose a page and block to start editing.
        </p>
      </div>
    );
  }

  const definition = cmsBlockLibrary.find(
    (item) => item.type === block.type,
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.18em] opacity-60 mb-2">
          Block Editor
        </p>

        <h2 className="text-2xl font-semibold">
          {block.label}
        </h2>

        {definition?.description && (
          <p className="text-sm opacity-70 mt-2">
            {definition.description}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {(definition?.fields || []).map((field) => {
          const value = getFieldValue(block, field.id);

          if (field.type === "textarea" || field.type === "richText") {
            return (
              <label key={field.id} className="block">
                <span className="block text-sm font-medium mb-2">
                  {field.label}
                </span>

                <textarea
                  value={String(value)}
                  onChange={(event) =>
                    onChangeField?.(field.id, event.target.value)
                  }
                  className="w-full min-h-28 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />

                {field.helpText && (
                  <span className="block text-xs opacity-60 mt-1">
                    {field.helpText}
                  </span>
                )}
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <label key={field.id} className="block">
                <span className="block text-sm font-medium mb-2">
                  {field.label}
                </span>

                <select
                  value={String(value)}
                  onChange={(event) =>
                    onChangeField?.(field.id, event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">
                    Select
                  </option>

                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (field.type === "color") {
            return (
              <label key={field.id} className="block">
                <span className="block text-sm font-medium mb-2">
                  {field.label}
                </span>

                <div className="flex gap-3">
                  <input
                    type="color"
                    value={String(value || "#000000")}
                    onChange={(event) =>
                      onChangeField?.(field.id, event.target.value)
                    }
                    className="h-10 w-14 rounded border border-border"
                  />

                  <input
                    value={String(value)}
                    onChange={(event) =>
                      onChangeField?.(field.id, event.target.value)
                    }
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </label>
            );
          }

          if (field.type === "number") {
            return (
              <label key={field.id} className="block">
                <span className="block text-sm font-medium mb-2">
                  {field.label}
                </span>

                <input
                  type="number"
                  value={String(value)}
                  onChange={(event) =>
                    onChangeField?.(field.id, Number(event.target.value))
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </label>
            );
          }

          if (field.type === "boolean") {
            return (
              <label key={field.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(block.fields[field.id])}
                  onChange={(event) =>
                    onChangeField?.(field.id, event.target.checked)
                  }
                />

                <span className="text-sm font-medium">
                  {field.label}
                </span>
              </label>
            );
          }

          return (
            <label key={field.id} className="block">
              <span className="block text-sm font-medium mb-2">
                {field.label}
              </span>

              <input
                value={String(value)}
                onChange={(event) =>
                  onChangeField?.(field.id, event.target.value)
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />

              {field.type === "image" && (
                <span className="block text-xs opacity-60 mt-1">
                  Paste image URL for now. Media picker comes next.
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
