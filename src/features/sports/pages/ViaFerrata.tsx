/**
 * Via Ferrata subpage.
 *
 * Uses the golden palette (#756832 / #F2D98E accent). Does not import
 * SportVideos because no via ferrata videos exist yet in the catalogue.
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
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

const p = sportPalettes.viaferrata;

export default function ViaFerrata() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("viaferrata.returnLabel")}>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/viaferrata/hero_viaferrata1.mp4"
          imageSrc="/images/hero/viaferrata/hero_viaferrata.jpg"
          imageAlt="Via Ferrata iron rungs"
        >
          {/* Sun Glare Effect */}
          <div className="sun-glare" />
          <div className="mountain-gradient" />
        </HeroVideoBackground>

        {/* Back button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Via"
          rightTitle="Ferrata"
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="iron pathways—where ancient rock meets human spirit"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div {...fadeInLeft} className="space-y-10">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              {t("viaferrata.headingA")} <br /> <span style={{ color: p.accent }}>{t("viaferrata.headingB")}</span>
            </h2>
            <div className="space-y-6 text-xl text-white/70 leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("viaferrata.p1")}</p>
              <p>{t("viaferrata.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.viaferrata.strength },
                { label: t("skills.endurance"), value: sportSkills.viaferrata.endurance },
                { label: t("skills.technique"), value: sportSkills.viaferrata.technique },
                { label: t("skills.mentalGame"), value: sportSkills.viaferrata.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            <div className="relative overflow-hidden rounded-xl">
              <ResponsiveImage src="/images/body/viaferrata/viaferrata.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Vertical Climb" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection heading={t("viaferrata.equipmentHeading")} text={t("viaferrata.equipmentText")} accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
