import { SiteLink } from "@/components/SiteTransition";
import type { NewsItem } from "@/content/settings";

/**
 * Wrapper for a news card: links to the internal full article page `/berita/<slug>` when `item.slug` is present,
 * otherwise falls back to `fallbackHref`.
 */
export function NewsLink({ item, fallbackHref, className, children }: {
  item: NewsItem;
  fallbackHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  const href = item.slug ? `/berita/${item.slug}` : fallbackHref;
  return <SiteLink href={href} className={className}>{children}</SiteLink>;
}
