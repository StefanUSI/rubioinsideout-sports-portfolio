/**
 * Three-phase hero background: video → cross-fade → static image.
 *
 * Phase state machine:
 *  1. **video**  — autoplay muted clip fills the viewport.
 *  2. **fading** — video opacity fades to 0 over 1 s while the image
 *     fades in underneath (both elements co-exist during this phase).
 *  3. **image**  — video element unmounts; static image remains.
 *
 * Users can click the video to skip straight to the image phase.
 * This pattern ensures a fast LCP (the image has `fetchPriority="high"`)
 * while still delivering the engaging video-first experience on sport
 * subpages.
 *
 * The children slot is wrapped in `pointer-events-none` so gradient
 * overlays rendered as children don’t steal click events from the video.
 */
import { useState, type ReactNode } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

interface HeroVideoBackgroundProps {
  videoSrc: string;
  /** Optional WebM encode of the same clip — listed first so supporting browsers pick the smaller file. */
  videoWebmSrc?: string;
  imageSrc: string;
  imageAlt: string;
  /** Extra classes on the <img> (e.g. "grayscale"). Defaults to no extra styles. */
  imageClassName?: string;
  /** Extra classes on the <video> (e.g. "grayscale-[.2]"). */
  videoClassName?: string;
  /** Extra classes on the root wrapper (e.g. "z-0"). */
  className?: string;
  /** Overlay gradients or other elements rendered after the video/image. */
  children?: ReactNode;
}

export default function HeroVideoBackground({
  videoSrc,
  videoWebmSrc,
  imageSrc,
  imageAlt,
  imageClassName = "",
  videoClassName = "",
  className = "",
  children,
}: HeroVideoBackgroundProps) {
  const [phase, setPhase] = useState<"video" | "fading" | "image">("video");

  const handleVideoEnd = () => {
    setPhase("fading");
    setTimeout(() => setPhase("image"), 1000);
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {phase !== "image" && (
        <video
          poster={imageSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onClick={handleVideoEnd}
          className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-1000 ${phase === "fading" ? "opacity-0" : "opacity-100"} ${videoClassName}`}
        >
          {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {phase !== "video" && (
        <ResponsiveImage
          src={imageSrc}
          alt={imageAlt}
          sizes="100vw"
          className={`absolute inset-0 w-full h-full object-cover ${imageClassName}`}
          fetchPriority="high"
          decoding="async"
        />
      )}
      {children && (
        <div className="pointer-events-none">{children}</div>
      )}
    </div>
  );
}
