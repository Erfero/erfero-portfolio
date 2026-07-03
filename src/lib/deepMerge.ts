type AnyRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is AnyRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Fusionne `override` par-dessus `base`. Les tableaux sont remplacés tels quels
 * (pas fusionnés élément par élément) pour rester prévisible depuis l'admin. */
export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }

  const result: AnyRecord = { ...base };
  for (const key of Object.keys(override)) {
    const overrideValue = override[key];
    const baseValue = (base as AnyRecord)[key];
    result[key] =
      isPlainObject(baseValue) && isPlainObject(overrideValue)
        ? deepMerge(baseValue, overrideValue)
        : overrideValue;
  }
  return result as T;
}
