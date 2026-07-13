/**
 * Freediving subpage.
 *
 * Unique elements: animated depth meter (Award icon), bubble particles
 * (CSS keyframes), and a certifications display. Uses the deep-ocean
 * palette (#001830 dark navy).
 */
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import SportVideos from "@/features/sports/components/SportVideos";
import SkillBars from "@/components/ui/SkillBars";
import sportSkills from "@/features/sports/config/skills";
import SubpageHeroContent from "@/features/sports/components/SubpageHeroContent";
import HeroVideoBackground from "@/features/sports/components/HeroVideoBackground";
import EquipmentSection from "@/features/sports/components/EquipmentSection";
import SportPageLayout from "@/features/sports/components/SportPageLayout";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/context/LanguageContext";
import { sportPalettes, hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";

const p = sportPalettes.freediving;

export default function Freediving() {
  const isDesktop = useIsDesktop();
  const { t } = useLanguage();
  const bubbleCount = isDesktop ? 80 : 20;

  return (
    <SportPageLayout palette={p} footerLabel={t("freediving.returnLabel")}>
      {/* Enhanced Bubble Effect - reduced count on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(bubbleCount)].map((_, i) => {
          // Stronger effect: larger, more opaque, more bubbles
          const size = Math.random() * 10 + 4; // 4px to 14px
          const opacity = i % 2 === 0 ? Math.random() * 0.5 + 0.4 : Math.random() * 0.3 + 0.15;
          return (
            <div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'anim-bubble' : i % 4 === 1 ? 'anim-bubble-2' : i % 4 === 2 ? 'anim-bubble-3' : 'anim-bubble-4'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20 - 10}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: i % 2 === 0 ? `rgba(0, 119, 182, ${opacity})` : `rgba(255, 255, 255, ${opacity * 0.7})`,
                boxShadow: `0 0 ${Math.random() * 12 + 4}px rgba(0, 119, 182, ${Math.random() * 0.5})`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 12}s`,
                '--tx': `${Math.random() * 40 - 20}px`
              } as CSSProperties}
            />
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background: video crossfades to image */}
        <HeroVideoBackground
          videoSrc="/videos/hero/freediving/hero_freediving.mp4"
          videoWebmSrc="/videos/hero/freediving/hero_freediving.webm"
          imageSrc="/images/hero/freediving/hero_freediving.jpg"
          imageAlt="Freediving underwater"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#001830]/60 via-[#001830]/40 to-[#001830]" />
        </HeroVideoBackground>

        <BackButton hoverColor={p.accent} isDark={p.isDark} />

        {/* Hero content */}
        <SubpageHeroContent
          leftTitle="Free"
          rightTitle="diving"
          rightTitleStyle={{ color: p.accent }}
          artOfColor={p.accent}
          dividerColor={hexAlpha(p.accent, 0.3)}
          taglineToneClass={p.taglineColor}
          tagline="listening to the depth—one breath, infinite presence"
        />
      </section>

      {/* Wave Divider */}
      <div className="relative h-24 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-24 anim-wave" viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path
            d="M0,60 C300,20 600,90 900,50 C1200,10 1500,80 1800,40 C2100,0 2400,70 2400,60 L2400,100 L0,100 Z"
            fill="#002040"
          />
        </svg>
      </div>

      {/* The Beauty of Freediving */}
      <section className={`relative bg-[#002040] ${layout.sectionPadding}`}>
        <div className={layout.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Main Content */}
            <div className="space-y-8 text-white/80 text-lg leading-relaxed font-light">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4">
                  {t("freediving.headingA")} <span style={{ color: p.accent }}>{t("freediving.headingB")}</span>
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-12">
                  {t("freediving.subHeading")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8 border-l-2 pl-8 max-w-prose" style={{ borderColor: hexAlpha(p.accent, 0.3) }}
              >
                <p>
                  When I'm underwater with only a single breath, everything else disappears. No phone, no worries, no noise—just me, the silence, and the infinite blue. That moment when I let go of conscious breathing and enter a state of complete calm is what I live for. It's pure meditation.
                </p>
                <p>
                  I love freediving because it forces you to be present in a way few things can. You can't overthink when your oxygen is limited. You can't be distracted. Your mind becomes a calm, steady instrument focused on one thing: the present moment. And in that presence, something magical happens—you become truly connected to the ocean.
                </p>
                <p>
                  There's also a challenge that excites me. Pushing your depth safely, understanding your body's response, training your mind to stay relaxed under stress. Every dive I push a little deeper, stay a little longer, find a little more control. It's exploration in the purest sense—discovering what you're capable of when you trust yourself and respect the ocean.
                </p>
                <p>
                  What keeps calling me back to the water is simple: the feeling that I'm part of something larger than myself. Down there, in that blue world, I feel more alive than anywhere else on Earth.
                </p>
              </motion.div>
            </div>

            {/* Skill Level + Image */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 p-8 border border-[#0077B6]/30 bg-[#001830] rounded-2xl"
              >
                <SkillBars
                  skills={[
                    { label: t("skills.strength"), value: sportSkills.freediving.strength },
                    { label: t("skills.endurance"), value: sportSkills.freediving.endurance },
                    { label: t("skills.technique"), value: sportSkills.freediving.technique },
                    { label: t("skills.mentalGame"), value: sportSkills.freediving.mentalGame }
                  ]}
                  accentColor={p.accent}
                  bgColor={p.bg}
                  isDark={p.isDark}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl"
              >
                <ResponsiveImage src="/images/body/freediving/freediving.jpg" alt="Freediving" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating accent blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#0077B6]/5 anim-float pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-blue-400/5 anim-float-delay pointer-events-none" />
      </section>

      {/* Second Wave Divider */}
      <div className="relative h-24 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-24 anim-wave" style={{ animationDirection: "reverse" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path
            d="M0,50 C400,90 800,10 1200,60 C1600,100 2000,30 2400,50 L2400,100 L0,100 Z"
            fill="#001830"
          />
        </svg>
      </div>

      {/* Certification Section */}
      <section className={`relative bg-[#001830] ${layout.sectionPadding}`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16">
              {t("freediving.certHeadingA")}<span style={{ color: p.accent }}>{t("freediving.certHeadingB")}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-md"
          >
            {/* Certification card */}
            <div className="relative border border-[#0077B6]/30 bg-gradient-to-br from-[#002a50] to-[#001830] p-10 md:p-14 text-center rounded-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#0077B6]/5 blur-xl" />

              <div className="relative z-10">
                <Award className="mx-auto mb-6 text-[#0077B6]" size={48} />

                <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 mb-3">
                  {t("freediving.certLabel")}
                </p>

                <h3 className="font-display text-5xl md:text-6xl uppercase tracking-tighter mb-4">
                  Level <span className="text-[#0077B6]">2</span>
                </h3>

                <p className="font-mono text-sm uppercase tracking-widest text-white/50 mb-8">
                  {t("freediving.certRole")}
                </p>

                <div className="w-16 h-px bg-[#0077B6]/30 mx-auto mb-8" />

                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                    {t("freediving.certDesc")}
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#0077B6]/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#0077B6]/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#0077B6]/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#0077B6]/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative h-16 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-16 anim-wave" style={{ animationDelay: "-4s" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path d="M0,50 C400,80 800,20 1200,60 C1600,90 2000,30 2400,50" fill="none" stroke="rgba(0,119,182,0.15)" strokeWidth="2" />
        </svg>
      </div>

      <EquipmentSection heading={t("freediving.equipmentHeading")} text={t("freediving.equipmentText")} accentColor={p.accent} isDark={p.isDark} />

      {/* Wave Divider */}
      <div className="relative h-16 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-16 anim-wave" style={{ animationDelay: "-8s", animationDirection: "reverse" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path d="M0,40 C300,80 600,10 900,50 C1200,90 1500,20 1800,60 C2100,90 2400,30 2400,40" fill="none" stroke="rgba(0,119,182,0.12)" strokeWidth="1.5" />
        </svg>
      </div>

      <SportVideos sport="Freediving" accentColor={p.accent} isDark={p.isDark} />
    </SportPageLayout>
  );
}
