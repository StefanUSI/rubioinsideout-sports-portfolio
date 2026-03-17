import { motion } from "motion/react";
import { ArrowLeft, Zap, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Freeskating() {
  return (
    <div className="bg-[#1a1c1e] text-white min-h-screen overflow-hidden">
      {/* Scoped street animations */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitched {
          0% { clip: rect(44px, 450px, 56px, 0); }
          5% { clip: rect(62px, 450px, 76px, 0); }
          10% { clip: rect(34px, 450px, 42px, 0); }
          15% { clip: rect(44px, 450px, 56px, 0); }
        }
        .anim-scanline { animation: scanline 8s linear infinite; }
        .anim-glitch { animation: glitched 4s linear infinite; }
        .street-gradient {
          background: linear-gradient(180deg, rgba(26,28,30,0) 0%, rgba(26,28,30,0.8) 70%, rgba(26,28,30,1) 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/freeskating2.jpg"
            alt="Freeskating jump"
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 street-gradient" />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          <div className="anim-scanline absolute inset-x-0 top-0 h-1 bg-white" />
        </div>

        {/* Back button */}
        <BackButton hoverColor="#6C757D" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Zap className="mx-auto mb-6 text-[#6C757D]" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter italic"
          >
            Free<span className="text-[#6C757D]">skating</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-white/70 font-mono uppercase tracking-widest max-w-xl mx-auto"
          >
            Speed. Flow. Urban exploration.
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative bg-[#1a1c1e] py-24 px-6 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter italic mb-4">
              Global <span className="text-[#6C757D]">Sessions</span>
            </h2>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
              Cities reclaimed on eight wheels
            </p>
          </motion.div>

          <div className="relative aspect-[2/1] bg-white/5 border border-white/10 p-4 md:p-8 rounded-sm overflow-hidden">
            {/* World Map with Country Borders */}
            <svg viewBox="0 0 1000 500" className="w-full h-full text-white/10 fill-none stroke-current stroke-[0.5] overflow-visible">
              {/* North America / Central America */}
              <path d="M100,100 L120,80 L140,90 L160,70 L180,85 L200,75 L220,100 L210,120 L230,140 L220,160 L200,150 L180,170 L160,160 L140,180 L120,170 L100,150 Z" />
              <path d="M220,160 L240,150 L260,170 L250,190 L230,180 Z" />
              {/* South America */}
              <path d="M260,190 L280,210 L310,230 L320,270 L300,310 L280,340 L250,320 L230,280 L240,240 L260,190" />
              <path d="M280,210 L300,200 L330,210 L350,230 L340,260 L320,270" />
              <path d="M320,270 L340,280 L330,310 L300,310" />
              <path d="M300,310 L310,340 L290,360 L270,350 L280,340" />
              {/* Europe */}
              <path d="M450,110 L470,100 L490,110 L510,100 L530,115 L520,135 L500,145 L480,140 L460,130 Z" />
              <path d="M470,100 L480,90 L500,85 L520,95 L530,115" />
              <path d="M530,115 L550,120 L560,140 L540,160 L520,150 L520,135" />
              <path d="M460,130 L450,150 L470,160 L485,145" />
              {/* Africa */}
              <path d="M450,160 L480,165 L510,185 L530,210 L520,250 L500,280 L470,300 L440,280 L420,240 L430,210 L450,160" />
              <path d="M480,165 L520,155 L550,170 L560,200 L530,210" />
              <path d="M530,210 L570,225 L580,260 L560,290 L520,310 L500,280" />
              <path d="M500,280 L520,350 L500,380 L480,360 L470,300" />
              {/* Middle East & Central Asia */}
              <path d="M560,140 L590,145 L620,165 L640,200 L620,230 L580,220 L560,180 Z" />
              <path d="M620,165 L660,160 L690,180 L700,210 L680,230 L640,200" />
              {/* Asia */}
              <path d="M690,180 L730,175 L770,190 L800,220 L810,260 L790,300 L750,320 L720,310 L700,260 Z" />
              <path d="M720,310 L750,350 L780,360 L770,390 L730,380 L710,340 Z" />
              <path d="M770,190 L810,185 L840,205 L850,240 L830,260 L800,220" />
              <path d="M850,240 L890,250 L910,290 L890,330 L850,320 L830,260" />
              <path d="M810,310 L840,340 L830,370 L800,360 Z" />
              <path d="M700,260 L680,280 L700,310 L720,310" />
              {/* Oceania */}
              <path d="M800,400 L840,390 L870,410 L880,440 L850,470 L810,460 L790,430 Z" />
              <path d="M890,460 L910,450 L920,470 L900,480 Z" />
            </svg>

            {/* Note: In a production environment, use a GeoJSON powered library like react-simple-maps.
                This is a hand-sketched stylistic SVG with country-like borders for this specific aesthetic. */}

            {/* Markers */}
            {[
              { name: "Barcelona", x: 475, y: 140 },
              { name: "Berlin", x: 495, y: 110 },
              { name: "Paris", x: 485, y: 125 },
              { name: "London", x: 478, y: 115 },
              { name: "Medellin", x: 235, y: 185 },
              { name: "Quito", x: 235, y: 205 },
              { name: "Buenos Aires", x: 275, y: 335 },
              { name: "Rio de Janeiro", x: 325, y: 285 },
              { name: "Guayaquil", x: 225, y: 215 },
              { name: "Oaxaca", x: 185, y: 165 },
              { name: "Kuala Lumpur", x: 730, y: 340 },
              { name: "Doha", x: 615, y: 205 },
            ].map((city, idx) => (
              <motion.div
                key={city.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + idx * 0.05
                }}
                className="absolute group"
                style={{
                  left: `${(city.x / 1000) * 100}%`,
                  top: `${(city.y / 500) * 100}%`
                }}
              >
                {/* Ping animation effect */}
                <div className="absolute -inset-2 bg-[#6C757D]/20 rounded-full animate-ping group-hover:bg-[#6C757D]/40" />

                {/* Actual dot */}
                <div className="relative w-2 h-2 md:w-3 md:h-3 bg-[#6C757D] rounded-full border-2 border-[#1a1c1e] shadow-lg shadow-[#6C757D]/20" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-[10px] md:text-xs font-mono uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 border border-white/10">
                  {city.name}
                </div>
              </motion.div>
            ))}

            {/* Map Legend (Bottom Right) */}
            <div className="absolute bottom-4 left-4 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/30 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6C757D] rounded-full" />
                <span>Skate Session Recorded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-[#1a1c1e] py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              The <span className="text-[#6C757D]">Flow</span> of the city
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light">
              <p>
                Freeskating is about reclaiming the urban landscape. Where others see obstacles —
                stairs, curbs, gaps — we see opportunities for flow. It's the perfect blend of
                speed, agility, and creativity.
              </p>
              <p>
                Carving through the streets at night, picking lines through the concrete jungle,
                feeling the rough asphalt beneath your feet transform into a smooth canvas.
                Everything becomes a possibility when you're on eight wheels.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="border-2 border-white/20 p-8 relative">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Wind size={40} />
              </div>
              <h3 className="font-display text-3xl uppercase tracking-tighter mb-4 text-[#6C757D] italic">
                Urban Explorer
              </h3>
              <p className="text-white/60 mb-6 font-mono text-sm leading-relaxed">
                TECHNICAL DATA: 4x80mm | Hard Shell | Freestyle Frame
              </p>
              <p className="text-white/80 leading-relaxed italic">
                "It's not just about getting from A to B. It's about how you navigate the space
                between. The city is our playground, and every street tells a different story."
              </p>
              {/* Decorative corner */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-2 border-r-2 border-[#6C757D]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer link */}
      <section className="bg-[#1a1c1e] pb-20 px-6 text-center">
        <Link
          to="/#sports"
          className="inline-flex items-center gap-3 text-white/30 hover:text-[#6C757D] transition-colors font-mono text-xs uppercase tracking-[0.4em]"
        >
          <ArrowLeft size={14} />
          Back to all sports
        </Link>
      </section>
    </div>
  );
}
