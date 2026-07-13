/**
 * Styled container for SkillBars on sport subpages.
 *
 * Wraps the generic SkillBars component in a rounded card whose border
 * and background colours derive from the sport's accent via `hexAlpha`.
 * This keeps the visual weight consistent across dark and light palettes
 * without hard-coding opacity per sport.
 */
import SkillBars from "@/components/ui/SkillBars";
import { hexAlpha } from "@/features/sports/config/palettes";

interface SkillBoxProps {
  skills: Array<{ label: string; value: number }>;
  accentColor: string;
  bgColor?: string;
  isDark?: boolean;
  className?: string;
}

export default function SkillBox({ skills, accentColor, bgColor = "#000000", isDark = true, className }: SkillBoxProps) {
  return (
    <div
      className={`p-8 border rounded-2xl ${className ?? ""}`}
      style={{
        borderColor: hexAlpha(accentColor, 0.2),
        backgroundColor: hexAlpha(accentColor, 0.05),
      }}
    >
      <SkillBars skills={skills} accentColor={accentColor} bgColor={bgColor} isDark={isDark} />
    </div>
  );
}
