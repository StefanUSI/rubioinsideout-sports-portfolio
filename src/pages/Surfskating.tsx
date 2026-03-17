import { motion } from "motion/react";
import { ArrowLeft, Waves, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Surfskating() {
  return (
    <div className="bg-[#fefce8] text-black min-h-screen overflow-hidden">
      {/* Custom Styles for Wave Motion */}
      <style>{`
        @keyframes wave-carve {
          0%, 100% { transform: skewX(-2deg) translateX(0); }
          50% { transform: skewX(2deg) translateX(10px); }
        }
        @keyframes sun-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .anim-carve { animation: wave-carve 4s ease-in-out infinite; }
        .anim-sun { animation: sun-glow 8s ease-in-out infinite; }
      `}</style>

      {/* Ambient Sun Glow */}
      <div className="fixed -top-20 -right-20 w-[60vw] h-[60vw] rounded-full bg-[#495057]/10 blur-[120px] anim-sun pointer-events-none z-0" />
      <div className="fixed -bottom-40 -left-40 w-[50vw] h-[50vw] rounded-full bg-[#495057]/5 blur-[100px] anim-sun pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/surfskating.JPG"
            alt="Surfskating carve"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fefce8] via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <BackButton hoverColor="#495057" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Waves className="mx-auto mb-6 text-[#495057] anim-carve" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Surf<span className="text-[#495057]">skating</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-2xl italic font-medium text-black/60 max-w-xl mx-auto"
          >
            Concrete waves. Infinite flow.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-black/30 font-mono text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="relative bg-white py-24 md:py-40 px-6 border-y-2 border-black">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-8">
              The <span className="text-[#495057]">Pavement</span> <br /> Ocean
            </h2>
            <div className="space-y-6 text-xl text-black/70 leading-relaxed font-medium">
              <p>
                Surfskating is the closest feeling to surfing you can get on land. It's not about
                speed or tricks—it's about the rhythm of the carve and the connection between
                your breath and your board.
              </p>
              <p>
                Using specialized front trucks that replicate the movement of a surfboard fin,
                every street becomes a wave, every incline a potential line. It's the ultimate
                expression of land-based flow.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/5] border-2 border-black brutal-shadow overflow-hidden"
          >
            <img
              src="/pictures/surfskating.JPG"
              alt="Carving"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-24 px-6 bg-[#fefce8]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-display text-5xl uppercase tracking-tighter mb-16 underline decoration-[#495057] decoration-4 underline-offset-8">
            The Flow State
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            {[
              { label: "Style", value: "Fluid Carve", icon: Wind },
              { label: "Medium", value: "Smooth Concrete", icon: Waves },
              { label: "Focus", value: "Body Weight", icon: Compass }
            ].map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border-2 border-black bg-white brutal-shadow-sm hover:-translate-y-2 transition-transform"
              >
                <spec.icon className="mx-auto mb-4 text-[#495057]" size={32} />
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">{spec.label}</div>
                <div className="font-display text-2xl uppercase tracking-tight">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-32 border-t-2 border-black text-center bg-white">
        <Link
          to="/#sports"
          className="font-display text-[8vw] uppercase tracking-tighter hover:text-[#495057] transition-all duration-500"
        >
          Explore <span className="text-outline">All Sports</span>
        </Link>
      </section>
    </div>
  );
}

function Compass({ className, size }: { className?: string, size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
