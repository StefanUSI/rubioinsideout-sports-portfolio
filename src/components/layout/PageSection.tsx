/**
 * Reusable full-width section wrapper with consistent vertical padding and
 * an optional inner container. Used on non-sport feature pages (Services,
 * Handstands) where the standard section rhythm should match the home page
 * but the content might need edge-to-edge backgrounds.
 *
 * Set `useContainer={false}` for full-bleed sections (e.g. hero images).
 */
import type { ReactNode } from "react";
import { layout } from "@/config/theme.config";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  useContainer?: boolean;
};

export default function PageSection({
  children,
  className = "",
  useContainer = true,
}: PageSectionProps) {
  const rootClass = `relative ${layout.sectionPadding} overflow-hidden ${className}`.trim();
  const containerClass = layout.container;

  if (useContainer) {
    return (
      <section className={rootClass}>
        <div className={containerClass}>{children}</div>
      </section>
    );
  }

  return <section className={rootClass}>{children}</section>;
}
