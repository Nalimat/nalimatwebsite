/** Formats an ISO date (YYYY-MM-DD) as e.g. "1 December 2026", independent of server locale. */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
