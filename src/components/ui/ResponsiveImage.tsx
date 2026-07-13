/**
 * Responsive `<picture>` element with automatic WebP srcset generation.
 *
 * Works in tandem with `scripts/optimize-images.js`, which pre-generates
 * resized WebP variants at the WIDTHS below for every JPEG/PNG under
 * public/images/ during the build (`basename-480w.webp`, …). The browser
 * picks the smallest variant that satisfies the current viewport + device
 * pixel ratio, dramatically reducing bandwidth on the image-heavy pages.
 *
 * Pass an accurate `sizes` hint whenever the rendered width is known
 * (e.g. "192px" for fixed thumbnails, "33vw" for a 3-column grid) so the
 * browser can pick the smallest sufficient variant.
 *
 * Falls back to the original file format for browsers without WebP.
 */
import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "sizes"> & {
  /** Original image path, e.g. "/images/skiing/skiing.jpg" */
  src: string;
  /**
   * Explicit `sizes` hint for the browser. Defaults to a sensible responsive
   * value if omitted.
   */
  sizes?: string;
};

// Must match the WIDTHS array in scripts/optimize-images.js
const WIDTHS = [480, 1200, 2000];

export default function ResponsiveImage({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw",
  ...rest
}: ResponsiveImageProps) {
  const base = src.replace(/\.[^.]+$/, "");

  // srcset splits candidates on whitespace, so paths containing spaces
  // (e.g. gallery folders like "Switzerland up to 2025") must be encoded.
  const webpSrcSet = WIDTHS
    .map((w) => `${encodeURI(`${base}-${w}w.webp`)} ${w}w`)
    .join(", ");

  return (
    <picture>
      <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
}
