/**
 * Home-page YouTube gallery ("Latest Captures") with sport filter buttons.
 *
 * Video data lives in features/media/youtubeData.ts; the click-to-load
 * embed façade lives in LazyYouTube.tsx — both shared with SportVideos.
 */
import { motion } from "motion/react";
import { useState } from "react";
import LazyYouTube from "@/components/media/LazyYouTube";
import { VIDEOS } from "@/features/media/youtubeData";
import { SPORT_LABELS_SORTED } from "@/features/sports/config/registry";
import { layout } from "@/config/theme.config";

export default function VideoSection() {
  const [selectedSport, setSelectedSport] = useState<string | null>("Snowboarding");

  // Extract unique sports with a global deterministic order.
  const sports = Array.from(new Set(VIDEOS.map(v => v.sport))).sort((a, b) => {
    const aIndex = SPORT_LABELS_SORTED.indexOf(a);
    const bIndex = SPORT_LABELS_SORTED.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Filter videos based on selected sport
  const filteredVideos = selectedSport
    ? VIDEOS.filter(v => v.sport === selectedSport)
    : VIDEOS;

  return (
    <section className={`bg-black text-white overflow-hidden ${layout.sectionPadding}`}>
      <div className={layout.container}>
        <div className="flex flex-col items-start md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              Latest <br /> <span className="text-outline text-white" style={{ WebkitTextStroke: "2px white" }}>Captures</span>
            </h2>
          </div>
          <p className="max-w-md text-gallery-white/60 font-medium">
            Check out the latest highlights from my YouTube channel.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 uppercase font-mono text-sm tracking-widest transition-all duration-300 border ${
                selectedSport === sport
                  ? "bg-white text-black border-white"
                  : "border-white/30 text-white hover:border-white"
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative"
            >
              <div className="aspect-video bg-zinc-900 border border-white/20 overflow-hidden relative">
                <LazyYouTube id={video.id} title={video.title} />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-tight">{video.title}</h3>
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
