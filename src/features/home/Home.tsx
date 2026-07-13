/**
 * Home page — the portfolio’s landing experience.
 *
 * Sections (top → bottom):
 *  1. **Hero** — Shuffled video carousel on desktop (AnimatePresence
 *     cross-fades between clips); static image fallback on mobile to
 *     save bandwidth. Click-to-skip advances the playlist.
 *  2. **Marquee** — Infinite horizontal scroll of sport thumbnails.
 *     Driven by useAnimationFrame + useMotionValue so the velocity
 *     is frame-rate-independent. Supports drag to scrub.
 *  3. **Quote** — Brand statement.
 *  4. **Disciplines grid** — SportCard components with lazy-color
 *     grayscale reveal, ordered via SPORT_REGISTRY.sortOrder.
 *  5. **Videos** — Full YouTube video gallery with sport filters.
 *
 * The HERO_VIDEOS array is shuffled on mount with Fisher-Yates to avoid
 * showing the same intro clip every visit. The sequence reshuffles again
 * once the last clip in the order finishes, creating an endless loop.
 */
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform, wrap } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import SportCard from "@/features/sports/components/SportCard";
import VideoSection from "@/components/media/VideoSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Timeline from "@/components/ui/Timeline";
import SportsSynergy from "@/components/ui/SportsSynergy";
import { SPORT_REGISTRY_SORTED } from "@/features/sports/config/registry";

interface HeroVideo {
  src: string;
  webm: string;
  location: string;
}

const HERO_VIDEOS: HeroVideo[] = [
  { src: "/videos/hero/home/home_snowboarding.mp4", webm: "/videos/hero/home/home_snowboarding.webm", location: "Saas-Fee, Switzerland" },
  { src: "/videos/hero/home/home_iceskating.mp4", webm: "/videos/hero/home/home_iceskating.webm", location: "Saas-Fee, Switzerland" },
  { src: "/videos/hero/home/home_skiing.mp4", webm: "/videos/hero/home/home_skiing.webm", location: "Saas-Fee, Switzerland" },
  { src: "/videos/hero/home/home_freediving.mp4", webm: "/videos/hero/home/home_freediving.webm", location: "Nusa Penida, Indonesia" },
  { src: "/videos/hero/home/home_pumpfoiling.mp4", webm: "/videos/hero/home/home_pumpfoiling.webm", location: "Lugano, Switzerland" },
  { src: "/videos/hero/home/home_weightlifting.mp4", webm: "/videos/hero/home/home_weightlifting.webm", location: "Garage, Switzerland" },
  { src: "/videos/hero/home/home_highlining.mp4", webm: "/videos/hero/home/home_highlining.webm", location: "Cusco, Peru" },
  { src: "/videos/hero/home/home_surfskating.mp4", webm: "/videos/hero/home/home_surfskating.webm", location: "Angresse, France" },
  { src: "/videos/hero/home/home_handstand.mp4", webm: "/videos/hero/home/home_handstand.webm", location: "Huilo-Huilo, Chile" },
  { src: "/videos/hero/home/home_handstand2.mp4", webm: "/videos/hero/home/home_handstand2.webm", location: "Rio de Janeiro, Brazil" },
  { src: "/videos/hero/home/home_aggr.mp4", webm: "/videos/hero/home/home_aggr.webm", location: "Cusco, Peru" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface HomeSportEntry {
  /** Must match the sport's SPORT_REGISTRY slug (also the route path) */
  slug: string;
  title: string;
  description: string;
  image: string;
  objectPosition: string;
  /** Route slug when it differs from `slug` (e.g. handstand → /handstands) */
  slug_override?: string;
}

const SPORTS: Array<HomeSportEntry & { link: string }> = ([
  {
    slug: "surfskating",
    title: "Surfskating<br/>Longboarding<br/>Pumptrack",
    description: "Carving the pavement like a wave. Master of balance and fluid generated speed.",
    image: "/images/body/surfskating/surfskating.jpg",
    objectPosition: "center",
  },
  {
    slug: "skiing",
    title: "Skiing",
    description: "Charging down alpine peaks. Technical precision meets pure speed in the mountains.",
    image: "/images/body/skiing/skiing.jpg",
    objectPosition: "center",
  },
  {
    slug: "snowboarding",
    title: "Snowboarding",
    description: "Carving through fresh powder. Technical precision meets absolute freedom on the mountain.",
    image: "/images/body/snowboarding/snowboard.jpg",
    objectPosition: "center",
  },
  {
    slug: "highlining",
    title: "Slacklining<br/>Highlining",
    description: "Finding stillness on a vibrating line. High-altitude focus and ground-level flow.",
    image: "/images/body/highlining/highlining.jpg",
    objectPosition: "center",
  },
  {
    slug: "freediving",
    title: "Freediving",
    description: "Exploring the ocean depths on a single breath. Pure silence and underwater peace.",
    image: "/images/body/freediving/freediving.jpg",
    objectPosition: "center",
  },
  {
    slug: "inlineskating",
    title: "Inline Skating<br/><span style=\"font-size: 0.55em\">(Freeskating, Aggressive, Wirzard)</span>",
    description: "Blading through the city streets. Speed, flow, and technical tricks on eight wheels.",
    image: "/images/body/inlineskating/freeskating.jpg",
    objectPosition: "center",
  },
  {
    slug: "iceskating",
    title: "Ice Skating",
    description: "Gliding on frozen surfaces. Precision edge-work and explosive power on the ice.",
    image: "/images/body/iceskating/iceskating.jpg",
    objectPosition: "center",
  },
  {
    slug: "calisthenics",
    title: "Calisthenics",
    description: "Mastering bodyweight strength. Static holds and dynamic explosive movements.",
    image: "/images/body/calisthenics/calisthenics.jpg",
    objectPosition: "center",
  },
  {
    slug: "handstand",
    title: "Handstand",
    description: "The peak of balance. Seeing the world from an inverted perspective.",
    image: "/images/body/handstands/handstand.jpg",
    objectPosition: "center",
    slug_override: "handstands"
  },
  {
    slug: "pumpfoiling",
    title: "Pumpfoiling",
    description: "Flying above the water's surface. Harnessing energy from the dock to the wave.",
    image: "/images/body/pumpfoiling/pumpfoiling.jpg",
    objectPosition: "center",
  },
  {
    slug: "weightlifting",
    title: "Weightlifting",
    description: "The pursuit of raw strength. Perfecting the Olympic lifts with power and grace.",
    image: "/images/body/weightlifting/weightlifting.jpg",
    objectPosition: "center",
  },
  {
    slug: "flowarts",
    title: "Flowarts<br/><span style=\"font-size: 0.55em\">(Juggling, Poi, Rope Jumping)</span>",
    description: "The hypnotic art of prop manipulation. Juggling, spinning, and moving in rhythm.",
    image: "/images/body/flowarts/flowarts.jpg",
    objectPosition: "center",
  },
  {
    slug: "mountaineering",
    title: "Mountaineering",
    description: "Ascending the world's most challenging peaks. A test of endurance, skill, and respect for the high alpine environment.",
    image: "/images/body/mountaineering/mountaineering.png",
    objectPosition: "center",
  },
  {
    slug: "viaferrata",
    title: "Via Ferrata",
    description: "Conquering vertical rock faces on 'iron paths'. A thrilling blend of hiking and climbing accessible through integrated steel cables and ladders.",
    image: "/images/body/viaferrata/viaferrata.jpg",
    objectPosition: "center",
  },
] satisfies HomeSportEntry[]).map(sport => ({
  ...sport,
  link: `/${sport.slug_override ?? sport.slug}`,
}));

const SORTED_SPORTS = [
  SPORTS.find((s) => s.slug === "handstand"),
  ...SPORT_REGISTRY_SORTED.map((entry) => SPORTS.find((sport) => sport.slug === entry.slug)),
].filter((sport): sport is (typeof SPORTS)[number] => Boolean(sport));

interface MarqueeItemData {
  img: string;
  link: string | null;
}

function MarqueeItem({ item }: { item: MarqueeItemData }) {
  const content = (
    <div className="w-48 h-32 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
      <ResponsiveImage
        src={`/images/${item.img}`}
        alt="Sport"
        sizes="192px"
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  return item.link ? (
    <Link to={item.link} className="shrink-0">{content}</Link>
  ) : (
    <div className="shrink-0">{content}</div>
  );
}

function Marquee() {
  const baseX = useMotionValue(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ultra-chill movement speed
  const baseVelocity = -0.01;

  // Update position every frame
  useAnimationFrame((_time, delta) => {
    const moveBy = baseVelocity * (delta / 16);
    baseX.set(baseX.get() + moveBy);
  });

  // Calculate the wrapping point based on content width
  // Since we duplicate the content, we wrap at 50%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const marqueeItems = useMemo(() => {
    const items: MarqueeItemData[] = [
      { img: "body/surfskating/surfskating.jpg", link: "/surfskating" },
      { img: "body/skiing/skiing.jpg", link: "/skiing" },
      { img: "body/snowboarding/snowboard.jpg", link: "/snowboarding" },
      { img: "body/highlining/highlining.jpg", link: "/highlining" },
      { img: "body/freediving/freediving.jpg", link: "/freediving" },
      { img: "body/inlineskating/freeskating.jpg", link: "/inlineskating" },
      { img: "body/iceskating/iceskating.jpg", link: "/iceskating" },
      { img: "body/calisthenics/calisthenics.jpg", link: "/calisthenics" },
      { img: "body/handstands/handstand.jpg", link: "/handstands" },
      { img: "body/pumpfoiling/pumpfoiling.jpg", link: "/pumpfoiling" },
      { img: "body/weightlifting/weightlifting.jpg", link: "/weightlifting" },
      { img: "body/flowarts/flowarts.jpg", link: "/flowarts" }
    ];
    // Fisher-Yates shuffle for randomness
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, []);

  return (
    <div className="home-marquee bg-black py-6 border-y-2 border-black overflow-hidden relative cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex items-center gap-6 px-3 w-fit"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(_event, info) => {
          // Precise 1:1 drag math. Since we wrap at -50% to 0%,
          // dragging the full width of one set (scrollRef.current.offsetWidth) 
          // should equal 50 units in the baseX coordinate system.
          const trackWidth = scrollRef.current?.offsetWidth || 1;
          const dragFactor = (info.delta.x / trackWidth) * 50;
          baseX.set(baseX.get() + dragFactor);
        }}
      >
        <div ref={scrollRef} className="flex gap-6">
          {marqueeItems.map((item, i) => (
            <MarqueeItem key={`i1-${i}`} item={item} />
          ))}
        </div>
        <div className="flex gap-6">
          {marqueeItems.map((item, i) => (
            <MarqueeItem key={`i2-${i}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [videoOrder, setVideoOrder] = useState<number[]>(() =>
    shuffleArray([...Array(HERO_VIDEOS.length).keys()])
  );
  const [orderIdx, setOrderIdx] = useState(0);
  const currentVideo = HERO_VIDEOS[videoOrder[orderIdx]];
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  // Ensure the hero carousel keeps looping indefinitely.
  // After the last clip in the current randomized sequence, reshuffle
  // and continue from the first clip again.
  const handleVideoEnd = () => {
    if (HERO_VIDEOS.length <= 1) return;

    const nextOrderIdx = orderIdx + 1;
    if (nextOrderIdx >= videoOrder.length) {
      const nextOrder = shuffleArray([...Array(HERO_VIDEOS.length).keys()]);
      setVideoOrder(nextOrder);
      setOrderIdx(0);
    } else {
      setOrderIdx(nextOrderIdx);
    }
  };

  useEffect(() => {
    const refresh = () => {
      setVideoOrder(shuffleArray([...Array(HERO_VIDEOS.length).keys()]));
      setOrderIdx(0);
    };

    document.addEventListener("home-refresh", refresh);
    return () => document.removeEventListener("home-refresh", refresh);
  }, []);

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleVideoEnd}
        className="home-hero relative pt-24 pb-12 px-6 overflow-hidden border-b-2 border-black flex items-start justify-start text-left group cursor-pointer"
      >
        {/* Background: Video playback only (desktop + mobile) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.video
              key={currentVideo.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onEnded={handleVideoEnd}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "saturate(1.05)" }}
            >
              <source src={currentVideo.webm} type="video/webm" />
              <source src={currentVideo.src} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 z-10 transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)",
              backdropFilter: isHovered
                ? "grayscale(0) brightness(1) contrast(1) blur(0px) saturate(1.5)"
                : "grayscale(1) brightness(0.6) contrast(1.2) blur(1px) saturate(1.3)"
            }}
          />

        <div className="w-full mx-0 px-4 sm:px-6 lg:px-8 relative z-10 text-white flex flex-col items-start justify-start text-left min-h-full">
          <div className="relative mt-12 text-left">
            <motion.h1
              className="hero-title text-[10vw] md:text-[8vw] leading-[0.75] uppercase tracking-tight text-left"
              style={{ textAlign: "left" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="overflow-hidden"
              >
                <div>WHAT <span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>DO</span></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="overflow-hidden"
              >
                <div><span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>YOU WANT</span></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="overflow-hidden"
              >
                <div><span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>TO</span> LEARN</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="overflow-hidden"
              >
                <div>NEXT?</div>
              </motion.div>
            </motion.h1>
          </div>
          <div className="absolute bottom-0 right-2 z-20 bg-black/70 text-white text-[9px] md:text-[10px] px-1 py-0.5 rounded-md font-mono uppercase tracking-[0.1em]">
            {currentVideo.location}
          </div>
        </div>
      </header>

      <Marquee />

      {/* New Cinematic Quote Section */}
      <section className="py-32 px-6 flex items-center justify-center bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl text-center"
        >
          <p className="text-[clamp(0.85rem,5vw,1.4rem)] md:text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-relaxed italic text-black/80 whitespace-pre-line">
            "{t("home.quote")}"
            <br />
            {t("home.quoteAuthor")}
          </p>
        </motion.div>
      </section>

      <section id="sports" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-start md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="font-display w-full text-left text-[clamp(2.5rem,8vw,4.5rem)] md:text-[clamp(3.5rem,7vw,6.5rem)] uppercase leading-[0.8] tracking-tighter">
            The <br /> <span className="text-outline">Disciplines</span>
          </h2>
          <div className="max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60">
            {t("home.disciplinesDescription")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SORTED_SPORTS.map((sport, idx) => (
            <div key={sport.slug}>
              <SportCard
                title={sport.title}
                description={sport.description}
                image={sport.image}
                index={idx}
                objectPosition={sport.objectPosition}
                link={sport.link}
              />
            </div>
          ))}
        </div>
      </section>

      <div id="videos">
        <VideoSection />
      </div>

      <AboutSection />

      <section className="bg-gallery-white px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <Timeline />
        </div>
      </section>

      <SportsSynergy />

      <ContactSection />
    </>
  );
}
