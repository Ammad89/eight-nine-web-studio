import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

interface EditableTextProps {
  as: "span" | "p" | "h1" | "h2" | "h3";
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  className?: string;
  style?: CSSProperties;
  onEditStart?: () => void;
  onCommit?: (value: string) => void;
}

export default function EditableText({
  as,
  value = "",
  editable = false,
  multiline = false,
  className = "",
  style,
  onEditStart,
  onCommit,
}: EditableTextProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const initialValueRef = useRef(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || document.activeElement === element) return;

    if (element.innerText !== value) {
      element.innerText = value;
    }

    initialValueRef.current = value;
  }, [value]);

  function commitValue() {
    const element = elementRef.current;
    if (!element) return;

    const nextValue = element.innerText
      .replace(/\u00a0/g, " ")
      .replace(/\r/g, "")
      .trim();

    if (nextValue !== initialValueRef.current) {
      onCommit?.(nextValue);
      initialValueRef.current = nextValue;
    }

    setIsFocused(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    event.stopPropagation();

    if (event.key === "Escape") {
      event.preventDefault();

      if (elementRef.current) {
        elementRef.current.innerText = initialValueRef.current;
        elementRef.current.blur();
      }

      return;
    }

    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      elementRef.current?.blur();
    }
  }

  const editableElement = createElement(
    as,
    {
      ref: elementRef,
      contentEditable: editable,
      suppressContentEditableWarning: true,
      spellCheck: editable,
      className: `${className} ${
        editable
          ? "relative z-10 cursor-text rounded-sm outline-none transition-shadow hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          : ""
      }`,
      style,
      onFocus: () => {
        initialValueRef.current =
          elementRef.current?.innerText || value;

        setIsFocused(true);
        onEditStart?.();
      },
      onBlur: commitValue,
      onKeyDown: handleKeyDown,
      onClick: editable
        ? (event: ReactMouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }
        : undefined,
      "data-inline-editable": editable ? "true" : undefined,
    },
    value,
  );

  if (!editable) return editableElement;

  return (
    <span className="group/editable relative block">
      {editableElement}

      <span
        className={`pointer-events-none absolute -right-2 -top-3 z-30 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] shadow transition ${
          isFocused
            ? "bg-blue-600 text-white opacity-100"
            : "bg-black/80 text-white opacity-0 group-hover/editable:opacity-100"
        }`}
      >
        {isFocused ? "Editing" : "Edit"}
      </span>
    </span>
  );
}
