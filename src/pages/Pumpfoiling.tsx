import { motion } from "motion/react";
import { ArrowLeft, Waves, Wind, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Pumpfoiling() {
  return (
    <div className="bg-[#f0f9ff] text-[#2EC4B6] min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Water Ripple and Lift */}
      <style>{`
        @keyframes lift-motion {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .anim-lift { animation: lift-motion 5s ease-in-out infinite; }
        .anim-ripple { animation: ripple 4s ease-in-out infinite; }
      `}</style>

      {/* Ambient Ripples */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[20%] w-64 h-64 border border-[#2EC4B6]/30 rounded-full anim-ripple" />
        <div className="absolute top-[60%] right-[15%] w-[30rem] h-[30rem] border border-[#2EC4B6]/30 rounded-full anim-ripple" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Background Image - Lifted effect */}
        <motion.div
          initial={{ scale: 1.1, y: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 z-0 opacity-20 anim-lift"
        >
          <img src="/pictures/pumpfoiling.jpg" alt="Pumpfoiling flight" className="w-full h-full object-cover grayscale" />
        </motion.div>

        {/* Back Button */}
        <BackButton hoverColor="#2EC4B6" />

        {/* Hero Content */}
        <div className="relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-16 h-16 bg-[#2EC4B6] rounded-full flex items-center justify-center mx-auto brutal-shadow-sm border-2 border-white"
          >
            <Wind className="text-white" size={32} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[8vw] uppercase leading-none tracking-tighter"
          >
            Pump<span className="text-[#2EC4B6] italic">Foiling</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-mono text-xs uppercase tracking-[0.6em] text-[#2EC4B6]/40"
          >
            Ethereal Flight. Human Powered.
          </motion.p>
        </div>
      </section>

      {/* The Flight Section */}
      <section className="relative bg-white py-32 px-6 overflow-hidden border-y-2 border-[#2EC4B6]/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter">
              Above the <br /> <span className="text-[#2EC4B6] text-outline">Surface</span>
            </h2>
            <div className="space-y-6 text-xl text-[#2EC4B6]/70 leading-relaxed font-light">
              <p>
                Pumpfoiling is the purest form of hydrofoiling. With no wind or motor, you are the engine.
                By pumping the board with your legs, you generate lift and fly above the surface.
              </p>
              <p>
                It's a silent, weightless sensation that feels like flying over the water.
                A delicate balance of rhythm, power, and efficiency that unlocks a whole new
                dimension of movement.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-2 border-4 border-[#2EC4B6]/10 brutal-shadow overflow-hidden"
          >
            <img src="/pictures/pumpfoiling.jpg" alt="Flight" className="w-full grayscale brightness-110" />
            <div className="absolute inset-0 bg-[#2EC4B6]/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Efficiency Grid */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Hydro-Life", desc: "Understanding the fluid dynamics of the mast and wings." },
            { title: "Pump Rhythm", desc: "Synchronizing leg drive with the foil's resonant frequency." },
            { title: "Silent Glide", desc: "Sustainable horizontal flight without external power." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border-2 border-[#2EC4B6]/20 bg-[#f0f9ff]/50 text-center flex flex-col items-center group"
            >
              <div className="w-12 h-px bg-[#2EC4B6]/30 mb-6 group-hover:w-full transition-all duration-700" />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-blue-900/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Link */}
      <section className="py-32 text-center border-t border-blue-50">
        <Link
          to="/#sports"
          className="font-display text-[10vw] md:text-[6vw] uppercase tracking-tighter hover:text-[#2EC4B6] transition-colors"
        >
          Return to <span className="text-outline">Main Deck</span>
        </Link>
      </section>
    </div>
  );
}
