"use client";
import type { ImgHTMLAttributes } from "react";
import { useContent } from "./ContentProvider";

/** Drop-in replacement for a plain `<img>` that honours dashboard photo replacements (see Image.tsx). */
export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { settings, editing } = useContent();
  const original = typeof props.src === "string" ? props.src : undefined;
  const swapped = original ? settings.images[original] : undefined;
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt ?? ""} src={swapped ?? props.src} data-alf-img={editing ? original : undefined} />;
}
