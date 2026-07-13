/**
 * Inline Skating subpage.
 *
 * Unique elements: animated scanline + diagonal streak effects. Covers
 * freeskating, aggressive, and wizard styles. Route alias "freeskating"
 * also resolves here (see registry.ts).
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import SportVideos from "@/features/sports/components/SportVideos";
import sportSkills from "@/features/sports/config/skills";
import SubpageHeroContent from "@/features/sports/components/SubpageHeroContent";
import EquipmentSection from "@/features/sports/components/EquipmentSection";
import SkillBox from "@/features/sports/components/SkillBox";
import SportPageLayout from "@/features/sports/components/SportPageLayout";
import worldmap from "@/assets/worldmap.svg";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.inlineskating;

export default function InlineSkating() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("inlineskating.returnLabel")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero/inlineskating/hero_freeskating.jpg"
            alt="Inline Skating jump"
            sizes="100vw"
            className="w-full h-full object-cover opacity-85"
            fetchPriority="high"
            decoding="async"
          />
          <div className="street-gradient" />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          <div className="anim-scanline absolute inset-x-0 top-0 h-1 bg-white" />
        </div>

        {/* Back button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Inline"
          rightTitle="Skating"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="cruising on the streets, seamlessly blending into traffic"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-16`}>
          <motion.div {...fadeInLeft}>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              {t("inlineskating.headingA")} <span style={{ color: p.accent }}>{t("inlineskating.headingB")}</span>{t("inlineskating.headingC")}
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("inlineskating.p1")}</p>
              <p>{t("inlineskating.p2")}</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInRight}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.inlineskating.strength },
                { label: t("skills.endurance"), value: sportSkills.inlineskating.endurance },
                { label: t("skills.technique"), value: sportSkills.inlineskating.technique },
                { label: t("skills.mentalGame"), value: sportSkills.inlineskating.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl"
            >
              <ResponsiveImage src="/images/body/inlineskating/freeskating.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Inline skating" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={layout.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter italic mb-4">
              {t("inlineskating.mapHeadingA")} <span style={{ color: p.accent }}>{t("inlineskating.mapHeadingB")}</span>
            </h2>
            <p className="text-[#e7e5e4]/40 font-mono text-sm uppercase tracking-widest">
              {t("inlineskating.mapSubHeading")}
            </p>
          </motion.div>

          <div className="relative aspect-[2/1] bg-[#e7e5e4]/5 border border-[#e7e5e4]/10 p-4 md:p-8 rounded-sm overflow-hidden">
            <img
              src={worldmap}
              alt="World map background"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* City Markers */}
            {[
              { name: "Barcelona", x: 506, y: 135 },
              { name: "Berlin", x: 537, y: 104 },
              { name: "Paris", x: 507, y: 114 },
              { name: "London", x: 500, y: 107 },
              { name: "Medellin", x: 290, y: 233 },
              { name: "Quito", x: 282, y: 251 },
              { name: "Buenos Aires", x: 338, y: 346 },
              { name: "Rio de Janeiro", x: 380, y: 314 },
              { name: "Guayaquil", x: 278, y: 256 },
              { name: "Oaxaca", x: 231, y: 203 },
              { name: "Kuala Lumpur", x: 782, y: 241 },
              { name: "Doha", x: 643, y: 180 },
            ].map((city, idx) => (
              <motion.div
                key={city.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + idx * 0.05
                }}
                className="absolute group"
                style={{
                  left: `${(city.x / 1000) * 100}%`,
                  top: `${(city.y / 500) * 100}%`
                }}
              >
                <div className="absolute -inset-2 bg-[#FFBE0B]/20 rounded-full animate-ping group-hover:bg-[#FFBE0B]/40" />
                <div className="relative w-2 h-2 md:w-3 md:h-3 bg-[#FFBE0B] rounded-full border-2 border-[#1c1917] shadow-lg shadow-[#FFBE0B]/20" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1c1917] text-[10px] md:text-xs font-mono uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 border border-[#e7e5e4]/10">
                  {city.name}
                </div>
              </motion.div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-[#e7e5e4]/30 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FFBE0B] rounded-full" />
                <span>{t("inlineskating.mapLegend")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EquipmentSection heading={t("inlineskating.equipmentHeading")} text={t("inlineskating.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Inline Skating" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
