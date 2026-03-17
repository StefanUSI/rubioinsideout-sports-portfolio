import { motion } from "motion/react";
import { ArrowLeft, Mountain, ShieldCheck, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function ViaFerrata() {
  return (
    <div className="bg-[#1c1917] text-[#e7e5e4] min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Vertical Rungs */}
      <style>{`
        @keyframes vertical-rung {
          0% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-5px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 0.2; }
        }
        .rung-line {
          width: 24px;
          height: 2px;
          background: #e7e5e4;
          opacity: 0.2;
          margin-bottom: 20px;
          animation: vertical-rung 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/via_ferrata_discipline.png"
            alt="Via Ferrata iron rungs"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1917] via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <BackButton hoverColor="#FFBE0B" isDark />

        {/* Vertical rungs decorative UI */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rung-line" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <ShieldCheck className="mx-auto text-[#FFBE0B]" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Via<br /><span className="text-[#FFBE0B] italic">Ferrata</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-stone-400 font-mono uppercase tracking-[0.5em] max-w-xl mx-auto"
          >
            The Iron Road. Vertical Freedom.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-48 bg-[#1c1917] px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              Paths of <br /> <span className="text-[#FFBE0B] text-outline" style={{ WebkitTextStroke: "1px #FFBE0B" }}>Iron</span>
            </h2>
            <div className="space-y-6 text-xl text-[#e7e5e4]/70 leading-relaxed font-light">
              <p>
                Via Ferrata offers an accessible way to experience the thrill of vertical rock faces.
                Using steel cables, rungs, and ladders, these "iron paths" allow hikers to ascend
                massive cliffs safely.
              </p>
              <p>
                It is a unique blend of hiking and climbing that rewards you with extraordinary
                exposure and views that were once reserved for elite alpinists.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-auto border-2 border-stone-700 brutal-shadow overflow-hidden"
          >
            <img src="/pictures/via_ferrata_discipline.png" alt="Vertical Climb" className="w-full grayscale brightness-75 transition-all hover:grayscale-0" />
          </motion.div>
        </div>
      </section>

      {/* Grid Highlights */}
      <section className="py-24 px-6 border-y border-stone-800 bg-stone-900/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Iron Cables", icon: ShieldCheck, desc: "A continuous lifeline of steel cables providing safety throughout the ascent." },
            { title: "Verticality", icon: Mountain, desc: "Experiencing significant height and vertical exposure with technical assistance." },
            { title: "Accessibility", icon: Compass, desc: "Unlocking extraordinary alpine environments for broad physical abilities." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-stone-800 bg-stone-900/50 hover:bg-stone-800/80 transition-colors"
            >
              <item.icon className="text-[#FFBE0B] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-40 text-center bg-[#1c1917]">
        <Link
          to="/#sports"
          className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#FFBE0B] transition-colors"
        >
          Return to <span className="text-outline">Valley Floor</span>
        </Link>
      </section>
    </div>
  );
}
