import { motion, AnimatePresence } from "motion/react";
import { Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

// The posts provided by the user
const INSTAGRAM_POSTS = [
  "https://www.instagram.com/p/DOlDC9VCBzm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DOk_G1ACP4o/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DOlAcfAiGDT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
];

const GALLERY_IMAGES = [
  { src: "/pictures/handstands/1_Panama_Edited (for Instagram)/IMG_20240201_201821(1)(1).jpg", city: "Panama City" },
  { src: "/pictures/handstands/1_Panama_Edited (for Instagram)/IMG_20240205_232309(1).jpg", city: "Bocas del Toro" },
  { src: "/pictures/handstands/2_Colombia_Edited (for Instagram)/done/IMG_20240204_150752.jpg", city: "Medellín" },
  { src: "/pictures/handstands/2_Colombia_Edited (for Instagram)/done/IMG_20240204_153152.jpg", city: "Guatapé" },
  { src: "/pictures/handstands/2_Colombia_Edited (for Instagram)/done/IMG_20240202_213102.jpg", city: "Cartagena" },
  { src: "/pictures/handstands/3_Ecuador_Edited (for Instagram)/done/IMG_20231026_125306(1)(1).jpg", city: "Quito" },
  { src: "/pictures/handstands/3_Ecuador_Edited (for Instagram)/done/IMG_20240205_230344(1).jpg", city: "Baños" },
  { src: "/pictures/handstands/3_Ecuador_Edited (for Instagram)/done/IMG_20240207_184532(4).jpg", city: "Cuenca" },
  { src: "/pictures/handstands/4_Galapagos_Edited (for Instagram)/done/IMG_20240207_214641(1)(1).jpg", city: "Santa Cruz" },
  { src: "/pictures/handstands/4_Galapagos_Edited (for Instagram)/done/PSX_20250916_001258_edit_184650031264774.jpg", city: "Isabela" },
  { src: "/pictures/handstands/4_Galapagos_Edited (for Instagram)/done/PSX_20250916_004344_edit_186590806941582.jpg", city: "San Cristóbal" },
  { src: "/pictures/handstands/5_Peru_Edited (for Instagram)/done/IMG_20250830_085306.jpg", city: "Cusco" },
  { src: "/pictures/handstands/5_Peru_Edited (for Instagram)/done/IMG_20250903_112032.jpg", city: "Machu Picchu" },
  { src: "/pictures/handstands/5_Peru_Edited (for Instagram)/done/PSX_20250916_130627_edit_208050374451707.jpg", city: "Lima" },
  { src: "/pictures/handstands/6_Bolivia_Edited (for Instagram)/done/IMG_20250829_124103_11544324828379.jpg", city: "Salar de Uyuni" },
  { src: "/pictures/handstands/6_Bolivia_Edited (for Instagram)/done/IMG_20250829_125021_12165673447493.jpg", city: "La Paz" },
  { src: "/pictures/handstands/6_Bolivia_Edited (for Instagram)/done/PSX_20250916_171438_edit_2337482549908.jpg", city: "Sucre" },
  { src: "/pictures/handstands/5_Peru_Edited (for Instagram)/done/PSX_20250916_134519_edit_210403005404155.jpg", city: "Huacachina" }
];

export default function Handstands() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // After script loads, if window.instgrm exists, process embeds
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      // Clean up script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const nextImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % GALLERY_IMAGES.length);
    }
  };

  const prevImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/handstand.jpg"
            alt="Handstand balance"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a]" />
        </div>

        <BackButton hoverColor="#70E000" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
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
            A collection of inverted perspectives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <motion.a
              href="https://www.instagram.com/rubioupsidedown/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest font-bold border-2 border-black brutal-shadow hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <Instagram size={20} />
              @rubioupsidedown
            </motion.a>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-24 px-6 relative z-10">

        {/* Instagram Post Collection - 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {INSTAGRAM_POSTS.map((url, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="w-full h-[600px] border border-white/10 bg-white/5 overflow-hidden flex justify-center backdrop-blur-sm"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{
                  background: "transparent",
                  border: "0",
                  borderRadius: "0",
                  boxShadow: "none",
                  margin: "1px",
                  maxWidth: "100%",
                  minWidth: "200px",
                  padding: "0",
                  width: "calc(100% - 2px)",
                }}
              >
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* Local Image Gallery */}
        <div className="space-y-32">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 3) * 0.15 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIdx(i)}
                className="group relative aspect-square overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
              >
                <img
                  src={img.src}
                  alt={`Handstand in ${img.city}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#70E000]">
                    {img.city}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={nextImage}
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
                src={GALLERY_IMAGES[selectedIdx].src}
                alt={GALLERY_IMAGES[selectedIdx].city}
                className="max-w-full max-h-[80vh] object-contain border border-white/10"
              />
              <div className="mt-8 text-center">
                <div className="font-display text-2xl uppercase tracking-tighter text-[#70E000]">
                  {GALLERY_IMAGES[selectedIdx].city}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 mt-2">
                  Archive No. {selectedIdx + 1}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
