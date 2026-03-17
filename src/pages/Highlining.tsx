import { motion } from "motion/react";
import { ArrowLeft, Compass, Eye, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Highlining() {
  return (
    <div className="bg-[#B8C5D6] text-black min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Line Vibration */}
      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-0.5px); }
          75% { transform: translateY(0.5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; scale: 1; }
          50% { opacity: 0.2; scale: 1.05; }
        }
        .anim-vibrate { animation: vibrate 0.1s linear infinite; }
        .anim-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}</style>

      <BackButton hoverColor="#000000" />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6">
        {/* Ambient Ring */}
        <div className="absolute w-[80vh] h-[80vh] border border-black/5 rounded-full anim-pulse-slow pointer-events-none" />

        {/* Background Image - Centered and Scale focus */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img src="/pictures/highlining.jpg" alt="Highlining" className="w-full h-full object-cover grayscale" />
        </motion.div>

        <div className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-12 h-px bg-black mx-auto mb-8 anim-vibrate" />
            <p className="font-mono text-xs uppercase tracking-[0.6em] opacity-40">The Art of Balance</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[12vw] md:text-[8vw] uppercase leading-none tracking-tighter"
          >
            High<br /><span className="text-outline">lining</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-sm mx-auto pt-8 border-t border-black/10"
          >
            <p className="font-medium text-lg leading-relaxed italic opacity-70">
              Finding stillness on a vibrating line. High-altitude focus and ground-level flow.
            </p>
          </motion.div>
        </div>

        {/* Vertical Line UI */}
        <div className="absolute right-12 h-64 w-px bg-gradient-to-b from-transparent via-black/20 to-transparent bottom-12" />
        <div className="absolute right-12 bottom-12 translate-x-1/2 font-mono text-[10px] uppercase tracking-widest vertical-rl rotate-180 opacity-20">
          Suspended Space
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 container mx-auto bg-black text-white relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              Mental <span className="text-outline text-white" style={{ WebkitTextStroke: "1px white" }}>Gravity</span>
            </h2>
            <div className="space-y-6 text-xl text-white/70 leading-relaxed font-light">
              <p>
                Highlining is as much a mental challenge as a physical one. Suspended hundreds
                of meters above the ground, the world narrows down to one inch of webbing
                and your own breath.
              </p>
              <p>
                Every vibration of the line is a reflection of your own internal state. To
                walk is to find absolute quiet amidst the exposure. It's the ultimate pursuit
                of focus in a world of constant motion.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 border border-white/10 flex flex-col gap-8"
          >
            <div className="flex items-start gap-6">
              <Compass className="text-white shrink-0" size={24} />
              <div>
                <h3 className="font-display text-xl uppercase mb-2">Exposure</h3>
                <p className="text-white/40 text-sm">Managing the biological fear response in extreme environments.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <Eye className="text-white shrink-0" size={24} />
              <div>
                <h3 className="font-display text-xl uppercase mb-2">Focus</h3>
                <p className="text-white/40 text-sm">Developing the 'one-point' concentration required for the walk.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <ShieldCheck className="text-white shrink-0" size={24} />
              <div>
                <h3 className="font-display text-xl uppercase mb-2">Rigging</h3>
                <p className="text-white/40 text-sm">Deep understanding of anchor systems and backup protocols.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-40 bg-[#B8C5D6] text-center">
        <Link
          to="/#sports"
          className="font-display text-4xl md:text-6xl uppercase tracking-tighter hover:opacity-50 transition-opacity"
        >
          Return to All <span className="text-outline">Disciplines</span>
        </Link>
      </section>
    </div>
  );
}
