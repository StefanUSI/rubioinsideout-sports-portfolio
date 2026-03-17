import { motion } from "motion/react";
import { ArrowLeft, Zap, Dumbbell, Award } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Weightlifting() {
  return (
    <div className="bg-[#111] text-white min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Heavy Impact */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
          20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
        }
        @keyframes glow-red {
          0%, 100% { box-shadow: 0 0 5px rgba(230, 57, 70, 0.2); }
          50% { box-shadow: 0 0 20px rgba(230, 57, 70, 0.5); }
        }
        .anim-shake { animation: shake 0.5s ease-in-out infinite; }
        .anim-glow { animation: glow-red 2s infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/weightlifting.jpg"
            alt="Weightlifting snatch"
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </div>

        <BackButton hoverColor="#e63946" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block p-4 border-2 border-[#e63946] mb-8 anim-glow"
          >
            <Dumbbell className="text-[#e63946]" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Weight<span className="text-[#e63946]">lifting</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-white/50 font-mono uppercase tracking-[0.5em] max-w-xl mx-auto"
          >
            Raw Power. Perfect Form.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="relative bg-[#0a0a0a] py-32 md:py-48 px-6 border-y-2 border-[#e63946]/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-12">
              The <span className="text-[#e63946] text-outline" style={{ WebkitTextStroke: "1px #e63946" }}>Iron</span> <br /> Ritual
            </h2>
            <div className="space-y-8 text-xl text-white/70 leading-relaxed font-light border-l-4 border-[#e63946] pl-8">
              <p>
                Weightlifting is the ultimate test of power, speed, and technique. Every lift—the
                Snatch and the Clean & Jerk—is a split-second combination of absolute violence
                and perfect control.
              </p>
              <p>
                It is the pursuit of maximum efficiency under extreme load. In the gym, it's
                just you and the iron, refining the movement until the heavy becomes weightless.
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
            <div className="aspect-[4/5] border border-white/10 overflow-hidden brutal-shadow shadow-red-900/20">
              <img
                src="/pictures/weightlifting.jpg"
                alt="Olympic Lift"
                className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              />
            </div>
            {/* Design accents */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#e63946]/30" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#e63946]/30" />
          </motion.div>
        </div>
      </section>

      {/* Performance Grid */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Power", icon: Zap, desc: "Explosive triple extension to drive the bar vertically." },
            { title: "Precision", icon: Award, desc: "Perfect footwork and bar path trajectory." },
            { title: "Strength", icon: Dumbbell, desc: "Foundational force required to stabilize massive loads." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border-2 border-white/5 bg-white/5 hover:border-[#e63946]/40 transition-all group"
            >
              <item.icon className="text-[#e63946] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-3xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-40 text-center border-t border-white/5 bg-[#0a0a0a]">
        <Link
          to="/#sports"
          className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#e63946] transition-all duration-500"
        >
          Return to <span className="text-outline" style={{ WebkitTextStroke: "1px white" }}>The Arena</span>
        </Link>
      </section>
    </div>
  );
}
