/**
 * Global navigation bar.
 *
 * Layout variants:
 *  - **Home (unscrolled):** transparent background, white text — sits over
 *    the hero video without a visible bar.
 *  - **Home (scrolled) / all other pages:** solid white with a black bottom
 *    border — ensures readability once the hero has scrolled away.
 *  - **Sport subpages:** Navbar is not rendered at all (see App.tsx). Those
 *    pages use a fixed BackButton instead to keep the full-bleed hero clean.
 *
 * The sport dropdown is populated dynamically from SPORT_REGISTRY so adding
 * a new sport requires zero Navbar changes.
 *
 * Mobile: Replaces dropdown menus with a full-screen overlay containing a
 * 2-column sport grid, optimised for thumb reachability.
 */
import { motion } from "motion/react";
import { Youtube, Instagram, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { SPORT_REGISTRY_SORTED } from "@/features/sports/config/registry";
import { SITE_CONFIG } from "@/config/site.config";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSportDropdownOpen, setIsSportDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    // Already on home: reset hero and scroll to top.
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.dispatchEvent(new CustomEvent("home-refresh"));
  };

  // Build the sorted sport list with Handstands pinned at the top.
  // Handstands is a standalone page (not in SPORT_REGISTRY) so it’s
  // hard-coded here to keep it visible in navigation.
  const sports = [
    { name: "Handstand", path: "/handstands" },
    ...SPORT_REGISTRY_SORTED.map((entry) => ({ name: entry.label, path: `/${entry.slug}` })),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking anywhere outside them.
  // Two refs tracked independently so closing one doesn’t affect the other.
  // (globalThis.MouseEvent — the DOM event, not React's synthetic type
  //  imported above for handleBrandClick.)
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target as Node)) {
        setIsSportDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine if we should use the transparent/on-video styling
  const isTransparent = !isScrolled && location.pathname === "/";

  return (
    <>
      <nav 
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent 
            ? "bg-transparent border-transparent text-white" 
            : "bg-white border-b-2 border-black text-black"
        }`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" onClick={handleBrandClick} className="navbar-brand tracking-tight uppercase block pt-2 md:pt-0">{SITE_CONFIG.brandName}</Link>

          <div className="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest font-bold">
          <Link to="/handstands" className="transition-colors hover:opacity-70">{t("nav.handstands")}</Link>
          <a href={location.pathname === "/" ? "#videos" : "/#videos"} className="transition-colors hover:opacity-70">{t("nav.videos")}</a>
          <a href={location.pathname === "/" ? "#about" : "/#about"} className="transition-colors hover:opacity-70">{t("nav.about")}</a>
          <Link to="/services" className="transition-colors hover:opacity-70">{t("nav.services")}</Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={SITE_CONFIG.social.youtube} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="YouTube channel"
            className={`p-2 transition-all duration-300 border ${
              isTransparent ? "border-transparent hover:border-white" : "border-transparent hover:bg-black hover:text-white hover:border-black"
            }`}
          >
            <Youtube size={20} />
          </a>
          <a 
            href={SITE_CONFIG.social.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram profile"
            className={`p-2 transition-all duration-300 border ${
              isTransparent ? "border-transparent hover:border-white" : "border-transparent hover:bg-black hover:text-white hover:border-black"
            }`}
          >
            <Instagram size={20} />
          </a>

          {/* Sport Selector Dropdown (desktop only) */}
          <div ref={sportDropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setIsSportDropdownOpen(!isSportDropdownOpen)}
              className={`p-2 flex items-center gap-1 border transition-all duration-300 ${
                isTransparent 
                  ? "border-transparent hover:border-white" 
                  : "border-transparent hover:bg-black hover:text-white hover:border-black"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{t("nav.sport")}</span>
              <ChevronDown size={16} className={`transition-transform ${isSportDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isSportDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute right-0 mt-2 bg-white border-2 border-black shadow-lg max-h-96 overflow-y-auto`}
              >
                {sports.map((sport, index) => (
                  <Link
                    key={sport.path}
                    to={sport.path}
                    onClick={() => setIsSportDropdownOpen(false)}
                    className={`block w-full px-4 py-2 text-left text-sm font-bold uppercase tracking-widest hover:bg-gray-100 text-black ${
                      index !== sports.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    {sport.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Language Dropdown (desktop only) */}
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`p-2 flex items-center gap-1 border transition-all duration-300 ${
                isTransparent 
                  ? "border-transparent hover:border-white" 
                  : "border-transparent hover:bg-black hover:text-white hover:border-black"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{language}</span>
              <ChevronDown size={16} className={`transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isLanguageDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute right-0 mt-2 bg-white border-2 border-black shadow-lg ${isTransparent ? "text-black" : "text-black"}`}
              >
                <button
                  onClick={() => {
                    setLanguage("EN");
                    setIsLanguageDropdownOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm font-bold uppercase tracking-widest hover:bg-gray-100 ${
                    language === "EN" ? "bg-black text-white" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setLanguage("DE");
                    setIsLanguageDropdownOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm font-bold uppercase tracking-widest hover:bg-gray-100 border-t-2 border-black ${
                    language === "DE" ? "bg-black text-white" : ""
                  }`}
                >
                  DE
                </button>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className={`md:hidden w-8 h-8 p-1 flex items-center justify-center rounded-sm transition-colors ${isTransparent ? "bg-white/80 text-black" : "bg-black/75 text-white"}`}
          >
            {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden text-black overflow-y-auto pb-12"
        >
          <div className="flex flex-col gap-6 font-display text-3xl uppercase tracking-tighter">
            <Link to="/handstands" onClick={() => setIsMenuOpen(false)}>{t("nav.handstands")}</Link>
            <a href={location.pathname === "/" ? "#videos" : "/#videos"} onClick={() => setIsMenuOpen(false)}>{t("nav.videos")}</a>
            <a href={location.pathname === "/" ? "#about" : "/#about"} onClick={() => setIsMenuOpen(false)}>{t("nav.about")}</a>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>{t("nav.services")}</Link>
          </div>

          <div className="mt-10 border-t-2 border-black pt-6">
            <p className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50">{t("nav.sport")}</p>
            <div className="grid grid-cols-2 gap-3">
              {sports.map((sport) => (
                <Link
                  key={sport.path}
                  to={sport.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 text-xs font-bold uppercase tracking-widest border-2 border-black text-center hover:bg-black hover:text-white transition-colors"
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t-2 border-black pt-6">
            <div className="flex gap-3">
              <button
                onClick={() => { setLanguage("EN"); setIsMenuOpen(false); }}
                className={`flex-1 py-2 font-bold uppercase tracking-widest border-2 border-black text-sm ${language === "EN" ? "bg-black text-white" : ""}`}
              >
                EN
              </button>
              <button
                onClick={() => { setLanguage("DE"); setIsMenuOpen(false); }}
                className={`flex-1 py-2 font-bold uppercase tracking-widest border-2 border-black text-sm ${language === "DE" ? "bg-black text-white" : ""}`}
              >
                DE
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
