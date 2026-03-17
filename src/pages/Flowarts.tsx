import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Zap, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Flowarts() {
  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
      {/* Custom Styles for Light Trails and Orbit */}
      <style>{`
        @keyframes trail-orbit {
          0% { transform: rotate(0deg) translateX(150px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); opacity: 0; }
        }
        @keyframes glow-purple {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(155, 93, 229, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(155, 93, 229, 0.8)); }
        }
        .anim-orbit { animation: trail-orbit 10s linear infinite; }
        .anim-orbit-reverse { animation: trail-orbit 12s linear infinite reverse; }
        .anim-glow-purple { animation: glow-purple 3s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/flowarts.jpg"
            alt="Flowarts meditation"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="anim-orbit absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#9B5DE5] blur-sm"
              style={{ animationDelay: `${i * -1.5}s` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="anim-orbit-reverse absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 blur-sm"
              style={{ animationDelay: `${i * -3}s` }}
            />
          ))}
        </div>

        <BackButton hoverColor="#9B5DE5" isDark />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="anim-glow-purple mb-12"
          >
            <Sparkles className="mx-auto text-[#9B5DE5]" size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[15vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Flow<span className="text-[#9B5DE5] italic">Arts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-white/60 font-medium max-w-xl mx-auto leading-relaxed italic"
          >
            The hypnotic art of prop manipulation. Juggling, spinning, and moving in rhythm.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-24 md:py-40 px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              Movement in <br /> <span className="text-[#9B5DE5] text-outline" style={{ WebkitTextStroke: "1px #9B5DE5" }}>Trance</span>
            </h2>
            <div className="space-y-6 text-white/70 text-xl leading-relaxed font-light border-l-2 border-[#9B5DE5]/30 pl-8">
              <p>
                Flowarts combine movement, prop manipulation, and rhythm into a hypnotic performance.
                Whether it's juggling, spinning, or contact work, it's about entering a "flow state".
              </p>
              <p>
                In this state, the prop becomes an extension of the body and the music leads the way.
                It's a delicate balance of spatial awareness, timing, and creative expression.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative p-2 border border-white/10 bg-white/5"
          >
            <img src="/pictures/flowarts.jpg" alt="Flow State" className="w-full grayscale brightness-75 hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-[#9B5DE5]/5 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 border-y border-white/5 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Prop Mastery", icon: Compass, desc: "Technical skill in manipulating props like balls, clubs, and hoops." },
            { title: "Fluidity", icon: Zap, desc: "Connecting movements seamlessly with effortless grace." },
            { title: "Flow State", icon: Sparkles, desc: "Entering a deep focus where the action becomes automatic." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors relative"
            >
              <item.icon className="text-[#9B5DE5] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              {/* Visual trail hint */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-[#9B5DE5]/5 group-hover:to-[#9B5DE5]/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-32 text-center bg-black">
        <Link
          to="/#sports"
          className="font-display text-[10vw] md:text-[6vw] uppercase tracking-tighter hover:text-[#9B5DE5] transition-colors"
        >
          Back to <span className="text-outline" style={{ WebkitTextStroke: "1px white" }}>The Circle</span>
        </Link>
      </section>
    </div>
  );
}
