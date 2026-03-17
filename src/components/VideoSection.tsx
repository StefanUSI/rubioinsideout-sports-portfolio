import { motion } from "motion/react";

interface Video {
  id: string;
  title: string;
  sport: string;
}

const VIDEOS: Video[] = [
  { id: "n-4pESvWMAo", title: "Skate Session at the Park", sport: "Skateboard" }, // Updated from placeholder
  { id: "dQw4w9WgXcQ", title: "Powder Days in the Alps", sport: "Skiing" },
  { id: "dQw4w9WgXcQ", title: "Backcountry Snowboarding", sport: "Snowboarding" },
  { id: "vpb89WSP_tE", title: "Highline over the Canyon", sport: "Slacklining" },
];

export default function VideoSection() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              Latest <br /> <span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>Captures</span>
            </h2>
          </div>
          <p className="max-w-md text-gallery-white/60 font-medium">
            Raw footage from the streets to the peaks. Check out the latest highlights from my YouTube channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-video bg-zinc-900 border border-white/20 overflow-hidden relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h4 className="font-display text-xl uppercase tracking-tight">{video.title}</h4>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest">{video.sport}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
