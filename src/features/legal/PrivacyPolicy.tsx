/**
 * Privacy policy page — data-driven from i18n translation keys.
 *
 * The section list is intentionally defined as a static array of key
 * pairs so the page structure mirrors both EN and DE translations
 * without conditional rendering. Adding a new section only requires
 * a new i18n key pair; no component changes needed.
 */
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  const sections = [
    { title: "privacy.introTitle", text: "privacy.introText" },
    { title: "privacy.cookielessTitle", text: "privacy.cookielessText" },
    { title: "privacy.functionalTitle", text: "privacy.functionalText" },
    { title: "privacy.analyticsTitle", text: "privacy.analyticsText" },
    { title: "privacy.fontsTitle", text: "privacy.fontsText" },
    { title: "privacy.hostingTitle", text: "privacy.hostingText" },
    { title: "privacy.rightsTitle", text: "privacy.rightsText" },
    { title: "privacy.changesTitle", text: "privacy.changesText" },
  ];

  return (
    <div className="bg-gallery-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="font-display text-5xl uppercase tracking-tighter mb-16">
          {t("privacy.title")}
        </h1>

        {sections.map(({ title, text }, i) => (
          <section key={i} className={i < sections.length - 1 ? "mb-12" : ""}>
            <h2 className="font-display text-2xl uppercase tracking-tight mb-4">
              {t(title)}
            </h2>
            <p className="text-base leading-relaxed">{t(text)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
