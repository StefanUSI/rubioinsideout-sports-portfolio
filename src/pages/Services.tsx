import { motion } from "motion/react";
import { ArrowRight, Video, Users, Trophy, Waves, MonitorCheck, Mountain } from "lucide-react";

const SERVICES = [
  {
    title: "Personal Coaching",
    description: "One-on-one sessions focused on progression, technique, and overcoming mental blocks in any of the disciplines.",
    icon: Users,
  },
  {
    title: "Content Creation",
    description: "Professional action sports videography and photography. Capture your best moments with high-end production.",
    icon: Video,
  },
  {
    title: "Pumpfoil Equipment Rental",
    description: "High-performance pumpfoiling gear available for rental. Experience the sensation of flying above the water with premium equipment.",
    icon: Waves,
  },
  {
    title: "Online Video Analysis",
    description: "Detailed breakdown of your technique via video. Receive personalized feedback and actionable drills to level up your skills remotely.",
    icon: MonitorCheck,
  },
  {
    title: "Via Ferrata San Salvatore Guide",
    description: "Professional guiding on the iconic San Salvatore Via Ferrata in Lugano. Experience one of Switzerland's most dramatic routes with expert assistance.",
    icon: Mountain,
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh]">
      <div className="container mx-auto">
        <div className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-9xl uppercase leading-[0.8] tracking-tighter mb-8"
          >
            Work <br /> <span className="text-outline">With Me</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-xl font-medium leading-snug"
          >
            Whether you are looking to push your own limits, capture incredible action footage, or partner on an exciting project, I offer a range of professional services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              viewport={{ once: true }}
              className="bg-white border-2 border-black p-8 brutal-shadow brutal-shadow-hover transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black border border-black inline-block">
                  <service.icon size={24} className="text-white" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tighter leading-none">{service.title}</h2>
              </div>
              <p className="text-lg font-medium leading-tight opacity-80 mb-8 flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
