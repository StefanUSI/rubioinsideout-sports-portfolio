/**
 * Scroll-triggered visibility hook built on IntersectionObserver.
 *
 * Why a custom hook instead of framer-motion’s `whileInView`?
 *  - Several non-motion elements (e.g. the lazy-color CSS class on images,
 *    skill bars) need to know when they enter the viewport but don’t use
 *    framer-motion. This hook provides the same trigger without adding a
 *    motion dependency to purely-CSS-driven animations.
 *  - The `once` flag (default: true) disconnects the observer after the
 *    first intersection, minimising runtime cost for scroll-heavy pages.
 */
import { useEffect, useRef, useState } from "react";
export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const { once = true, ...observerOpts } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsVisible(false);
      }
    }, { threshold: 0.3, ...observerOpts });

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, observerOpts.threshold, observerOpts.rootMargin]);

  return { ref, isVisible };
}
