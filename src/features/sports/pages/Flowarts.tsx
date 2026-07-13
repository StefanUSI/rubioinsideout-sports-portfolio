/**
 * Flowarts subpage.
 *
 * Covers juggling, poi, and rope jumping. Uses the deep-dark palette
 * (#050505 / #9B5DE5 purple accent).
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
import { fadeInLeft } from "@/features/sports/config/motionPresets";

const p = sportPalettes.flowarts;

export default function Flowarts() {
  const { t } = useLanguage();
  return (
    <SportPageLayout palette={p} footerLabel={t("flowarts.returnLabel")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero/flowarts/hero_flowarts.jpg"
            alt="Flowarts meditation"
            sizes="100vw"
            className="w-full h-full object-cover grayscale opacity-20"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="anim-orbit absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#9B5DE5] blur-sm"
              style={{ animationDelay: `${i * -1.5}s` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="anim-orbit-reverse absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 blur-sm"
              style={{ animationDelay: `${i * -3}s` }}
            />
          ))}
        </div>

        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Flow"
          rightTitle="Arts"
          leftTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="rhythmic meditation—objects become extensions of intent"
        />
      </section>

      {/* Content Section */}
      <section className={`relative ${layout.sectionPadding} overflow-hidden`}>
        <div className={`${layout.container} grid grid-cols-1 lg:grid-cols-2 gap-24 items-start`}>
          <motion.div {...fadeInLeft} className="space-y-10 lg:col-span-1 order-2 lg:order-1">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              {t("flowarts.headingA")} <br /> <span style={{ color: p.accent }}>{t("flowarts.headingB")}</span>
            </h2>
            <div className="space-y-6 text-white/70 text-xl leading-relaxed font-light border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}>
              <p>{t("flowarts.p1")}</p>
              <p>{t("flowarts.p2")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10 lg:col-span-1 order-1 lg:order-2"
          >
            <SkillBox
              skills={[
                { label: t("skills.strength"), value: sportSkills.flowarts.strength },
                { label: t("skills.endurance"), value: sportSkills.flowarts.endurance },
                { label: t("skills.technique"), value: sportSkills.flowarts.technique },
                { label: t("skills.mentalGame"), value: sportSkills.flowarts.mentalGame },
              ]}
              accentColor={p.accent}
              bgColor={p.bg}
              isDark={p.isDark}
              className="space-y-6"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl"
            >
              <ResponsiveImage src="/images/body/flowarts/flowarts.jpg" sizes="(min-width: 1024px) 50vw, 100vw" alt="Flow State" loading="lazy" decoding="async" className="w-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>


      <EquipmentSection heading={t("flowarts.equipmentHeading")} text={t("flowarts.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      <SportVideos sport="Flowarts" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
