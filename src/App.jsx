import { useState, useEffect } from "react";
import GinghamBackground from "./components/GinghamBackground.jsx";
import PageDots from "./components/PageDots.jsx";
import GalleryButton from "./components/GalleryButton.jsx";
import FeedbackButton from "./components/FeedbackButton.jsx";
import AdminModal from "./components/AdminModal.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LetterPage from "./pages/LetterPage.jsx";
import CollagePage from "./pages/CollagePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import { trackPageView, markAsAdmin } from "./utils/db.js";

const PAGE_COUNT = 6;
const PAGE_NAMES = ["Landing", "Letter", "Collage", "Gallery", "Video", "Feedback"];
const LANDING_INDEX = 0;
const GALLERY_INDEX = 3;
const VIDEO_INDEX = 4;
const FEEDBACK_INDEX = 5;

export default function App() {
  const [pageIndex, setPageIndex] = useState(LANDING_INDEX);
  const [cinematic, setCinematic] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes("admin") || search.includes("admin") || hash.includes("admin")) {
        markAsAdmin();
        setShowAdmin(true);
      }
    };

    checkAdmin();
    window.addEventListener("hashchange", checkAdmin);
    window.addEventListener("popstate", checkAdmin);

    return () => {
      window.removeEventListener("hashchange", checkAdmin);
      window.removeEventListener("popstate", checkAdmin);
    };
  }, []);

  useEffect(() => {
    if (!showAdmin) {
      trackPageView(PAGE_NAMES[pageIndex] || "Page_" + pageIndex);
    }
  }, [pageIndex, showAdmin]);

  const goTo = (i) => setPageIndex(i);
  const next = () => setPageIndex((i) => Math.min(i + 1, PAGE_COUNT - 1));
  const replay = () => setPageIndex(LANDING_INDEX);

  const showChrome = !cinematic && pageIndex !== LANDING_INDEX;

  return (
    <div className={cinematic ? "app app--cinematic" : "app"}>
      <GinghamBackground />

      <div
        className={`page-frame${pageIndex === GALLERY_INDEX ? " page-frame--wide" : ""}`}
        key={pageIndex}
      >
        {pageIndex === LANDING_INDEX && <LandingPage onNext={next} />}
        {pageIndex === 1 && <LetterPage onNext={next} />}
        {pageIndex === 2 && <CollagePage onNext={next} />}
        {pageIndex === GALLERY_INDEX && <GalleryPage onNext={next} />}
        {pageIndex === VIDEO_INDEX && <VideoPage onNext={next} onCinematicChange={setCinematic} />}
        {pageIndex === FEEDBACK_INDEX && <FeedbackPage onReplay={replay} />}
      </div>

      {showChrome && pageIndex !== GALLERY_INDEX && (
        <GalleryButton onClick={() => goTo(GALLERY_INDEX)} />
      )}
      {showChrome && pageIndex !== FEEDBACK_INDEX && (
        <FeedbackButton onClick={() => goTo(FEEDBACK_INDEX)} />
      )}
      {showChrome && <PageDots count={PAGE_COUNT} activeIndex={pageIndex} onSelect={goTo} />}

      <AdminModal
        isOpen={showAdmin}
        onClose={() => {
          setShowAdmin(false);
          if (window.history.pushState) {
            const cleanUrl = window.location.protocol + "//" + window.location.host + "/";
            window.history.pushState({ path: cleanUrl }, "", cleanUrl);
          }
        }}
      />
    </div>
  );
}
