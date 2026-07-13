import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalVideoById } from "@/features/media/videoData";
import { layout } from "@/config/theme.config";

export default function VideoPage() {
  const { t } = useLanguage();
  const params = useParams<{ videoId: string }>();
  const id = params.videoId ?? "";
  const normalizedId = id.replace(/\.mp4$/i, "");
  const video = getLocalVideoById(normalizedId);

  if (!video) {
    return (
      <section className={`bg-zinc-900 text-white min-h-screen ${layout.sectionPadding}`}>
        <div className={layout.container}>
          <h1 className="font-display text-5xl mb-6">{t("videos.notFoundTitle")}</h1>
          <p className="text-white/70 mb-8">{t("videos.notFoundText")}</p>
          <Link to="/videos" className="text-cyan-400 hover:underline">
            {t("videos.backToList")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-zinc-900 text-white min-h-screen ${layout.sectionPadding}`}>
      <div className={layout.container}>
        <div className="mb-8">
          <Link to="/videos" className="text-white/70 hover:text-white underline">
            {t("videos.backToList")}
          </Link>
        </div>

        <h1 className="font-display text-6xl md:text-7xl uppercase tracking-tight mb-4">{video.title}</h1>
        <p className="text-white/70 mb-8">{video.description}</p>

        <div className="aspect-video border border-white/20 rounded-2xl overflow-hidden mb-8">
          <video
            controls
            preload="metadata"
            poster={video.poster}
            className="w-full h-full object-cover"
            src={video.source}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
          <div>
            <dt className="font-semibold text-white">{t("videos.sportLabel")}</dt>
            <dd>{video.sport}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">{t("videos.durationLabel")}</dt>
            <dd>{video.duration}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">{t("videos.fileUrlLabel")}</dt>
            <dd><a href={video.source} className="text-cyan-300 hover:underline">{video.source}</a></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
