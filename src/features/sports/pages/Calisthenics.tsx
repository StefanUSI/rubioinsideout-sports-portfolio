/**
 * Calisthenics subpage.
 *
 * Follows the shared sport page architecture. Uses the dark palette
 * (#0a0a0a / #FB8500 orange accent).
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
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";
import { fadeInLeft, fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.calisthenics;

export default function Calisthenics() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("calisthenics.returnLabel")}>
      {/* Ambient Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fb850005] to-transparent anim-scan" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero/calisthenics/hero_calisthenics.jpg"
            alt="Calisthenics static hold"
            sizes="100vw"
            className="w-full h-full object-cover opacity-30"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero Content */}
        <SubpageHeroContent
          leftTitle="Cali"
          rightTitle="sthenics"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="mastering gravity through bodyweight and intent"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div {...fadeInLeft}>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter italic mb-8">
              {t("calisthenics.headingA")} <span style={{ color: p.accent }}>{t("calisthenics.headingB")}</span>{t("calisthenics.headingC")}
            </h2>
            <div className="space-y-8 text-xl text-white/70 leading-relaxed font-light border-l pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("calisthenics.p1")}</p>
              <p>{t("calisthenics.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.calisthenics.strength },
                { label: t("skills.endurance"), value: sportSkills.calisthenics.endurance },
                { label: t("skills.technique"), value: sportSkills.calisthenics.technique },
                { label: t("skills.mentalGame"), value: sportSkills.calisthenics.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            <div className="relative overflow-hidden rounded-xl">
              <ResponsiveImage src="/images/body/calisthenics/calisthenics.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Strength Hold" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("calisthenics.equipmentHeading")} text={t("calisthenics.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Calisthenics" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
