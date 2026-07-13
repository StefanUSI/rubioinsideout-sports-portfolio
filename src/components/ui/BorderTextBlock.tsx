/**
 * Left-bordered text container used for body copy on sport subpages.
 * The accent-coloured left border (via `borderColor` prop) provides a
 * visual tie to the sport’s palette while the light font weight keeps
 * the brutalist reading rhythm.
 */
import type { ReactNode } from "react";

type BorderTextBlockProps = {
  children: ReactNode;
  className?: string;
  colorClass?: string;
  borderColor?: string;
};

export default function BorderTextBlock({
  children,
  className = "",
  colorClass = "text-white/70",
  borderColor,
}: BorderTextBlockProps) {
  return (
    <div
      className={`space-y-6 ${colorClass} text-lg leading-relaxed font-light border-l-2 pl-8 max-w-prose ${className}`.trim()}
      style={borderColor ? { borderColor } : undefined}
    >
      {children}
    </div>
  );
}
