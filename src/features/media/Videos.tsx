import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { useLanguage } from "@/context/LanguageContext";
import { LOCAL_VIDEOS } from "@/features/media/videoData";
import { layout } from "@/config/theme.config";

export default function Videos() {
  const { t } = useLanguage();

  return (
    <section className={`bg-zinc-950 text-white min-h-screen ${layout.sectionPadding}`}>
      <div className={layout.container}>
        <h1 className="font-display text-6xl md:text-7xl uppercase tracking-tight mb-4">
          {t("videos.pageTitle")}
        </h1>
        <p className="mb-10 text-lg text-white/70 max-w-3xl">
          {t("videos.pageDescription")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCAL_VIDEOS.map((video) => (
            <article key={video.id} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
              <Link to={`/videos/${video.id}`}>
                <ResponsiveImage
                  src={video.poster}
                  alt={video.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="p-4">
                <h2 className="font-semibold text-xl mb-2">{video.title}</h2>
                <p className="text-sm text-white/70 mb-4">{video.description}</p>
                <p className="text-xs uppercase tracking-wider text-white/50 mb-4">{video.sport}</p>
                <Link
                  to={`/videos/${video.id}`}
                  className="inline-block rounded border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
                >
                  {t("videos.watchButton")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
