"use client";
import NextImage, { type ImageProps } from "next/image";
import { useContent } from "./ContentProvider";

/**
 * Drop-in replacement for `next/image`: when the dashboard replaced this photo (Settings.images, keyed by the
 * original `src`), renders the replacement; otherwise the original. Layout props are untouched.
 * In edit mode the <img> carries `data-alf-img` (the original src) so ImageOverlays can offer "Ganti foto".
 */
export default function Image(props: ImageProps) {
  const { settings, editing } = useContent();
  const original = typeof props.src === "string" ? props.src : undefined;
  const swapped = original ? settings.images[original] : undefined;
  return <NextImage {...props} src={swapped ?? props.src} data-alf-img={editing ? original : undefined} />;
}
