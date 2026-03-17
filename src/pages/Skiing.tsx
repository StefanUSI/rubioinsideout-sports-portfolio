import { motion } from "motion/react";
import { ArrowLeft, Wind, Mountain, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Skiing() {
  return (
    <div className="bg-[#FFFFFF] text-black min-h-screen overflow-hidden">
      {/* Custom Styles for Wind Streaks */}
      <style>{`
        @keyframes snow-fall {
          0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        @keyframes wind-streak {
          0% { transform: translateX(-100%) skewX(-45deg); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: translateX(200%) skewX(-45deg); opacity: 0; }
        }
        .anim-snow { animation: snow-fall linear infinite; }
        .anim-wind { animation: wind-streak 2s linear infinite; }
        .wind-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
          pointer-events: none;
        }
      `}</style>

      {/* Snowfall Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="anim-snow absolute bg-white rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Wind streak particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="wind-line"
            style={{
              top: Math.random() * 100 + "%",
              width: Math.random() * 300 + 100 + "px",
              animation: `wind-streak ${Math.random() * 2 + 1}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/pictures/skiing.JPG"
            alt="Skiing descent"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-[#FFFFFF]" />
        </div>

        {/* Back button */}
        <BackButton hoverColor="#000000" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Zap className="mx-auto mb-6 text-black" size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-[18vw] md:text-[10vw] leading-[0.85] uppercase tracking-tighter"
          >
            Alpine<span className="text-black font-outline">Skiing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-black/60 font-mono uppercase tracking-[0.5em] max-w-xl mx-auto"
          >
            Precision. Speed. Gravity.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-black/20 font-mono text-xs uppercase tracking-[0.3em]">Vertical Drop</span>
          <div className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative py-24 md:py-40 px-6 container mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8 italic">
              Mountain <br /> <span className="text-black text-outline">Rhythm</span>
            </h2>
            <div className="space-y-8 text-black/70 text-lg leading-relaxed font-light border-l-2 border-black/30 pl-8">
              <p>
                Charging down alpine peaks requires a blend of technical mastery and raw courage.
                From perfectly groomed corduroy to the variable terrain of the back-country,
                skiing is a pursuit of the perfect line.
              </p>
              <p>
                It's about the connection between the edges, the snow, and the physical focus
                of the descent. In the high mountains, every turn is a choice, and every run
                is a unique experience of flow.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video border border-black/10 brutal-shadow overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="/pictures/skiing.JPG" alt="Skiing" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
            </div>
            {/* Decorative UI elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-black/10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-black/10" />
            <div className="anim-wind absolute top-1/4 left-0 w-64 h-px bg-white/20" />
            <div className="anim-wind absolute top-2/4 left-0 w-96 h-px bg-white/20" style={{ animationDelay: "0.5s" }} />
            <div className="anim-wind absolute top-3/4 left-0 w-48 h-px bg-white/20" style={{ animationDelay: "1.2s" }} />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 border-t border-black/5 bg-stone-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Technical", icon: Zap, desc: "Edge control and carving precision on any surface." },
            { title: "Big Mountain", icon: Mountain, desc: "Navigating off-piste terrain and natural obstacles." },
            { title: "Speed", icon: Wind, desc: "Aerodynamic focus and explosive acceleration." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-black/5 bg-white hover:bg-stone-100 transition-colors relative"
            >
              <item.icon className="text-black mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Link */}
      <section className="py-24 text-center">
        <Link
          to="/#sports"
          className="inline-flex items-center gap-4 text-black/30 hover:text-black transition-colors duration-500 font-mono text-sm uppercase tracking-[0.5em]"
        >
          <ArrowLeft size={16} />
          Return to Base
        </Link>
      </section>
    </div>
  );
}
