/**
 * About section — portrait image + bio blurb.
 *
 * Rendered on the Home page between the Videos section and the Timeline.
 * Carries `id="about"` so the navbar's `#about` anchor link scrolls here.
 */
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { SITE_CONFIG } from "@/config/site.config";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-gallery-white border-t-2 border-black px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-80 shrink-0 border-2 border-black brutal-shadow overflow-hidden aspect-square">
            <ResponsiveImage
              src="/images/about/about.jpg"
              alt={`About ${SITE_CONFIG.brandName}`}
              sizes="(min-width: 768px) 320px, 100vw"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-[clamp(2rem,8vw,4rem)] uppercase tracking-tighter mb-6">About Me</h2>
            <div className="space-y-6 text-sm md:text-base font-medium leading-snug break-words">
              <p>
                I'm Stefan Carlen, a multi-sport athlete and content creator dedicated to capturing the raw energy of
                action sports. Whether it's the precision of a kickflip, the flow of a powder turn, or the focus of a
                highline, I believe in pushing boundaries and sharing the experience.
              </p>
              <p>
                My YouTube channel is where I document these adventures, sharing tutorials, highlights, and the
                behind-the-scenes reality of mastering these disciplines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
