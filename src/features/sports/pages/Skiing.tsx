/**
 * Skiing subpage.
 *
 * Unique elements: falling snowflake particles + horizontal wind-streak
 * lines (CSS keyframes in HeroMotion.css). Particle counts scale with
 * viewport width (useIsDesktop) to keep mobile frame rates smooth.
 *
 * Layout: SportPageLayout → hero (video+image) → 2-col story + skills →
 * equipment section → sport videos.
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
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.skiing;

export default function Skiing() {
  const isDesktop = useIsDesktop();
  const { t } = useLanguage();
  const snowCount = isDesktop ? 40 : 12;
  const windCount = isDesktop ? 15 : 5;


  return (
    <SportPageLayout palette={p} footerLabel={t("skiing.returnLabel")}>
      {/* Snowfall Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(snowCount)].map((_, i) => (
          <div
            key={i}
            className="anim-snow absolute bg-white rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Wind streak particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(windCount)].map((_, i) => (
          <div
            key={i}
            className="wind-line"
            style={{
              top: Math.random() * 100 + "%",
              width: Math.random() * 300 + 100 + "px",
              animation: `wind-streak ${Math.random() * 2 + 1}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/skiing/hero_skiing.mp4"
          imageSrc="/images/hero/skiing/hero_skiing.jpg"
          imageAlt="Skiing descent"
        />

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        {/* Back button */}
        <BackButton hoverColor={p.accent} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Alpine"
          rightTitle="Skiing"
          leftTitleStyle={{ color: '#ffffff' }}
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          textToneClass="text-black/60"
          taglineToneClass={p.taglineColor}
          dividerColor={hexAlpha(p.accent, 0.3)}
          tagline="carving peaks and painting snow in motion"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          {/* Main Content - Left */}
          <motion.div {...fadeInLeft} className="order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              {t("skiing.headingA")} <br /> <span style={{ color: p.accent }}>{t("skiing.headingB")}</span>
            </h2>
            <div className="space-y-8 text-black/70 text-lg leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("skiing.p1")}</p>
              <p>{t("skiing.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="order-1 lg:order-2 space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.skiing.strength },
                { label: t("skills.endurance"), value: sportSkills.skiing.endurance },
                { label: t("skills.technique"), value: sportSkills.skiing.technique },
                { label: t("skills.mentalGame"), value: sportSkills.skiing.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />
            {/* Image */}
            <div className="h-[20rem] md:h-[26rem] lg:h-[30rem] overflow-hidden transition-all duration-700 rounded-2xl">
              <ResponsiveImage src="/images/body/skiing/skiing.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Skiing" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("skiing.equipmentHeading")} text={t("skiing.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Skiing" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
