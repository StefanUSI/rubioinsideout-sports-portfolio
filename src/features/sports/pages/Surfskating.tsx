/**
 * Surfskating subpage.
 *
 * Follows the shared sport page architecture. Uses the warm-cream palette
 * (#f6f0e8 / #516c7a accent, light theme).
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

const p = sportPalettes.surfskating;

export default function Surfskating() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("surfskating.returnLabel")}>
      {/* Ambient Sun Glow */}
      <div className="fixed -top-24 -right-24 h-[60vw] w-[60vw] rounded-full bg-[#3E5463]/12 blur-[120px] anim-sun pointer-events-none z-0" />
      <div className="fixed -bottom-40 -left-40 h-[50vw] w-[50vw] rounded-full bg-[#3E5463]/8 blur-[110px] anim-sun pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/surfskating/hero_surfskating.mp4"
          imageSrc="/images/hero/surfskating/hero_surfskating.jpg"
          imageAlt="Surfskating carve"
        />

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        {/* Subtle road lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
          <div className="anim-flow absolute left-[8%] top-[30%] h-px w-[28vw] bg-gradient-to-r from-transparent via-[#3E5463]/20 to-transparent rotate-[8deg]" />
          <div className="anim-flow absolute right-[10%] top-[58%] h-px w-[24vw] bg-gradient-to-r from-transparent via-[#3E5463]/20 to-transparent -rotate-[10deg]" style={{ animationDelay: "-2s" }} />
          <div className="anim-flow absolute left-[22%] bottom-[20%] h-px w-[18vw] bg-gradient-to-r from-transparent via-[#3E5463]/15 to-transparent rotate-[4deg]" style={{ animationDelay: "-1s" }} />
        </div>

        {/* Back button */}
        <BackButton hoverColor={p.accent} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Surf"
          rightTitle="skating"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          textToneClass="text-black/60"
          taglineToneClass={p.taglineColor}
          dividerColor={hexAlpha(p.accent, 0.3)}
          tagline="flowing lines where pavement answers back"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div {...fadeInLeft} className="space-y-10">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              {t("surfskating.headingA")} <br /> <span style={{ color: p.accent }}>{t("surfskating.headingB")}</span>
            </h2>
            <div className="space-y-6 text-xl text-black/70 leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("surfskating.p1")}</p>
              <p>{t("surfskating.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.surfskating.strength },
                { label: t("skills.endurance"), value: sportSkills.surfskating.endurance },
                { label: t("skills.technique"), value: sportSkills.surfskating.technique },
                { label: t("skills.mentalGame"), value: sportSkills.surfskating.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            <div className="relative overflow-hidden rounded-xl">
              <ResponsiveImage
                src="/images/body/surfskating/surfskating.jpg"
                alt="Surfskating line"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("surfskating.equipmentHeading")} text={t("surfskating.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Surfskating" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
