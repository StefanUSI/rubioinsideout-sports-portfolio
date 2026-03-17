import { motion } from "motion/react";
import { ArrowLeft, Mountain, Compass, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Mountaineering() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Atmospheric Haze */}
      <style>{`
        @keyframes drift-haze {
          0% { transform: translateX(-10%) translateY(0); opacity: 0.1; }
          50% { transform: translateX(10%) translateY(-10px); opacity: 0.3; }
          100% { transform: translateX(-10%) translateY(0); opacity: 0.1; }
        }
        .haze-cloud {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(40px);
        }
      `}</style>

      {/* Atmospheric Haze elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="haze-cloud"
            style={{
              top: Math.random() * 80 + "%",
              left: Math.random() * 80 + "%",
              width: Math.random() * 500 + 300 + "px",
              height: Math.random() * 300 + 200 + "px",
              animation: `drift-haze ${Math.random() * 15 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/mountaineering_discipline.png"
            alt="Mountaineering summit"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/60 to-[#0f172a]" />
        </div>

        {/* Back button */}
        <BackButton hoverColor="#8D6E63" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Mountain className="mx-auto text-[#8D6E63]" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Mountai<span className="text-[#8D6E63]">neering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-white/50 font-mono uppercase tracking-[0.5em] max-w-xl mx-auto"
          >
            Respect the Peaks. Elevate your Soul.
          </motion.p>
        </div>

        {/* Vertical UI element */}
        <div className="absolute right-12 bottom-12 h-64 w-px bg-gradient-to-t from-white/20 to-transparent" />
        <div className="absolute right-12 bottom-12 translate-x-1/2 font-mono text-[10px] uppercase tracking-widest vertical-rl rotate-180 opacity-20">
          Summit Push
        </div>
      </section>

      {/* Resilience Section */}
      <section className="relative py-24 md:py-48 px-6 container mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter italic">
              Above the <br /> <span className="text-white text-outline" style={{ WebkitTextStroke: "1px white" }}>Clouds</span>
            </h2>
            <div className="space-y-8 text-white/70 text-xl leading-relaxed font-light border-l-2 border-slate-500/30 pl-8">
              <p>
                Mountaineering is the pursuit of high places. It demands endurance, technical skill,
                and a deep respect for the high alpine environment.
              </p>
              <p>
                It is as much about the journey as it is about reaching the summit. Navigating
                crevasses, resisting the cold, and finding resilience when the air starts to
                thin. This is where the world is both most beautiful and most indifferent.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] border border-white/10 overflow-hidden brutal-shadow shadow-slate-900/40">
              <img
                src="/pictures/mountaineering_discipline.png"
                alt="High Alpine"
                className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Endurance", icon: Compass, desc: "Sustained physical effort over multiple days in high-altitude terrain." },
            { title: "Risk Mastery", icon: ShieldCheck, desc: "Deep understanding of weather patterns, snow stability, and self-rescue." },
            { title: "Alpine Skills", icon: Mountain, desc: "Technical proficiency in ice climbing, rope work, and glacier travel." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <item.icon className="text-[#8D6E63] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Link */}
      <section className="py-40 text-center bg-[#0f172a]">
        <Link
          to="/#sports"
          className="font-display text-[10vw] md:text-[6vw] uppercase tracking-tighter hover:text-[#8D6E63] transition-colors"
        >
          Return to <span className="text-outline" style={{ WebkitTextStroke: "1px white" }}>Lower Ground</span>
        </Link>
      </section>
    </div>
  );
}
