import { db } from "@/lib/db";

export const runtime = "nodejs";

/** Public image/PDF bytes for uploads made in the dashboard. Ids are immutable, so responses cache forever. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = /^[a-z0-9]{10,40}$/i.test(id) ? await db.media.findUnique({ where: { id }, select: { name: true, mime: true, data: true } }) : null;
  if (!media) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  const download = new URL(req.url).searchParams.get("download") === "1";
  const isPdf = media.mime === "application/pdf";
  const safeName = (media.name || (isPdf ? "brosur.pdf" : "gambar")).replace(/[^\x20-\x7e]+/g, "_").replace(/["\\]/g, "_");
  const headers: Record<string, string> = {
    "Content-Type": media.mime,
    "Content-Length": String(media.data.byteLength),
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  };
  if (download || isPdf) {
    headers["Content-Disposition"] = `${download ? "attachment" : "inline"}; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(media.name || safeName)}`;
  }
  if (!isPdf) {
    headers["Content-Security-Policy"] = "default-src 'none'";
  }
  return new Response(media.data, { headers });
}
