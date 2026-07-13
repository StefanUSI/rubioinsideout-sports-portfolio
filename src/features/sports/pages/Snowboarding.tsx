/**
 * Snowboarding subpage.
 *
 * Follows the shared sport page architecture: SportPageLayout wraps hero,
 * content sections, equipment, and videos. All colours derived from the
 * snowboarding palette (dark/black theme).
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import SportVideos from "@/features/sports/components/SportVideos";
import sportSkills from "@/features/sports/config/skills";
import SubpageHeroContent from "@/features/sports/components/SubpageHeroContent";
import HeroVideoBackground from "@/features/sports/components/HeroVideoBackground";
import EquipmentSection from "@/features/sports/components/EquipmentSection";
import SkillBox from "@/features/sports/components/SkillBox";
import SportPageLayout from "@/features/sports/components/SportPageLayout";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.snowboarding;

export default function Snowboarding() {
  const isDesktop = useIsDesktop();
  const { t } = useLanguage();
  const snowCount = isDesktop ? 20 : 8;


  return (
    <SportPageLayout palette={p} footerLabel={t("snowboarding.returnLabel")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/snowboarding/hero_snowboarding.mp4"
          imageSrc="/images/hero/snowboarding/hero_snowboard.jpg"
          imageAlt="Snowboarding carving"
          videoClassName="grayscale-[0.2] brightness-90"
          imageClassName="grayscale-[0.2] brightness-90"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />          <div className="pointer-events-none absolute inset-x-0 -bottom-10 h-20 bg-gradient-to-b from-transparent via-black/70 to-black" />        </HeroVideoBackground>

        {/* Snowfall Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(snowCount)].map((_, i) => (
            <div
              key={i}
              className="snow-particle"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: "-10%",
                opacity: Math.random() * 0.5 + 0.3,
                animation: `drift ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Back button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Snow"
          rightTitle="boarding"
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="rhythmic flow—where the mountain becomes your canvas"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-16`}>
          {/* Main Content - Left */}
          <motion.div {...fadeInLeft} className="order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              {t("snowboarding.headingA")} <span style={{ color: p.accent }}>{t("snowboarding.headingB")}</span>
            </h2>

            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("snowboarding.p1")}</p>
              <p>{t("snowboarding.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="order-1 lg:order-2 space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.snowboarding.strength },
                { label: t("skills.endurance"), value: sportSkills.snowboarding.endurance },
                { label: t("skills.technique"), value: sportSkills.snowboarding.technique },
                { label: t("skills.mentalGame"), value: sportSkills.snowboarding.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />
            {/* Image */}
            <div className="aspect-video border border-white/10 bg-white/5 overflow-hidden rounded-2xl">
              <ResponsiveImage src="/images/body/snowboarding/snowboard.jpg" alt="Snowboarding" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("snowboarding.equipmentHeading")} text={t("snowboarding.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Snowboarding" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
