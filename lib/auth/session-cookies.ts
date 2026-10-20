/** Cookie names shared by server auth and client UI (no crypto imports, safe for client bundles). */
export const SESSION_COOKIE = "alf_session";
/** Non-secret hint cookie readable by client JS so the site can show the edit toolbar. Never trusted for auth. */
export const ADMIN_HINT_COOKIE = "alf_admin";
