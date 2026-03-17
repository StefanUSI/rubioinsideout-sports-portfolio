import { motion } from "motion/react";
import { ArrowLeft, Snowflake, Zap, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function IceSkating() {
  return (
    <div className="bg-[#f0f9ff] text-[#0c4a6e] min-h-screen overflow-hidden">
      {/* Custom Styles for Ice Shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes frost {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .anim-shimmer { animation: shimmer 3s infinite linear; }
        .anim-frost { animation: frost 5s ease-in-out infinite; }
      `}</style>

      {/* Ambient Frost Corner */}
      <div className="fixed -top-10 -left-10 w-64 h-64 bg-[#90DBF4]/40 blur-3xl anim-frost pointer-events-none" />
      <div className="fixed -bottom-10 -right-10 w-96 h-96 bg-[#90DBF4]/30 blur-3xl anim-frost pointer-events-none" style={{ animationDelay: "-2s" }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/iceskating.jpg"
            alt="Ice Skating glide"
            className="w-full h-full object-cover grayscale opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f9ff] via-transparent to-transparent" />
        </div>

        {/* Back Button */}
        <BackButton hoverColor="#90DBF4" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Snowflake className="mx-auto mb-6 text-[#90DBF4] anim-frost" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.8] uppercase tracking-tighter"
          >
            Ice<br /><span className="text-[#90DBF4] text-outline">Skating</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl font-mono uppercase tracking-[0.4em] text-[#90DBF4]/60"
          >
            Gliding on the Edge
          </motion.p>
        </div>
      </section>

      {/* Descriptive Content */}
      <section className="py-24 md:py-40 bg-white border-y-2 border-[#90DBF4]/20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic text-[#0c4a6e]">
              Power & <span className="text-[#90DBF4]">Precision</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[#0c4a6e]/70 font-light max-w-3xl mx-auto">
              Ice skating is the art of mastery over a frictionless surface. It requires explosive
              power for speed and surgical precision for edge control. Whether gliding gracefully
              or sprinting with intensity, the ice provides a unique canvas for movement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] bg-[#90DBF4]/10 border-2 border-[#90DBF4]/20 brutal-shadow-sm overflow-hidden group"
            >
              <img src="/pictures/iceskating.jpg" alt="Edge Work" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="p-8 border border-[#90DBF4]/20 bg-[#90DBF4]/5">
                <h3 className="font-display text-2xl uppercase mb-4 text-[#0c4a6e]">The Geometry of Skate</h3>
                <p className="text-[#0c4a6e]/60 leading-relaxed italic">
                  "Every turn is a mathematical equation balanced against centrifugal force.
                  The thinner the edge, the deeper the carve."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-cyan-100 text-center">
                  <Zap className="mx-auto mb-2 text-[#90DBF4]" size={20} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0c4a6e]/40">Torque</span>
                </div>
                <div className="p-4 border border-cyan-100 text-center">
                  <Compass className="mx-auto mb-2 text-[#90DBF4]" size={20} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0c4a6e]/40">Edge Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 bg-[#f0f9ff]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Edge Control", desc: "Mastering the inside and outside edges for razor-sharp turns." },
            { title: "Power Glide", desc: "Generating momentum with explosive cross-overs and thrusts." },
            { title: "Flow State", desc: "Seamlessly connecting transitions with fluid upper body movement." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-[#90DBF4]/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#90DBF4]/30 to-transparent anim-shimmer" />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4 text-[#0c4a6e] group-hover:text-[#90DBF4] transition-colors">{item.title}</h3>
              <p className="text-[#0c4a6e]/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Link */}
      <section className="py-32 bg-white text-center border-t border-[#90DBF4]/20">
        <Link
          to="/#sports"
          className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-[#0c4a6e] hover:text-[#90DBF4] transition-colors"
        >
          Return to <span className="text-outline">Main Deck</span>
        </Link>
      </section>
    </div>
  );
}
