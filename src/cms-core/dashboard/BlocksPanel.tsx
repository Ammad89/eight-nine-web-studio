import type { CmsBlock, CmsBlockType } from "../types";
import { cmsBlockLibrary } from "../block-library";

interface BlocksPanelProps {
  blocks: CmsBlock[];
  allowedBlocks?: CmsBlockType[];
  selectedBlockId?: string | null;
  onSelect?: (blockId: string) => void;
  onDelete?: (blockId: string) => void;
  onAddBlock?: (type: CmsBlockType) => void;
}

export default function BlocksPanel({
  blocks,
  allowedBlocks = [],
  selectedBlockId,
  onSelect,
  onDelete,
  onAddBlock,
}: BlocksPanelProps) {
  const addableBlocks = cmsBlockLibrary.filter((block) =>
    allowedBlocks.includes(block.type),
  );

  return (
    <div className="p-4 border-b border-border">
      <div className="mb-4">
        <h3 className="font-semibold">Blocks</h3>
        <p className="text-xs opacity-70 mt-1">
          Add, select or remove page sections.
        </p>
      </div>

      <label className="block mb-4">
        <span className="block text-xs font-medium mb-2 opacity-70">
          Add block
        </span>

        <select
          value=""
          onChange={(event) => {
            const value = event.target.value as CmsBlockType;
            if (value) onAddBlock?.(value);
          }}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Choose block type</option>

          {addableBlocks.map((block) => (
            <option key={block.type} value={block.type}>
              {block.label}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-2">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`rounded-lg border p-3 ${
              selectedBlockId === block.id
                ? "border-foreground"
                : "border-border"
            }`}
          >
            <button
              type="button"
              className="w-full text-left"
              onClick={() => onSelect?.(block.id)}
            >
              <div className="font-medium">{block.label}</div>

              <div className="text-xs opacity-70">{block.type}</div>
            </button>

            <button
              type="button"
              className="mt-2 text-xs text-red-500"
              onClick={() => onDelete?.(block.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
