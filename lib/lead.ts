/** Fire-and-forget: records a form submission via /api/lead. Never throws, never blocks the UI. */
export function sendLead(source: string, fields: Record<string, string>): void {
  try {
    const payload = JSON.stringify({ source, fields });
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon("/api/lead", new Blob([payload], { type: "application/json" }))) return;
    }
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}
