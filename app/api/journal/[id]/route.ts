import { servePdf } from "@/lib/content/journals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public PDF of a published journal. `?download=1` forces a download instead of opening in the browser. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return servePdf(req, (await params).id, { publishedOnly: true });
}
