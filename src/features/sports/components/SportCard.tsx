/**
 * Home-page sport card with responsive image and lazy-color reveal.
 *
 * The card uses the `lazy-color` CSS class + IntersectionObserver to
 * start in grayscale and transition to full colour as the user scrolls
 * it into view — a signature visual effect of the neo-brutalist design.
 *
 * `parseTitle` supports a limited subset of HTML (<br/>, <span style>)
 * embedded in the title strings from the SPORTS array in Home.tsx.
 * This avoids a full HTML parser while giving enough flexibility for
 * multi-line titles and inline size overrides (e.g. Inline Skating’s
 * subtitle).
 */
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { useInView } from "@/hooks/useInView";

interface SportCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  objectPosition?: string;
  link?: string;
}

function parseTitle(html: string): React.ReactNode[] {
  return html.split("<br/>").map((segment, i) => {
    const spanMatch = segment.match(/^(.*?)<span\s+style="([^"]*)">(.*?)<\/span>(.*)$/);
    const parts: React.ReactNode[] = [];
    if (i > 0) parts.push(<br key={`br-${i}`} />);
    if (spanMatch) {
      const [, before, style, inner, after] = spanMatch;
      if (before) parts.push(before);
      const styleObj = Object.fromEntries(
        style.split(";").filter(Boolean).map(s => {
          const [k, v] = s.split(":").map(x => x.trim());
          return [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v];
        })
      );
      parts.push(<span key={`span-${i}`} style={styleObj}>{inner}</span>);
      if (after) parts.push(after);
    } else {
      parts.push(segment);
    }
    return parts;
  }).flat();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function SportCard({ 
  title, 
  description, 
  image, 
  index, 
  objectPosition = "center",
  link
}: SportCardProps) {
  const { ref: imgRef, isVisible } = useInView<HTMLDivElement>({ threshold: 0.3 });

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden border-2 border-black bg-white brutal-shadow brutal-shadow-hover transition-all duration-300 h-full flex flex-col${link ? " cursor-pointer" : ""}`}
    >
      <div ref={imgRef} className="relative aspect-[5/4] overflow-hidden bg-stone-100">
        <ResponsiveImage
          src={image}
          alt={stripHtml(title)}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover lazy-color transition-all duration-700 group-hover:scale-110${isVisible ? " is-visible" : ""}`}
          style={{ objectPosition }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
      </div>
      
      <div className="p-4 bg-white relative flex-grow text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
          <h3 
            className="font-display text-lg uppercase tracking-tighter leading-none"
          >
            {parseTitle(title)}
          </h3>
        </div>
        <p className="text-sm font-medium italic leading-tight opacity-80">{description}</p>
      </div>
    </motion.div>
  );

  if (link) {
    return <Link to={link} className="block h-full">{card}</Link>;
  }

  return card;
}
