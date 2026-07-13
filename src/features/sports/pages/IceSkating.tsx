/**
 * Ice Skating subpage.
 *
 * Follows the shared sport page architecture. Uses the steel-blue palette
 * (#778CA1 / #90DBF4 accent).
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import SportVideos from "@/features/sports/components/SportVideos";
import sportSkills from "@/features/sports/config/skills";
import SubpageHeroContent from "@/features/sports/components/SubpageHeroContent";
import HeroVideoBackground from "@/features/sports/components/HeroVideoBackground";
import PageSection from "@/components/layout/PageSection";
import BorderTextBlock from "@/components/ui/BorderTextBlock";
import EquipmentSection from "@/features/sports/components/EquipmentSection";
import SkillBox from "@/features/sports/components/SkillBox";
import SportPageLayout from "@/features/sports/components/SportPageLayout";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.iceskating;

export default function IceSkating() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("iceskating.returnLabel")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background video / image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/iceskating/hero_iceskating.mp4"
          imageSrc="/images/hero/iceskating/hero_iceskating.jpg"
          imageAlt="Ice Skating glide"
        />

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        {/* Back Button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero Content */}
        <SubpageHeroContent
          leftTitle="Ice"
          rightTitle="Skating"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="floating on razor's edge—where physics becomes poetry"
        />
      </section>

      {/* Content Section */}
      <PageSection useContainer={false}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div {...fadeInLeft} className="space-y-10">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4 italic">
              {t("iceskating.headingA")} <span style={{ color: p.accent }}>{t("iceskating.headingB")}</span>{t("iceskating.headingC")}
            </h2>
            <BorderTextBlock colorClass="text-white/70" borderColor={hexAlpha(p.accent, 0.3)}>
              <p>{t("iceskating.p1")}</p>
              <p>{t("iceskating.p2")}</p>
            </BorderTextBlock>
          </motion.div>

          <motion.div {...fadeInRight} className="space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.iceskating.strength },
                { label: t("skills.endurance"), value: sportSkills.iceskating.endurance },
                { label: t("skills.technique"), value: sportSkills.iceskating.technique },
                { label: t("skills.mentalGame"), value: sportSkills.iceskating.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            <div className="relative overflow-hidden rounded-xl">
              <ResponsiveImage src="/images/body/iceskating/iceskating.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Edge Work" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </PageSection>

      <EquipmentSection heading={t("iceskating.equipmentHeading")} text={t("iceskating.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Ice Skating" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
