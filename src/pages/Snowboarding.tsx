import { motion } from "motion/react";
import { ArrowLeft, Snowflake, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Snowboarding() {
  return (
    <div className="bg-[#000000] text-white min-h-screen overflow-hidden">
      {/* Scoped alpine animations */}
      <style>{`
        @keyframes drift {
          0% { transform: translateY(-10vh) translateX(-5vw) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(5vw) rotate(360deg); opacity: 0; }
        }
        .snow-particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }
        .alpine-gradient {
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/snowboard.jpg"
            alt="Snowboarding carving"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black" />
        </div>

        {/* Snowfall Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="snow-particle"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: "-10%",
                opacity: Math.random() * 0.5 + 0.3,
                animation: `drift ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Back button */}
        <BackButton hoverColor="#FFFFFF" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Snowflake className="mx-auto mb-6 text-white" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Snow<span className="text-white/40">boarding</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl text-white/70 font-mono uppercase tracking-widest max-w-xl mx-auto"
          >
            Find your line in the powder.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-[#000000] py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              Mountain <span className="text-white/40">Rhythm</span>
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light">
              <p>
                There is a unique silence at the peak for those who seek it. Snowboarding isn't just a
                sport; it's a conversation between you and the mountain. The crisp air, the crunch
                of fresh snow, and the gravity-defying lean into a perfect carve.
              </p>
              <p>
                Whether it's the adrenaline of an icy steep or the weightless float of bottomless
                powder, every run is a chance to find a new flow. It's where technical precision
                meets absolute freedom.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Mountain size={80} />
              </div>
              <h3 className="font-display text-3xl uppercase tracking-tighter mb-4 text-white">
                Alpine Expert
              </h3>
              <p className="text-white/60 mb-6 font-mono text-xs leading-relaxed uppercase tracking-widest">
                All-Mountain | Camber-Rocker | Peak Performance
              </p>
              <p className="text-white/80 leading-relaxed italic relative z-10">
                "The mountain doesn't care how good you are. It only cares that you are present.
                Down there, in the valley, life is complicated. Up here, it's just you and the slope."
              </p>
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer link */}
      <section className="bg-[#000000] pb-20 px-6 text-center">
        <Link
          to="/#sports"
          className="inline-flex items-center gap-3 text-white/20 hover:text-white transition-colors font-mono text-xs uppercase tracking-[0.4em]"
        >
          <ArrowLeft size={14} />
          Back to all sports
        </Link>
      </section>
    </div>
  );
}
