/**
 * Timeline — vertical sports-journey timeline for the About section.
 *
 * Layout (desktop):
 *   Left card ← year badge + circular image → Right card
 *   Cards alternate sides; only the active (scrolled-into-view) card is visible.
 *
 * Layout (mobile):
 *   Circular image → year badge → card (all stacked, left-aligned).
 *
 * Visibility is driven by scroll position:
 *   - Fade IN when the marker enters the lower third of the viewport
 *   - Fade OUT when the marker enters the upper third of the viewport
 */
import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  /** Image path — omit for year-only dot markers */
  image?: string;
  /** Optional route override — defaults to `/${title.toLowerCase().replace(/\s+/g, "")}` */
  route?: string;
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    year: "2014",
    title: "The Start",
    description: "Entering the gym for the first time.",
  },
  {
    year: "2015",
    title: "Weightlifting",
    description: "Away from machines to free weights and the Big 3 lifts, training 5x5.",
    image: "/images/body/weightlifting/weightlifting.jpg",
  },
  {
    year: "2016",
    title: "Calisthenics",
    description: "Building bodyweight control, mobility and strength.",
    image: "/images/body/calisthenics/calisthenics.jpg",
  },
  {
    year: "2017",
    title: "2017",
    description: "",
  },
  {
    year: "2018",
    title: "2018",
    description: "",
  },
  {
    year: "2019",
    title: "Slacklining",
    description: "Stepping onto the line and testing balance.",
    image: "/images/body/highlining/highlining.jpg",
    route: "/highlining",
  },
  {
    year: "2019",
    title: "Juggling",
    description: "Practicing flow, rhythm and coordination with props.",
    image: "/images/body/flowarts/flowarts.jpg",
    route: "/flowarts",
  },
  {
    year: "2019",
    title: "Skiing",
    description: "Carving down mountain slopes.",
    image: "/images/body/skiing/skiing.jpg",
  },
  {
    year: "2020",
    title: "Snowboarding",
    description: "Riding powder and freestyle terrain.",
    image: "/images/body/snowboarding/snowboard.jpg",
  },
  {
    year: "2020",
    title: "Ice Skating",
    description: "Glide and edge work on frozen surfaces.",
    image: "/images/body/iceskating/iceskating.jpg",
  },
  {
    year: "2021",
    title: "2021",
    description: "",
  },
  {
    year: "2022",
    title: "2022",
    description: "",
  },
  {
    year: "2023",
    title: "2023",
    description: "",
  },
  {
    year: "2024",
    title: "Highlining",
    description: "First steps on a highline.",
    image: "/images/body/highlining/highlining.jpg",
  },
  {
    year: "2025",
    title: "Pumpfoiling",
    description: "Learning pumpfoiling and wingfoiling within a month.",
    image: "/images/body/pumpfoiling/pumpfoiling.jpg",
  },
  {
    year: "2026",
    title: "Poi",
    description: "Light and fluid spinning flow.",
    image: "/images/body/flowarts/flowarts.jpg",
    route: "/flowarts",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Card that shows the title + description of a timeline entry. */
function TimelineCard({
  title,
  description,
  visible,
  className = "",
}: {
  title: string;
  description: string;
  visible: boolean;
  className?: string;
}) {
  return (
    <article
      className={`border-2 border-black p-4 rounded-lg bg-white/80 transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${className}`}
    >
      <h3 className="font-bold text-xl uppercase">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{description}</p>
    </article>
  );
}

/** Circular image marker or black dot sitting on the centre spine. */
function TimelineMarker({
  item,
  index,
  isLeft,
  markerRef,
  onNavigate,
}: {
  item: TimelineEntry;
  index: number;
  isLeft: boolean;
  markerRef: (el: HTMLDivElement | null) => void;
  onNavigate: () => void;
}) {
  const isDot = !item.image;

  return (
    <div
      ref={markerRef}
      data-index={index}
      className={`relative flex items-center justify-center z-20 mx-2 ${isDot ? "min-h-[2rem]" : "min-h-[8rem]"}`}
      aria-label={`${item.title} timeline marker`}
    >
      {/* Black dot (not clickable) or image circle (clickable) */}
      {isDot ? (
        <div className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      ) : (
        <div
          className="absolute left-1/2 top-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-white overflow-hidden shadow-lg cursor-pointer"
          onClick={onNavigate}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") onNavigate(); }}
        >
          <ResponsiveImage src={item.image!} alt={item.title} sizes="128px" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Year label — positioned on the opposite side of the card */}
      <span
        className={`relative md:absolute z-30 text-2xl font-black uppercase text-black ${isDot ? "mt-12" : "mt-40"} md:mt-0`}
        style={{
          ...(isLeft
            ? { left: "6rem", top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" as const }
            : { right: "6rem", top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" as const }),
        }}
      >
        {item.year}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook: scroll-position-based visibility                             */
/*                                                                     */
/*  A single IntersectionObserver with rootMargin that crops the top   */
/*  and bottom thirds of the viewport. The effective observation zone  */
/*  is only the middle third. When a marker is inside → visible.       */
/*  When it leaves (up or down) → hidden. Works for both scroll dirs.  */
/* ------------------------------------------------------------------ */

function useTimelineVisibility(count: number) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());

  // Ensure refs array is correctly sized
  if (itemRefs.current.length !== count) {
    itemRefs.current = Array(count).fill(null);
  }

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    // Crop the top third (-33.3%) and bottom third (-33.3%) of the
    // viewport, leaving only the middle third as the active zone.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));
          setVisibleSet((prev) => {
            if (entry.isIntersecting) {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            } else {
              if (!prev.has(idx)) return prev;
              const next = new Set(prev);
              next.delete(idx);
              return next;
            }
          });
        });
      },
      {
        root: null,
        rootMargin: "-33.3% 0px -33.3% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [count]);

  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );

  return { visibleSet, setRef };
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Timeline({ items = TIMELINE_DATA }: { items?: TimelineEntry[] }) {
  const navigate = useNavigate();
  const { visibleSet, setRef } = useTimelineVisibility(items.length);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Centre spine */}
      <div className="absolute left-1/2 top-0 h-full w-1.5 bg-black -translate-x-1/2" aria-hidden="true" />

      <div className="space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isActive = visibleSet.has(index);
          const isDot = !item.image;
          const route = item.route ?? `/${item.title.toLowerCase().replace(/\s+/g, "")}`;

          return (
            <div
              key={`${item.year}-${index}`}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4"
            >
              {/* ---- Desktop: left column ---- */}
              <div className={`hidden md:flex ${isLeft ? "md:justify-start" : "md:justify-end"} md:items-center`}>
                {isLeft && !isDot && (
                  <TimelineCard
                    title={item.title}
                    description={item.description}
                    visible={isActive}
                    className="md:max-w-sm"
                  />
                )}
              </div>

              {/* ---- Centre marker ---- */}
              <TimelineMarker
                item={item}
                index={index}
                isLeft={isLeft}
                markerRef={setRef(index)}
                onNavigate={() => navigate(route)}
              />

              {/* ---- Mobile: card below marker ---- */}
              {!isDot && (
                <div className="w-full md:hidden mt-28">
                  <TimelineCard title={item.title} description={item.description} visible={isActive} />
                </div>
              )}

              {/* ---- Desktop: right column ---- */}
              <div className={`hidden md:flex ${isLeft ? "md:justify-start" : "md:justify-end"} md:items-center`}>
                {!isLeft && !isDot && (
                  <TimelineCard
                    title={item.title}
                    description={item.description}
                    visible={isActive}
                    className="md:max-w-sm"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
