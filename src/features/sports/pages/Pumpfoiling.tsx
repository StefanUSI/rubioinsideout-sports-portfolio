/**
 * Pumpfoiling subpage.
 *
 * Follows the shared sport page architecture. Uses the teal-on-dark-grey
 * palette (#313A43 / #2EC4B6).
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

const p = sportPalettes.pumpfoiling;

export default function Pumpfoiling() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("pumpfoiling.returnLabel")}>

      {/* Ambient Ripples */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[20%] w-64 h-64 border border-[#2EC4B6]/30 rounded-full anim-ripple" />
        <div className="absolute top-[60%] right-[15%] w-[30rem] h-[30rem] border border-[#2EC4B6]/30 rounded-full anim-ripple" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/pumpfoiling/hero_pumpfoiling.mp4"
          imageSrc="/images/hero/pumpfoiling/hero_pumpfoiling.jpg"
          imageAlt="Pumpfoiling flight"
          className="z-0 hero-wave-motion"
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,180,216,0.08) 0%, transparent 60%)' }} />
        </HeroVideoBackground>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        {/* Back Button */}
        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero Content */}
        <SubpageHeroContent
          leftTitle="PUMP"
          rightTitle="FOILING"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="weightless motion—flying without wind, conquering without engines"
        />
      </section>

      {/* Wave Divider */}
      <div className="relative h-24 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-24 anim-wave" viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path d="M0,60 C300,20 600,90 900,50 C1200,10 1500,80 1800,40 C2100,0 2400,70 2400,60 L2400,100 L0,100 Z" fill={p.bg} />
        </svg>
      </div>

      {/* The Flight Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          {/* Main Content - Left */}
          <motion.div {...fadeInLeft} className="order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8">
              {t("pumpfoiling.headingA")} <br /> <span style={{ color: p.accent }}>{t("pumpfoiling.headingB")}</span>
            </h2>
            <div className="space-y-6 text-xl text-white/70 leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("pumpfoiling.p1")}</p>
              <p>{t("pumpfoiling.p2")}</p>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="order-1 lg:order-2 space-y-8">
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.pumpfoiling.strength },
                { label: t("skills.endurance"), value: sportSkills.pumpfoiling.endurance },
                { label: t("skills.technique"), value: sportSkills.pumpfoiling.technique },
                { label: t("skills.mentalGame"), value: sportSkills.pumpfoiling.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
            />

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl"
            >
              <ResponsiveImage src="/images/body/pumpfoiling/pumpfoiling.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Flight" loading="lazy" decoding="async" className="w-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative h-16 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-16 anim-wave" style={{ animationDelay: "-4s" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path d="M0,50 C400,80 800,20 1200,60 C1600,90 2000,30 2400,50" fill="none" stroke="rgba(46,196,182,0.15)" strokeWidth="2" />
        </svg>
      </div>

      <EquipmentSection heading={t("pumpfoiling.equipmentHeading")} text={t("pumpfoiling.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      {/* Wave Divider */}
      <div className="relative h-16 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-16 anim-wave" style={{ animationDelay: "-8s", animationDirection: "reverse" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path d="M0,40 C300,80 600,10 900,50 C1200,90 1500,20 1800,60 C2100,90 2400,30 2400,40" fill="none" stroke="rgba(46,196,182,0.12)" strokeWidth="1.5" />
        </svg>
      </div>

      <SportVideos sport="Pumpfoiling" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
