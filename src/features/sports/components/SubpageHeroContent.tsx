/**
 * Hero text overlay for sport subpages.
 *
 * Layout: split title (left/right slide-in), "The art of" label, gradient
 * divider, and a staggered tagline. Each element animates independently
 * via framer-motion to create a cinematic reveal sequence that plays over
 * the HeroVideoBackground.
 *
 * The split-title pattern allows per-half styling (e.g. the second half
 * in the sport’s accent colour) while remaining a single `<h1>` for SEO.
 *
 * Colour customisation is intentionally via inline styles + class props
 * rather than Tailwind variants because the values come from sportPalettes
 * at runtime.
 */
import { motion } from "motion/react";
import type { CSSProperties } from "react";

type SubpageHeroContentProps = {
  leftTitle: string;
  leftTitleClassName?: string;
  leftTitleStyle?: CSSProperties;
  rightTitle: string;
  rightTitleClassName?: string;
  rightTitleStyle?: CSSProperties;
  artOfColor: string;
  tagline: string;
  textToneClass?: string;
  taglineToneClass?: string;
  dividerViaClass?: string;
  dividerColor?: string;
};

export default function SubpageHeroContent({
  leftTitle,
  leftTitleClassName,
  leftTitleStyle,
  rightTitle,
  rightTitleClassName,
  rightTitleStyle,
  artOfColor,
  tagline,
  textToneClass = "text-white/50",
  taglineToneClass,
  dividerViaClass = "via-white/30",
  dividerColor,
}: SubpageHeroContentProps) {
  const leftClassName = ["inline-block", leftTitleClassName].filter(Boolean).join(" ");
  const rightClassName = ["inline-block", rightTitleClassName].filter(Boolean).join(" ");
  const taglineClass = taglineToneClass ?? textToneClass;

  return (
    <div className="relative z-10 text-center px-6 mx-auto w-full">
      <motion.h1 className="sport-hero-title text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tight whitespace-nowrap">
        <motion.span
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={leftClassName}
          style={leftTitleStyle}
        >
          {leftTitle}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={rightClassName}
          style={rightTitleStyle ?? { color: "#ffffff" }}
        >
          {rightTitle}
        </motion.span>
      </motion.h1>

      <p className={`mt-6 text-lg md:text-xl font-mono uppercase italic font-bold tracking-[0.5em] max-w-xl mx-auto ${textToneClass}`}>
        <span style={{ color: artOfColor }}>The art of</span>
      </p>

      {dividerColor ? (
        <div className="my-4 h-px" style={{ background: `linear-gradient(to right, transparent, ${dividerColor}, transparent)` }} />
      ) : (
        <div className={`my-4 h-px bg-gradient-to-r from-transparent ${dividerViaClass} to-transparent`} />
      )}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className={`mt-4 text-lg md:text-xl font-mono uppercase italic font-bold tracking-[0.5em] max-w-xl mx-auto ${taglineClass}`}
      >
        {tagline}
      </motion.p>
    </div>
  );
}
