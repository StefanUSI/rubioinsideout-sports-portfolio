import { motion } from "motion/react";
import { ArrowLeft, Award, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Freediving() {
  return (
    <div className="bg-[#001830] text-white min-h-screen overflow-hidden">
      {/* Scoped water animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.08); opacity: 0.25; }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-120vh) scale(0.3); opacity: 0; }
        }
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-float-delay { animation: float 8s ease-in-out 2s infinite; }
        .anim-bubble { animation: bubble 12s ease-in infinite; }
        .anim-bubble-2 { animation: bubble 16s ease-in 4s infinite; }
        .anim-bubble-3 { animation: bubble 10s ease-in 7s infinite; }
        .anim-wave { animation: wave-slow 18s linear infinite; }
      `}</style>

      {/* Ambient bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="anim-bubble absolute bottom-0 left-[15%] w-3 h-3 rounded-full bg-[#0077B6]/30" />
        <div className="anim-bubble-2 absolute bottom-0 left-[45%] w-2 h-2 rounded-full bg-[#0077B6]/20" />
        <div className="anim-bubble-3 absolute bottom-0 left-[75%] w-4 h-4 rounded-full bg-[#0077B6]/20" />
        <div className="anim-bubble absolute bottom-0 left-[60%] w-2 h-2 rounded-full bg-white/10" style={{ animationDelay: "3s" }} />
        <div className="anim-bubble-2 absolute bottom-0 left-[30%] w-3 h-3 rounded-full bg-white/10" style={{ animationDelay: "6s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/freediving.jpg"
            alt="Freediving underwater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001830]/60 via-[#001830]/40 to-[#001830]" />
        </div>

        <BackButton hoverColor="#0077B6" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Waves className="mx-auto mb-6 text-[#0077B6]" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-display text-[18vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Free<span className="text-[#0077B6]">diving</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-8 text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto leading-relaxed"
          >
            Descending into silence. One breath, infinite peace.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 font-mono text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Wave Divider */}
      <div className="relative h-24 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-24 anim-wave" viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path
            d="M0,60 C300,20 600,90 900,50 C1200,10 1500,80 1800,40 C2100,0 2400,70 2400,60 L2400,100 L0,100 Z"
            fill="#002040"
          />
        </svg>
      </div>

      {/* The Beauty of Freediving */}
      <section className="relative bg-[#002040] py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4">
              The <span className="text-[#0077B6]">Beauty</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-12">
              of freediving
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 text-white/80 text-lg leading-relaxed font-light"
          >
            <p>
              There's a moment — just a few meters below the surface — when the world above
              disappears completely. The noise, the light, the chaos of everyday life — it all
              fades. What's left is just you, your body, and the deep blue reaching out in every
              direction.
            </p>
            <p>
              Freediving is not about conquering the ocean. It's about learning to be part of it.
              Every dive is a meditation, a conversation between your mind and the water. You slow
              your heartbeat, relax every muscle, and let gravity pull you deeper into a world of
              extraordinary stillness.
            </p>
            <p>
              Down there, colors shift. Sunlight dissolves into shades of blue that don't have
              names. Marine life drifts past with effortless grace, unbothered by your presence.
              You become a visitor in a realm that covers most of our planet yet remains almost
              entirely unexplored.
            </p>
            <p>
              The beauty of freediving lies in its simplicity — no tanks, no machines, no noise.
              Just a single breath and the courage to let go. It teaches patience, presence, and a
              profound respect for the power and fragility of the sea.
            </p>
          </motion.div>
        </div>

        {/* Floating accent blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#0077B6]/5 anim-float pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-blue-400/5 anim-float-delay pointer-events-none" />
      </section>

      {/* Second Wave Divider */}
      <div className="relative h-24 -mt-1">
        <svg className="absolute bottom-0 w-[200%] h-24 anim-wave" style={{ animationDirection: "reverse" }} viewBox="0 0 2400 100" preserveAspectRatio="none">
          <path
            d="M0,50 C400,90 800,10 1200,60 C1600,100 2000,30 2400,50 L2400,100 L0,100 Z"
            fill="#001830"
          />
        </svg>
      </div>

      {/* Certification Section */}
      <section className="relative bg-[#001830] py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16">
              Certi<span className="text-[#0077B6]">fied</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-md"
          >
            {/* Certification card */}
            <div className="relative border border-[#0077B6]/30 bg-gradient-to-br from-[#002a50] to-[#001830] p-10 md:p-14 text-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#0077B6]/5 blur-xl" />

              <div className="relative z-10">
                <Award className="mx-auto mb-6 text-[#0077B6]" size={48} />

                <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 mb-3">
                  Certification
                </p>

                <h3 className="font-display text-5xl md:text-6xl uppercase tracking-tighter mb-4">
                  Level <span className="text-[#0077B6]">2</span>
                </h3>

                <p className="font-mono text-sm uppercase tracking-widest text-white/50 mb-8">
                  Freediver
                </p>

                <div className="w-16 h-px bg-[#0077B6]/30 mx-auto mb-8" />

                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                  Certified to dive to depths of 20+ meters on a single breath.
                  Trained in rescue protocols, equalization techniques, and breath-hold physiology.
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#0077B6]/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#0077B6]/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#0077B6]/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#0077B6]/40" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#001830] pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
        </div>
      </section>
    </div>
  );
}
