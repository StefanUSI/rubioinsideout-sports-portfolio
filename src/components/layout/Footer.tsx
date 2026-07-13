/**
 * Site-wide footer — copyright line and legal links.
 *
 * Accepts optional `bgColor` and `isDark` props so sport subpages can
 * match the footer background to their colour palette.
 */
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site.config";

export default function Footer({
  bgColor,
  isDark,
}: {
  bgColor?: string;
  isDark?: boolean;
}) {
  const { t } = useLanguage();

  const bgClass = bgColor ? "" : "bg-gallery-white";
  const textOpacity = isDark ? "opacity-30 text-white" : bgColor ? "opacity-30 text-black" : "opacity-30";

  return (
    <footer
      className={`${bgClass} px-4 sm:px-6 lg:px-8 py-8`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div
          className={`w-full md:w-auto text-center md:text-left font-mono text-[10px] uppercase tracking-[0.2em] ${textOpacity}`}
        >
          © {new Date().getFullYear()} {SITE_CONFIG.legalName}.
          <br className="md:hidden" />
          <span className="md:hidden">All Rights Reserved.</span>
          <span className="hidden md:inline">&nbsp;All Rights Reserved.</span>
        </div>
        <div
          className={`w-full md:w-auto flex flex-wrap justify-center md:justify-end gap-2 md:gap-4 font-mono text-[10px] uppercase tracking-[0.15em] ${textOpacity}`}
        >
          <Link to="/legal" className="hover:opacity-70 transition-opacity whitespace-nowrap">
            {t("footer.legalNotice")}
          </Link>
          <span className="px-1">|</span>
          <Link to="/privacy" className="hover:opacity-70 transition-opacity whitespace-nowrap">
            {t("footer.privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
