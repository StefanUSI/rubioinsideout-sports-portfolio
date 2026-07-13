/**
 * Reusable equipment/gear section shared across sport subpages.
 *
 * Combines a SectionHeading with a bordered paragraph (à la
 * BorderTextBlock) and a fadeInUp scroll animation. The accent colour
 * drives the left-border highlight via `hexAlpha` at 30 % opacity so
 * the border feels integrated with the palette without being too bold.
 */
import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { hexAlpha } from "@/features/sports/config/palettes";
import { fadeInUp } from "@/features/sports/config/motionPresets";
import type { CSSProperties } from "react";
import { layout } from "@/config/theme.config";

interface EquipmentSectionProps {
  heading: string;
  text: string;
  accentColor: string;
  isDark?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function EquipmentSection({
  heading,
  text,
  accentColor,
  isDark = true,
  className,
  style,
}: EquipmentSectionProps) {
  const textColor = isDark ? "text-white/70" : "text-black/70";

  return (
    <section
      className={`relative ${layout.sectionPadding} overflow-hidden ${className ?? ""}`}
      style={style}
    >
      <motion.div {...fadeInUp} className={layout.container}>
        <SectionHeading>{heading}</SectionHeading>
        <p
          className={`${textColor} text-lg leading-relaxed font-light border-l-2 pl-8`}
          style={{ borderColor: hexAlpha(accentColor, 0.3) }}
        >
          {text}
        </p>
      </motion.div>
    </section>
  );
}
