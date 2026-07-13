import {
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { uploadMediaFile } from "../../cms-core/media/media-storage";

interface EditableImageProps {
  src?: string;
  alt?: string;
  editable?: boolean;
  className?: string;
  wrapperClassName?: string;
  loading?: "eager" | "lazy";
  emptyLabel?: string;
  triggerMode?: "overlay" | "corner";
  elementKey?: string;
  elementLabel?: string;
  onEditStart?: () => void;
  onSelectElement?: (
    elementKey: string,
    label: string,
  ) => void;
  onCommit?: (publicUrl: string) => void;
}

export default function EditableImage({
  src = "",
  alt = "",
  editable = false,
  className = "h-full w-full object-cover",
  wrapperClassName = "relative h-full w-full overflow-hidden",
  loading = "lazy",
  emptyLabel = "No image selected",
  triggerMode = "overlay",
  elementKey,
  elementLabel,
  onEditStart,
  onSelectElement,
  onCommit,
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function openPicker(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!editable || uploading) return;

    onEditStart?.();

    if (elementKey) {
      onSelectElement?.(
        elementKey,
        elementLabel || elementKey,
      );
    }

    inputRef.current?.click();
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await uploadMediaFile(
        file,
        "visual-editor",
      );

      onCommit?.(uploaded.publicUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image.",
      );
    } finally {
      setUploading(false);
    }
  }

  if (!editable) {
    return src ? (
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  const isCornerTrigger = triggerMode === "corner";

  return (
    <div
      className={`${wrapperClassName} group/editable-image`}
      data-editable-image="true"
      data-editor-element-key={elementKey}
      data-editor-element-type={
        elementKey ? "image" : undefined
      }
      data-editor-element-label={
        elementKey
          ? elementLabel || elementKey
          : undefined
      }
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={className}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
          {emptyLabel}
        </div>
      )}

      <button
        type="button"
        onClick={openPicker}
        disabled={uploading}
        aria-label={src ? "Replace image" : "Select image"}
        className={
          isCornerTrigger
            ? "absolute right-4 top-4 z-40 rounded-full bg-black/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
            : "absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-black/0 transition group-hover/editable-image:bg-black/40 focus:bg-black/40 focus:outline-none disabled:cursor-wait"
        }
      >
        {isCornerTrigger ? (
          uploading
            ? "Uploading..."
            : src
              ? "Replace Image"
              : "Select Image"
        ) : (
          <span className="rounded-full bg-black/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow transition group-hover/editable-image:opacity-100 group-focus-within/editable-image:opacity-100">
            {uploading
              ? "Uploading..."
              : src
                ? "Replace Image"
                : "Select Image"}
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <div className="absolute bottom-3 left-3 right-3 z-50 rounded-lg bg-red-600 px-3 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
    </div>
  );
}
