/**
 * Fixed-position back-to-home link shown on sport subpages in place of the
 * global Navbar. Positioned top-left at z-60 so it floats above hero video
 * and particle overlays.
 *
 * `hoverColor` is injected via a CSS custom property (`--hover-accent`) so
 * the hover state matches each sport’s palette accent without generating
 * per-sport Tailwind classes at build time.
 */
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BackButtonProps {
  to?: string;
  hoverColor?: string;
  isDark?: boolean;
}

export default function BackButton({ to = "/#sports", hoverColor = "#E63946", isDark = false }: BackButtonProps) {
  const { t } = useLanguage();
  
  return (
    <Link
      to={to}
      className={`fixed top-8 left-8 z-[60] flex items-center gap-2 transition-colors font-mono text-sm uppercase tracking-[0.2em] group ${
        isDark ? "text-white/40" : "text-black/40"
      }`}
      style={{ '--hover-accent': hoverColor } as React.CSSProperties}
    >
      <ArrowLeft size={18} className="transition-colors group-hover:text-[var(--hover-accent)]" />
      <span className="transition-colors group-hover:text-[var(--hover-accent)] font-bold">{t("back")}</span>
    </Link>
  );
}
