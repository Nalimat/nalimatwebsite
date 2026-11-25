/**
 * Placeholder convention: text wrapped in [square brackets] marks company
 * information that has not been confirmed yet. Anything containing a
 * placeholder is treated as unpublished and never rendered on the website.
 * `npm run check:placeholders` lists what still needs confirming, and the
 * post-build check fails the build if a placeholder reaches a page.
 */
const PLACEHOLDER = /\[[^\][]+\]/;

/** True if the value (or any string nested inside it) contains a placeholder. */
export function hasPlaceholder(value: unknown): boolean {
  if (typeof value === "string") return PLACEHOLDER.test(value);
  if (Array.isArray(value)) return value.some(hasPlaceholder);
  if (value && typeof value === "object") return Object.values(value).some(hasPlaceholder);
  return false;
}

/** Keeps only entries whose content is fully confirmed. */
export function confirmed<T>(items: readonly T[]): T[] {
  return items.filter((item) => !hasPlaceholder(item));
}

/** Returns the value only if it is confirmed, otherwise null. */
export function confirmedValue<T>(value: T): T | null {
  return hasPlaceholder(value) ? null : value;
}
