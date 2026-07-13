/**
 * Page-level layout wrapper for all 13 sport subpages.
 *
 * Responsibilities:
 *  - Applies the sport’s palette (bg + text colour) to the root container
 *    via inline styles, avoiding Tailwind safelist inflation.
 *  - Imports HeroMotion.css once so all sport-specific CSS keyframe
 *    animations (snow, wind, bubbles, etc.) are available.
 *  - Optionally renders the SubpageFooter with palette-matched colours.
 *
 * Every sport page just wraps its bespoke content inside this component,
 * keeping layout concerns separated from sport-specific storytelling.
 */
import type { ReactNode } from "react";
import SubpageFooter from "@/features/sports/components/SubpageFooter";
import type { SportPalette } from "@/features/sports/config/palettes";
import "@/features/sports/components/HeroMotion.css";

interface SportPageLayoutProps {
  palette: SportPalette;
  /** Translation string for the return-link label. Omit to skip the default footer. */
  footerLabel?: string;
  children: ReactNode;
}

export default function SportPageLayout({ palette: p, footerLabel, children }: SportPageLayoutProps) {
  return (
    <div
      className="min-h-screen overflow-hidden font-sans sport-page"
      style={{ backgroundColor: p.bg, color: p.text }}
    >
      {children}

      {footerLabel && (
        <SubpageFooter
          label={footerLabel}
          outlineColor={p.isDark ? "white" : "black"}
          hoverColor={p.accent}
          isDark={p.isDark}
        />
      )}
    </div>
  );
}
