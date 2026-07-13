/**
 * Handstands gallery — interactive world-map photo explorer.
 *
 * Features:
 *  - SVG world map (inline via ?raw import) with country paths that
 *    highlight on hover/active based on which countries have gallery
 *    images.
 *  - Region → Country drill-down filter that dynamically narrows the
 *    photo grid. Selecting "All" in either filter shows the full set.
 *  - Lightbox modal (AnimatePresence) with left/right navigation and
 *    keyboard support.
 *
 * The map interaction uses DOM manipulation on the raw SVG paths to
 * set fill colours, avoiding the overhead of a full GeoJSON/D3 library
 * for what is essentially a static country-highlight feature.
 */
import { motion, AnimatePresence } from "motion/react";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import worldmapRaw from "@/assets/worldmap.svg?raw";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { HANDSTANDS_GALLERY } from "./galleryData";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site.config";

const COUNTRY_NAME_TO_ID: Record<string, string> = {
  "Bolivia":        "BO",
  "Cambodia":       "KH",
  "Colombia":       "CO",
  "Costa Rica":     "CR",
  "Czech Republic": "CZ",
  "Ecuador":        "EC",
  "Guatemala":      "GT",
  "Italy":          "IT",
  "Mexico":         "MX",
  "Panama":         "PA",
  "Peru":           "PE",
  "Portugal":       "PT",
  "Spain":          "ES",
  "Switzerland":    "CH",
  "Thailand":       "TH",
  "Vietnam":        "VN",
};

export default function Handstands() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCountry, setActiveCountry] = useState("All");
  const { t } = useLanguage();
  const lightboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  /** Open the lightbox and remember which element triggered it for focus restore. */
  const openLightbox = useCallback((idx: number) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedIdx(idx);
  }, []);

  /** Close the lightbox and return focus to the triggering element. */
  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const mapAreas = useMemo(() => [
    { region: "Europe", label: "Europe" },
    { region: "North America", label: "North America" },
    { region: "Central America", label: "Central America" },
    { region: "South America", label: "South America" },
    { region: "Southeast Asia", label: "Southeast Asia" },
  ], []);

  const svgContent = useMemo(() => {
    let svg = worldmapRaw
      .replace(/width="[\d.]+"/, 'width="100%"')
      .replace(/ height="[\d.]+"/, '');

    let ids: string[];
    if (activeCountry !== "All") {
      // Single country selected — highlight only that country
      const id = COUNTRY_NAME_TO_ID[activeCountry];
      ids = id ? [id] : [];
    } else if (activeRegion !== "All") {
      // Region selected, no country — highlight all gallery countries in that region
      ids = Array.from(new Set(
        HANDSTANDS_GALLERY
          .filter((img) => img.region === activeRegion)
          .map((img) => COUNTRY_NAME_TO_ID[img.country])
          .filter(Boolean)
      ));
    } else {
      // No filter — highlight every country that has any image
      ids = Array.from(new Set(
        HANDSTANDS_GALLERY
          .map((img) => COUNTRY_NAME_TO_ID[img.country])
          .filter(Boolean)
      ));
    }

    const styleOverride = ids.length > 0
      ? `<style>.land { fill: #1e293b; stroke: #0f172a; stroke-width: 0.4; } ${ids.map(id => `#${id}`).join(', ')} { fill: #70E000; stroke: #0f172a; }</style>`
      : `<style>.land { fill: #334155; stroke: #0f172a; stroke-width: 0.4; }</style>`;

    return svg.replace('</svg>', styleOverride + '</svg>');
  }, [activeRegion, activeCountry]);

  const countryFilters = useMemo(() => {
    const source = activeRegion === "All"
      ? HANDSTANDS_GALLERY
      : HANDSTANDS_GALLERY.filter((img) => img.region === activeRegion);
    return ["All", ...Array.from(new Set(source.map((img) => img.country)))];
  }, [activeRegion]);

  const filteredImages = useMemo(() => {
    let images = HANDSTANDS_GALLERY;
    if (activeRegion !== "All") {
      images = images.filter((img) => img.region === activeRegion);
    }
    if (activeCountry !== "All") {
      images = images.filter((img) => img.country === activeCountry);
    }
    return images;
  }, [activeRegion, activeCountry]);

  useEffect(() => {
    setSelectedIdx(null);
  }, [activeRegion, activeCountry]);

  useEffect(() => {
    setActiveCountry("All");
  }, [activeRegion]);

  const nextImage = () => {
    if (selectedIdx !== null && filteredImages.length > 0) {
      setSelectedIdx((selectedIdx + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedIdx !== null && filteredImages.length > 0) {
      setSelectedIdx((selectedIdx - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  // Focus trap + keyboard navigation for the lightbox modal.
  // Moves focus into the modal on open, traps Tab within the three
  // buttons, and supports Escape / ArrowLeft / ArrowRight keys.
  useEffect(() => {
    if (selectedIdx === null) return;

    // Focus the modal container so keyboard events are captured immediately
    requestAnimationFrame(() => lightboxRef.current?.focus());

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIdx((prev) =>
          prev !== null ? (prev + 1) % filteredImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIdx((prev) =>
          prev !== null
            ? (prev - 1 + filteredImages.length) % filteredImages.length
            : null
        );
      } else if (e.key === "Tab") {
        // Trap focus within the lightbox
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredImages.length, closeLightbox]);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/body/handstands/handstand.jpg"
            alt="Handstand background"
            sizes="100vw"
            className="w-full h-full object-cover grayscale opacity-100"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 via-transparent to-[#0f172a]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Hand<span className="text-[#70E000] text-outline" style={{ WebkitTextStroke: "1px #70E000" }}>Stands</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-white/50 font-mono uppercase tracking-[0.5em] max-w-xl mx-auto"
          >
            {t("handstands.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            <motion.a
              href={SITE_CONFIG.social.instagramHandstands}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white text-black px-4 py-2 font-mono text-[10px] uppercase tracking-wide font-bold border-2 border-black brutal-shadow hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform"
            >
              <Instagram size={14} />
              @rubioupsidedown
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Handstands intro text */}
      <section className="bg-[#0f172a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mx-auto max-w-3xl text-white/70 text-base md:text-lg tracking-wide">{t("handstands.intro")}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-16 space-y-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 mb-4">{t("handstands.filterByRegion")}</div>

            <div
              className="mx-auto max-w-5xl rounded-xl border border-white/10 overflow-hidden bg-[#0f172a]"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveRegion("All")}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition ${
                  activeRegion === "All"
                    ? 'bg-[#70E000] text-black border border-black'
                    : 'bg-white/15 text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                All
              </button>
              {mapAreas.map((mapArea) => {
                const isActive = activeRegion === mapArea.region;
                return (
                  <button
                    key={mapArea.region}
                    type="button"
                    onClick={() => setActiveRegion(mapArea.region)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition ${
                      isActive
                        ? 'bg-[#70E000] text-black border border-black'
                        : 'bg-white/15 text-white border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    {mapArea.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 mb-4">{t("handstands.filterByCountry")}</div>
            <div className="flex flex-wrap gap-3">
              {countryFilters.map((country) => {
                const isActive = activeCountry === country;
                return (
                  <button
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    className={`px-4 py-2 border text-xs uppercase tracking-[0.2em] font-mono transition-colors ${
                      isActive
                        ? "border-[#70E000] bg-[#70E000] text-black"
                        : "border-white/20 bg-white/5 text-white/70 hover:border-[#70E000]/60 hover:text-[#70E000]"
                    }`}
                  >
                    {country}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Local Image Gallery */}
        <div className="space-y-32">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 3) * 0.15 }}
                viewport={{ once: true }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
              >
                <ResponsiveImage
                  src={img.src}
                  alt={`Handstand in ${img.city}`}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#70E000]">
                    {img.year ? `${img.country}, ${img.year}` : img.country}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16 text-white/50 font-mono text-xs uppercase tracking-[0.25em]">
              {t("handstands.noImages")}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && selectedIdx < filteredImages.length && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 outline-none"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
            >
              <img
                src={filteredImages[selectedIdx].src}
                alt={filteredImages[selectedIdx].city}
                decoding="async"
                className="max-w-full max-h-[80vh] object-contain border border-white/10"
              />
              <div className="mt-8 text-center">
                <div className="font-display text-2xl uppercase tracking-tighter text-[#70E000]">
                  {filteredImages[selectedIdx].country}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">
                  {filteredImages[selectedIdx].year ?? ""}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
