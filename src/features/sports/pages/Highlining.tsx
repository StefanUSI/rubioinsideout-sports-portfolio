/**
 * Highlining subpage.
 *
 * Unique: uses the light palette (B8C5D6 sky blue) and includes a direct
 * ReturnLink reference instead of relying solely on SportPageLayout’s
 * built-in SubpageFooter, because the highlining page has custom footer
 * positioning.
 */
import { motion } from "motion/react";
import BackButton from "@/components/ui/BackButton";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import ReturnLink from "@/components/ui/ReturnLink";
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
import { fadeInLeft } from "@/features/sports/config/motionPresets";

const p = sportPalettes.highlining;

export default function Highlining() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p}>
      <BackButton hoverColor={p.accent} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Ambient Ring */}
        <div className="absolute w-[80vh] h-[80vh] border border-black/5 rounded-full anim-pulse-slow pointer-events-none" />

        {/* Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 120 - 20}%`,
                animation: `rain-fall ${Math.random() * 1.8 + 1.7}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: `${Math.random() * 0.5 + 0.3}`,
                height: `${Math.random() * 6 + 4}px`,
                transform: `rotate(${Math.random() * 15 - 7}deg)`
              }}
            />
          ))}
        </div>

        {/* Background: video crossfades to image */}
        <div className="absolute inset-0 hero-cloud-motion">
          <HeroVideoBackground
            videoSrc="/videos/hero/highlining/hero_highlining.mp4"
            videoWebmSrc="/videos/hero/highlining/hero_highlining.webm"
            imageSrc="/images/hero/highlining/hero_highlining.jpg"
            imageAlt="Highlining"
          />
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${p.bg})` }} />

        <SubpageHeroContent
          leftTitle="High"
          rightTitle="lining"
          leftTitleStyle={{ color: '#ffffff' }}
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          textToneClass="text-black/60"
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="absolute focus—where mind becomes one with fiber"
        />
      </section>

      {/* Narrative Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden cloud-walk`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-20 items-start`}>
          {/* Main Content */}
          <motion.div {...fadeInLeft} className="space-y-12 lg:col-span-1 order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              {t("highlining.headingA")} <span style={{ color: p.accent }}>{t("highlining.headingB")}</span>
            </h2>
            <div className="space-y-6 text-xl text-black/70 leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("highlining.p1")}</p>
              <p>{t("highlining.p2")}</p>
            </div>
          </motion.div>

          {/* Skill Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1 order-1 lg:order-2"
          >
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.highlining.strength },
                { label: t("skills.endurance"), value: sportSkills.highlining.endurance },
                { label: t("skills.technique"), value: sportSkills.highlining.technique },
                { label: t("skills.mentalGame"), value: sportSkills.highlining.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
              className="space-y-6"
            />
            <div className="h-[20rem] md:h-[26rem] lg:h-[30rem] overflow-hidden mt-6 rounded-2xl">
              <ResponsiveImage src="/images/body/highlining/highlining.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Highlining" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentSection
        heading={t("highlining.equipmentHeading")}
        text={t("highlining.equipmentText")}
        accentColor={p.accent}
        isDark={p.isDark}
        className="cloud-walk"
        style={{ animationDelay: '0.8s' }}
      />

      {/* Videos */}
      <SportVideos sport="Highlining" accentColor={p.accent} isDark={p.isDark} />

      {/* Bottom Link */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center cloud-walk" style={{ animationDelay: '1.6s' }}>
        <ReturnLink
          label={t("highlining.returnLabel")}
          outlineColor="black"
          hoverColor={p.accent}
          isDark={p.isDark}
        />
      </section>
    </SportPageLayout>
  );
}
