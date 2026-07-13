/**
 * Root application shell — routing, layout chrome, and global side-effects.
 *
 * Architecture notes
 * ───────────────────
 * - Every page-level component is **lazy-loaded** via React.lazy + Suspense
 *   so the initial bundle only contains the shell. Each sport page, plus
 *   Home / Services / Handstands / Legal, ships as a separate chunk.
 *
 * - Sport routes are generated dynamically from SPORT_REGISTRY, which
 *   includes optional aliases (e.g. "freeskating" → InlineSkating).
 *   Adding a new sport only requires a registry entry — no router changes.
 *
 * - The Navbar is conditionally hidden on sport subpages because those
 *   pages use a custom full-bleed hero + BackButton instead of the
 *   global nav. This avoids z-index conflicts and visual clutter.
 *
 * - SEO meta tags are updated imperatively (applySEOMeta) on every route
 *   change because the app is an SPA without SSR. This ensures crawlers
 *   that execute JS still pick up correct titles, OG images, and JSON-LD.
 *
 * - Scroll-to-hash logic uses a retry loop (up to 10 attempts at 200 ms
 *   intervals) to handle sections that render lazily inside Suspense.
 */
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { applySEOMeta } from "@/lib/seo";
import { SPORT_REGISTRY, ALL_SPORT_SLUGS, findSportBySlug, getPalette } from "@/features/sports/config/registry";
import { pageColors } from "@/config/theme.config";

const Home = lazy(() => import("@/features/home/Home"));
const Services = lazy(() => import("@/features/services/Services"));
const Handstands = lazy(() => import("@/features/handstands/Handstands"));
const LegalNotice = lazy(() => import("@/features/legal/LegalNotice"));
const PrivacyPolicy = lazy(() => import("@/features/legal/PrivacyPolicy"));
const Videos = lazy(() => import("@/features/media/Videos"));
const VideoPage = lazy(() => import("@/features/media/VideoPage"));

function AppLayout() {
  const location = useLocation();

  // ── Scroll restoration ────────────────────────────────────────────
  // On plain navigations, scroll to top. On hash links (e.g. /#sports),
  // retry until the lazy-loaded target element exists in the DOM.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = location.hash.replace("#", "");
    let attempts = 0;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // Retry — the target section may not have mounted yet (Suspense).
      if (attempts < 10) {
        attempts += 1;
        setTimeout(scrollToTarget, 200);
      }
    };

    scrollToTarget();
  }, [location.pathname, location.hash]);

  // ── SEO — update <head> tags on every route change ─────────────────
  useEffect(() => {
    applySEOMeta(location.pathname);
  }, [location.pathname]);

  // ── Derive layout variants from the current route ──────────────────
  // Sport subpages use a custom footer background that matches the
  // sport’s colour palette; non-sport pages fall back to defaults.
  const slug = location.pathname.replace("/", "");
  const isSportPage = ALL_SPORT_SLUGS.includes(slug);
  const sportEntry = isSportPage ? findSportBySlug(slug) : undefined;
  const palette = sportEntry ? getPalette(sportEntry) : null;

  const footerStyle = palette
    ? { bgColor: palette.bg, isDark: palette.isDark }
    : location.pathname === "/handstands"
      ? { bgColor: pageColors.handstands.bg, isDark: true }
      : undefined;

  return (
    <div className="min-h-screen bg-gallery-white flex flex-col">
      {/* Navbar hidden on sport subpages — they use BackButton instead */}
      {!isSportPage && <Navbar />}
      <main id="main-content" className="flex-grow">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/handstands" element={<Handstands />} />
            {/* Dynamic sport routes — flatMapped to include slug aliases */}
            {SPORT_REGISTRY.flatMap((sport) =>
              [sport.slug, ...(sport.aliases ?? [])].map((routePath) => (
                <Route
                  key={routePath}
                  path={`/${routePath}`}
                  element={<sport.Component />}
                />
              ))
            )}
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:videoId" element={<VideoPage />} />
            <Route path="/legal" element={<LegalNotice />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            {/* Unknown paths fall back to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer bgColor={footerStyle?.bgColor} isDark={footerStyle?.isDark} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
