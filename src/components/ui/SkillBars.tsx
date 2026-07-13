/**
 * Animated skill-rating bars displayed on sport subpages.
 *
 * Each skill renders as a horizontal 5-segment bar (1–5 scale). The fill
 * width animates via framer-motion `whileInView` so bars only play when
 * the user scrolls them into sight.
 *
 * Theming is driven by `accentColor` + `isDark` — all track, fill, label,
 * and tick colours are derived at runtime via inline styles. This means
 * changing the accent hex in theme.config.ts propagates here automatically
 * with no Tailwind class-string maintenance.
 */
import { motion } from "motion/react";
import { hexAlpha } from "@/features/sports/config/palettes";

interface Skill {
  label: string;
  value: number;
}

interface SkillBarsProps {
  skills: Skill[];
  accentColor?: string;
  bgColor?: string;
  isDark?: boolean;
}

export default function SkillBars({ skills, accentColor = "#ffffff", bgColor = "#000000", isDark = true }: SkillBarsProps) {
  const labelColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const trackBg = hexAlpha(accentColor, 0.15);
  const tickBorder = hexAlpha(bgColor, 0.6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          viewport={{ once: true }}
        >
          <div className="mb-2">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: labelColor }}>{skill.label}</span>
          </div>
          <div className="h-2 relative overflow-hidden rounded-full" style={{ backgroundColor: trackBg }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(100, (skill.value / 5) * 100)}%` }}
              transition={{ duration: 0.8, delay: i * 0.04 + 0.1 }}
              viewport={{ once: true }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <div className="pointer-events-none absolute inset-0 grid grid-cols-5 z-10">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className={idx < 4 ? "border-r" : ""}
                  style={{ borderColor: tickBorder }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
