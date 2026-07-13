/**
 * Weightlifting subpage.
 *
 * Follows the shared sport page architecture. Uses the dark palette
 * (#111111 / #e63946 red accent).
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
import { fadeInRight } from "@/features/sports/config/motionPresets";

const p = sportPalettes.weightlifting;

export default function Weightlifting() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("weightlifting.returnLabel")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/weightlifting/hero_weightlifting.mp4"
          imageSrc="/images/hero/weightlifting/hero_weightlifting.jpg"
          imageAlt="Weightlifting snatch"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#111]/0 via-[#111]/30 to-[#111]/100" />
        </HeroVideoBackground>

        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Weight"
          rightTitle="lifting"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="perfect form—transforming force into grace under load"
        />
      </section>

      {/* Narrative Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-12">
              {t("weightlifting.headingA")} <span style={{ color: p.accent }}>{t("weightlifting.headingB")}</span> <br />{t("weightlifting.headingC")}
            </h2>
            <div className="space-y-8 text-xl text-white/70 leading-relaxed font-light border-l pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("weightlifting.p1")}</p>
              <p>{t("weightlifting.p2")}</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInRight}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.weightlifting.strength },
                { label: t("skills.endurance"), value: sportSkills.weightlifting.endurance },
                { label: t("skills.technique"), value: sportSkills.weightlifting.technique },
                { label: t("skills.mentalGame"), value: sportSkills.weightlifting.mentalGame },
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
              <ResponsiveImage
                src="/images/body/weightlifting/weightlifting.jpg"
                alt="Olympic Lift"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("weightlifting.equipmentHeading")} text={t("weightlifting.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Weightlifting" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
