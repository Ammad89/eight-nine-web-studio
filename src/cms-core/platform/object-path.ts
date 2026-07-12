export function setValueAtPath<T>(
  source: T,
  path: string,
  value: unknown,
): T {
  const parts = path
    .split(".")
    .map(part => part.trim())
    .filter(Boolean);

  if (!parts.length) return source;

  const root = Array.isArray(source)
    ? [...source]
    : { ...(source as Record<string, unknown>) };

  let cursor = root as Record<string, unknown>;

  parts.forEach((part, index) => {
    const isLast = index === parts.length - 1;

    if (isLast) {
      cursor[part] = value;
      return;
    }

    const nextValue = cursor[part];

    if (Array.isArray(nextValue)) {
      cursor[part] = [...nextValue];
    } else if (nextValue && typeof nextValue === "object") {
      cursor[part] = {
        ...(nextValue as Record<string, unknown>),
      };
    } else {
      const nextPart = parts[index + 1];
      cursor[part] = /^\d+$/.test(nextPart) ? [] : {};
    }

    cursor = cursor[part] as Record<string, unknown>;
  });

  return root as T;
}
