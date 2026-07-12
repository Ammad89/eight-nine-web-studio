import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
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
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
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

  return createElement(
    as,
    {
      ref: elementRef,
      contentEditable: editable,
      suppressContentEditableWarning: true,
      spellCheck: editable,
      className: `${className} ${
        editable
          ? "cursor-text rounded-sm outline-none transition-shadow hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          : ""
      }`,
      style,
      onFocus: () => {
        initialValueRef.current =
          elementRef.current?.innerText || value;

        onEditStart?.();
      },
      onBlur: commitValue,
      onKeyDown: handleKeyDown,
      onClick: editable
        ? (event: MouseEvent) => event.stopPropagation()
        : undefined,
      "data-inline-editable": editable ? "true" : undefined,
    },
    value,
  );
}
