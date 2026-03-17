import { motion } from "motion/react";
import { ArrowLeft, Zap, Dumbbell, Target } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Calisthenics() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Industrial Aesthetic */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-strength {
          0%, 100% { border-color: rgba(251, 133, 0, 0.2); box-shadow: 0 0 0 rgba(251, 133, 0, 0); }
          50% { border-color: rgba(251, 133, 0, 0.6); box-shadow: 0 0 20px rgba(251, 133, 0, 0.1); }
        }
        .anim-scan { animation: scanline 8s linear infinite; }
        .anim-strength { animation: pulse-strength 3s ease-in-out infinite; }
      `}</style>

      {/* Ambient Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fb850005] to-transparent anim-scan" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/calisthenics.JPG"
            alt="Calisthenics static hold"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#0a0a0a]" />
        </div>

        <BackButton hoverColor="#FB8500" isDark />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block p-4 border border-[#FB8500]/30 mb-8 anim-strength"
          >
            <Dumbbell className="text-[#FB8500]" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[12vw] md:text-[8vw] uppercase leading-none tracking-tighter"
          >
            Cali<span className="text-[#FB8500] text-outline" style={{ WebkitTextStroke: "1px #FB8500" }}>sthenics</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-[#bef264]/40" />
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-white/40">Body Mastered</p>
            <div className="h-px w-12 bg-[#bef264]/40" />
          </motion.div>
        </div>
      </section>

      {/* Strength & Form Section */}
      <section className="py-32 px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-1 hidden lg:block h-full">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-[#FB8500]/20 to-transparent mx-auto" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter italic">
              The <span className="text-[#FB8500]">Human</span> Machine
            </h2>
            <div className="space-y-6 text-xl text-white/70 leading-relaxed font-light">
              <p>
                Calisthenics is about the pure potential of the human body. Using only bodyweight,
                it's a pursuit of strength, flexibility, and absolute control.
              </p>
              <p>
                From the stillness of a static hold to the explosive power of a muscle-up,
                every movement is a testament to the connection between mind and muscle.
                Mastering the geometry of movement.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative border border-white/10 p-4 bg-white/5"
          >
            <img src="/pictures/calisthenics.JPG" alt="Strength Hold" className="w-full grayscale brightness-75 transition-all hover:grayscale-0" />
            <div className="absolute top-8 right-8 text-[#FB8500] flex flex-col items-center">
              <BackButton hoverColor="#FB8500" isDark />
              <span className="font-mono text-[10px] uppercase tracking-widest mt-2">Targeted</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs Grid */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { tag: "01", title: "Static", desc: "Isometric holds focusing on total body tension." },
            { tag: "02", title: "Dynamic", desc: "Explosive movements utilizing leverage and power." },
            { tag: "03", title: "Core", desc: "The foundation of all bodyweight mastery." },
            { tag: "04", title: "Flex", desc: "Mobility as the key to unlocking advanced holds." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/10 hover:border-[#FB8500]/40 transition-colors group relative"
            >
              <span className="font-mono text-[10px] text-[#FB8500] opacity-40 mb-4 block">{item.tag}</span>
              <h3 className="font-display text-2xl uppercase tracking-tight mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className="text-[#FB8500]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Link */}
      <footer className="py-32 text-center">
        <Link
          to="/#sports"
          className="font-display text-6xl md:text-[6vw] uppercase tracking-tighter hover:text-[#FB8500] transition-colors"
        >
          Back to <span className="text-outline" style={{ WebkitTextStroke: "1px white" }}>Training</span>
        </Link>
      </footer>
    </div>
  );
}
