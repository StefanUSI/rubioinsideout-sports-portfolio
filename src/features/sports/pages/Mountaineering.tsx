/**
 * Mountaineering subpage.
 *
 * Follows the shared sport page architecture. Uses the dark-slate palette
 * (#0f172a / #8D6E63 earthy accent).
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import SportVideos from "@/features/sports/components/SportVideos";
import sportSkills from "@/features/sports/config/skills";
import SubpageHeroContent from "@/features/sports/components/SubpageHeroContent";
import HeroVideoBackground from "@/features/sports/components/HeroVideoBackground";
import EquipmentSection from "@/features/sports/components/EquipmentSection";
import SkillBox from "@/features/sports/components/SkillBox";
import SportPageLayout from "@/features/sports/components/SportPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.mountaineering;

export default function Mountaineering() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("mountaineering.returnLabel")}>
      {/* Atmospheric Haze elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="haze-cloud"
            style={{
              top: Math.random() * 80 + "%",
              left: Math.random() * 80 + "%",
              width: Math.random() * 500 + 300 + "px",
              height: Math.random() * 300 + 200 + "px",
              animation: `drift-haze ${Math.random() * 15 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/mountaineering/hero_mountaineering.mp4"
          imageSrc="/images/hero/mountaineering/hero_mountaineering.png"
          imageAlt="Mountaineering summit"
        />

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        {/* Back button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Mountain"
          rightTitle="eering"
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="vertical discipline—conquering oneself before the summit"
        />
      </section>

      {/* Resilience Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          {/* Main Content - Left */}
          <motion.div {...fadeInLeft} className="order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              {t("mountaineering.headingA")} <br /> <span style={{ color: p.accent }}>{t("mountaineering.headingB")}</span>
            </h2>
            <div className="space-y-8 text-white/70 text-xl leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("mountaineering.p1")}</p>
              <p>{t("mountaineering.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="order-1 lg:order-2 space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.mountaineering.strength },
                { label: t("skills.endurance"), value: sportSkills.mountaineering.endurance },
                { label: t("skills.technique"), value: sportSkills.mountaineering.technique },
                { label: t("skills.mentalGame"), value: sportSkills.mountaineering.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />
            {/* Image */}
            <div className="aspect-video overflow-hidden transition-all duration-700 rounded-2xl">
              <ResponsiveImage src="/images/body/mountaineering/mountaineering.png" sizes="(min-width: 1024px) 50vw, 100vw" alt="High Alpine" loading="lazy" decoding="async" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("mountaineering.equipmentHeading")} text={t("mountaineering.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Mountaineering" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
