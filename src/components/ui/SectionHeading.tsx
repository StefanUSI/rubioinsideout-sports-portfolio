/**
 * Standardised section heading rendered in the display font (Anton).
 * Supports h3 (default) and h4 for semantic hierarchy while keeping
 * the visual style consistent across all pages.
 */
import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  level?: 3 | 4;
};

export default function SectionHeading({ children, className = "", level = 3 }: SectionHeadingProps) {
  const Tag = level === 4 ? "h4" : "h3";
  const headingClass = `font-display text-4xl md:text-5xl uppercase tracking-tighter mb-8 ${className}`.trim();
  return <Tag className={headingClass}>{children}</Tag>;
}
