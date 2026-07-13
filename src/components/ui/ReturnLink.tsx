/**
 * Large typographic link ("Return to [Sport]") rendered at the bottom of
 * every sport subpage. Uses the text-outline CSS utility to knock out the
 * sport name, creating a brutalist stencil effect. `hoverColor` is passed
 * as a CSS custom property so Tailwind doesn’t need to know every sport’s
 * accent colour at compile time.
 */
import React from "react";
import { Link } from "react-router-dom";

interface ReturnLinkProps {
  to?: string;
  label: string;
  outlineColor?: string;
  hoverColor?: string;
  isDark?: boolean;
  className?: string;
}

export default function ReturnLink({
  to = "/#sports",
  label,
  outlineColor = "white",
  hoverColor,
  isDark = true,
  className,
}: ReturnLinkProps) {
  const resolvedClassName = className ?? `font-display text-[7vw] md:text-[4.2vw] uppercase tracking-tighter ${isDark ? 'text-white/30' : 'text-black/30'} hover:text-[var(--hover-accent)] transition-colors`;

  return (
    <Link
      to={to}
      className={resolvedClassName}
      style={hoverColor ? { '--hover-accent': hoverColor } as React.CSSProperties : undefined}
    >
      Return to <span className="text-outline" style={{ WebkitTextStroke: `1px ${outlineColor}` }}>{label}</span>
    </Link>
  );
}
