import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useTransform } from "motion/react";
import { wrap } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SportCard from "../components/SportCard";
import VideoSection from "../components/VideoSection";

const HERO_VIDEOS = [
  "/videos/1snowboard.mp4",
  "/videos/HnVideoEditor_2026_03_07_194730766.mp4",
  "/videos/2highlining.mp4",
  "/videos/Snowboard1.mp4",
  "/videos/Snowboard2.mp4",
];

const LEGACY_ROUTES: Record<string, string> = {
  "freediving": "/freediving",
  "freeskating": "/freeskating",
  "snowboarding": "/snowboarding",
  "handstands": "/handstands",
  "surfskating": "/surfskating",
  "skiing": "/skiing",
  "highlining": "/highlining",
  "iceskating": "/iceskating",
  "calisthenics": "/calisthenics",
  "pumpfoiling": "/pumpfoiling",
  "weightlifting": "/weightlifting",
  "flowarts": "/flowarts",
  "mountaineering": "/mountaineering",
  "via-ferrata": "/viaferrata"
};

const SPORTS = [
  {
    slug: "surfskating",
    title: "Surfskating",
    description: "Carving the pavement like a wave. Master of balance and fluid generated speed.",
    image: "/pictures/surfskating.JPG",
    objectPosition: "center",
  },
  {
    slug: "skiing",
    title: "Skiing",
    description: "Charging down alpine peaks. Technical precision meets pure speed in the mountains.",
    image: "/pictures/skiing.JPG",
    objectPosition: "center",
  },
  {
    slug: "snowboarding",
    title: "Snowboarding",
    description: "Carving through fresh powder. Technical precision meets absolute freedom on the mountain.",
    image: "/pictures/snowboard.jpg",
    objectPosition: "center",
  },
  {
    slug: "highlining",
    title: "Slacklining<br/>Highlining",
    description: "Finding stillness on a vibrating line. High-altitude focus and ground-level flow.",
    image: "/pictures/highlining.jpg",
    objectPosition: "center",
  },
  {
    slug: "freediving",
    title: "Freediving",
    description: "Exploring the ocean depths on a single breath. Pure silence and underwater peace.",
    image: "/pictures/freediving.jpg",
    objectPosition: "center",
  },
  {
    slug: "freeskating",
    title: "Freeskating",
    description: "Blading through the city streets. Speed, flow, and technical tricks on eight wheels.",
    image: "/pictures/freeskating2.jpg",
    objectPosition: "center",
  },
  {
    slug: "iceskating",
    title: "Ice Skating",
    description: "Gliding on frozen surfaces. Precision edge-work and explosive power on the ice.",
    image: "/pictures/iceskating.jpg",
    objectPosition: "center",
  },
  {
    slug: "calisthenics",
    title: "Calisthenics",
    description: "Mastering bodyweight strength. Static holds and dynamic explosive movements.",
    image: "/pictures/calisthenics.JPG",
    objectPosition: "center",
  },
  {
    slug: "handstand",
    title: "Handstand",
    description: "The peak of balance. Seeing the world from an inverted perspective.",
    image: "/pictures/handstand.jpg",
    objectPosition: "center",
    slug_override: "handstands"
  },
  {
    slug: "pumpfoiling",
    title: "Pumpfoiling",
    description: "Flying above the water's surface. Harnessing energy from the dock to the wave.",
    image: "/pictures/pumpfoiling.jpg",
    objectPosition: "center",
  },
  {
    slug: "weightlifting",
    title: "Weightlifting",
    description: "The pursuit of raw strength. Perfecting the Olympic lifts with power and grace.",
    image: "/pictures/weightlifting.jpg",
    objectPosition: "center",
  },
  {
    slug: "flowarts",
    title: "Flowarts",
    description: "The hypnotic art of prop manipulation. Juggling, spinning, and moving in rhythm.",
    image: "/pictures/flowarts.jpg",
    objectPosition: "center",
  },
  {
    slug: "mountaineering",
    title: "Mountaineering",
    description: "Ascending the world's most challenging peaks. A test of endurance, skill, and respect for the high alpine environment.",
    image: "/pictures/mountaineering_discipline.png",
    objectPosition: "center",
  },
  {
    slug: "via-ferrata",
    title: "Via Ferrata",
    description: "Conquering vertical rock faces on 'iron paths'. A thrilling blend of hiking and climbing accessible through integrated steel cables and ladders.",
    image: "/pictures/via_ferrata_discipline.png",
    objectPosition: "center",
  },
].map(sport => ({
  ...sport,
  link: LEGACY_ROUTES[(sport as any).slug_override || sport.slug]
}));

interface MarqueeItemData {
  img: string;
  link: string | null;
}

function MarqueeItem({ item }: { item: MarqueeItemData; key?: React.Key }) {
  const content = (
    <div className="w-48 h-32 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
      <img
        src={`/pictures/${item.img}`}
        alt="Sport"
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
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
  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16);
    baseX.set(baseX.get() + moveBy);
  });

  // Calculate the wrapping point based on content width
  // Since we duplicate the content, we wrap at 50%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const marqueeItems = useMemo(() => {
    const items: MarqueeItemData[] = [
      { img: "surfskating.JPG", link: "/surfskating" },
      { img: "skiing.JPG", link: "/skiing" },
      { img: "snowboard.jpg", link: "/snowboarding" },
      { img: "highlining.jpg", link: "/highlining" },
      { img: "freediving.jpg", link: "/freediving" },
      { img: "freeskating2.jpg", link: "/freeskating" },
      { img: "iceskating.jpg", link: "/iceskating" },
      { img: "calisthenics.JPG", link: "/calisthenics" },
      { img: "handstand.jpg", link: "/handstands" },
      { img: "pumpfoiling.jpg", link: "/pumpfoiling" },
      { img: "weightlifting.jpg", link: "/weightlifting" },
      { img: "flowarts.jpg", link: "/flowarts" }
    ];
    // Fisher-Yates shuffle for randomness
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, []);

  return (
    <div className="bg-black py-6 border-y-2 border-black overflow-hidden relative cursor-grab active:cursor-grabbing">
      <motion.div
        className="flex items-center gap-6 px-3 w-fit"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(e, info) => {
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
  const [currentVideoIdx, setCurrentVideoIdx] = useState(() => 
    Math.floor(Math.random() * HERO_VIDEOS.length)
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleVideoEnd = () => {
    if (HERO_VIDEOS.length <= 1) return;
    
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * HERO_VIDEOS.length);
    } while (nextIdx === currentVideoIdx);
    
    setCurrentVideoIdx(nextIdx);
  };

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleVideoEnd}
        className="relative pt-24 pb-12 px-6 overflow-hidden border-b-2 border-black h-[85vh] flex items-start group cursor-pointer"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.video
              key={HERO_VIDEOS[currentVideoIdx]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={HERO_VIDEOS[currentVideoIdx]} type="video/mp4" />
            </motion.video>
          </AnimatePresence>

          {/* Hover Overlay: Removes grayscale and brightening when hovered */}
          <div
            className="absolute inset-0 z-10 transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)",
              backdropFilter: isHovered
                ? "grayscale(0) brightness(1) contrast(1) blur(0px)"
                : "grayscale(1) brightness(0.6) contrast(1.2) blur(1px)"
            }}
          />
        </div>

        <div className="container mx-auto relative z-10 text-white flex flex-col items-start min-h-full">
          <div className="relative mt-12">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-[10vw] md:text-[8vw] leading-[0.75] uppercase tracking-tighter"
            >
              <div>WHAT <span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>DO</span></div>
              <div><span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>YOU WANT</span></div>
              <div><span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>TO</span> LEARN</div>
              <div>NEXT?</div>
            </motion.h1>
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
          <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-black/80">
            "Exploring the intersection of balance, gravity, and adrenaline.
            Documenting the journey from the streets to the mountains."
          </p>
        </motion.div>
      </section>

      <section id="sports" className="py-24 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="font-display text-7xl md:text-9xl uppercase leading-[0.8] tracking-tighter">
            The <br /> <span className="text-outline">Disciplines</span>
          </h2>
          <div className="max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60">
            Mastering balance across multiple terrains. Each sport brings a unique perspective on movement and flow.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPORTS.map((sport, idx) => (
            <div key={idx}>
              <SportCard
                title={sport.title}
                description={sport.description}
                image={sport.image}
                index={idx}
                objectPosition={(sport as any).objectPosition}
                link={(sport as any).link}
              />
            </div>
          ))}
        </div>
      </section>

      <div id="videos">
        <VideoSection />
      </div>
    </>
  );
}
