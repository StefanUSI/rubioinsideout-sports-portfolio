/**
 * Services page — displays offerings as animated icon cards.
 *
 * Each service card pulls its title and description from i18n keys, making
 * the page fully translatable without code changes. Icons are sourced from
 * lucide-react for a consistent line-art look that matches the brutalist
 * aesthetic.
 */
import { motion } from "motion/react";
import { Video, Users, Waves, MonitorCheck, Mountain, Home as HomeIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const SERVICES = [
    { titleKey: "services_page.s1title", descKey: "services_page.s1desc", icon: Users },
    { titleKey: "services_page.s2title", descKey: "services_page.s2desc", icon: Video },
    { titleKey: "services_page.s3title", descKey: "services_page.s3desc", icon: Waves },
    { titleKey: "services_page.s4title", descKey: "services_page.s4desc", icon: MonitorCheck },
    { titleKey: "services_page.s5title", descKey: "services_page.s5desc", icon: Mountain },
    {
      titleKey: "services_page.s6title",
      descKey: "services_page.s6desc",
      icon: HomeIcon,
      link: "https://www.airbnb.com/rooms/1045804605483303017",
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[clamp(2.5rem,8vw,4.5rem)] md:text-[clamp(3.5rem,7vw,6.5rem)] uppercase leading-[0.8] tracking-tighter mb-8"
          >
            {t("services_page.heading")} <br />
            <span className="text-outline">{t("services_page.headingOutline1")}</span><br />
            <span className="text-black">{t("services_page.headingOutline2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[clamp(1rem,4vw,1.2rem)] md:text-xl font-medium leading-snug"
          >
            {t("services_page.subheading")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              viewport={{ once: true }}
              className="bg-white border-2 border-black p-8 brutal-shadow brutal-shadow-hover transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black border border-black inline-block">
                  <service.icon size={24} className="text-white" />
                </div>
                <h2 className="font-display text-[clamp(1.3rem,6vw,1.8rem)] md:text-3xl uppercase tracking-tighter leading-none">{t(service.titleKey)}</h2>
              </div>
              <p className="text-[clamp(0.95rem,4vw,1.1rem)] md:text-lg font-medium leading-tight opacity-80 mb-8 flex-grow">
                {t(service.descKey)}
              </p>
              {service.link && (
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold uppercase tracking-widest px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
                >
                  {t("services_page.cta")}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
