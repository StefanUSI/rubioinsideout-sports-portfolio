/**
 * Legal notice (Impressum) — required for Swiss nDSG/GDPR compliance.
 *
 * The email address is rendered via ObfuscatedEmail, which injects the
 * `<a href="mailto:...">` into the DOM at runtime rather than including
 * it in the HTML source. This simple obfuscation deters basic email-
 * harvesting bots while remaining fully accessible to users.
 */
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site.config";

function ObfuscatedEmail() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const u = SITE_CONFIG.contact.emailUser;
    const d = SITE_CONFIG.contact.emailDomain;
    const addr = `${u}@${d}`;
    const a = document.createElement("a");
    a.href = `mailto:${addr}`;
    a.textContent = addr;
    a.className = "underline underline-offset-2 hover:opacity-70 transition-opacity";
    ref.current.replaceChildren(a);
  }, []);
  return <span ref={ref} />;
}

export default function LegalNotice() {
  const { t } = useLanguage();

  return (
    <div className="bg-gallery-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="font-display text-5xl uppercase tracking-tighter mb-16">
          {t("legal.title")}
        </h1>

        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-tight mb-4">
            {t("legal.responsiblePerson")}
          </h2>
          <div className="space-y-1 text-base leading-relaxed">
            <p>{t("legal.name")}</p>
            <p>{t("legal.address")}</p>
            <p>
              {t("legal.emailLabel")}: <ObfuscatedEmail />
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-tight mb-4">
            {t("legal.disclaimerTitle")}
          </h2>
          <p className="text-base leading-relaxed">{t("legal.disclaimerText")}</p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase tracking-tight mb-4">
            {t("legal.externalLinksTitle")}
          </h2>
          <p className="text-base leading-relaxed">{t("legal.externalLinksText")}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl uppercase tracking-tight mb-4">
            {t("legal.copyrightTitle")}
          </h2>
          <p className="text-base leading-relaxed">{t("legal.copyrightText")}</p>
        </section>
      </div>
    </div>
  );
}
