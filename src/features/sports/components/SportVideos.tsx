/**
 * YouTube video grid for a single sport.
 *
 * Filters the shared VIDEOS catalogue (features/media/youtubeData.ts) by
 * sport name and renders a click-to-load grid via the shared LazyYouTube
 * façade, so no third-party requests fire until the user plays a video.
 *
 * Returns null when no videos match, so sport pages without video content
 * simply skip the section.
 */
import { motion } from "motion/react";
import LazyYouTube from "@/components/media/LazyYouTube";
import { VIDEOS } from "@/features/media/youtubeData";
import { hexAlpha } from "@/features/sports/config/palettes";
import { layout } from "@/config/theme.config";

interface SportVideosProps {
  sport: string;
  accentColor?: string;
  isDark?: boolean;
}

export default function SportVideos({
  sport,
  accentColor = "#ffffff",
  isDark = true,
}: SportVideosProps) {
  const videos = VIDEOS.filter((v) => v.sport === sport);
  if (videos.length === 0) return null;

  const titleColor = isDark ? "#ffffff" : "#000000";
  const borderColor = hexAlpha(accentColor, 0.2);

  return (
    <section className={layout.sectionPadding}>
      <div className={layout.container}>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl uppercase tracking-tighter mb-12"
          style={{ color: titleColor }}
        >
          Videos
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="aspect-video bg-black/20 border overflow-hidden relative"
                style={{ borderColor }}
              >
                <LazyYouTube id={video.id} title={video.title} />
              </div>
              <h4
                className="mt-4 font-display text-lg uppercase tracking-tight"
                style={{ color: titleColor }}
              >
                {video.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
