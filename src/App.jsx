import { useState } from "react";
import GinghamBackground from "./components/GinghamBackground.jsx";
import PageDots from "./components/PageDots.jsx";
import GalleryButton from "./components/GalleryButton.jsx";
import FeedbackButton from "./components/FeedbackButton.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LetterPage from "./pages/LetterPage.jsx";
import CollagePage from "./pages/CollagePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";

const PAGE_COUNT = 6;
const LANDING_INDEX = 0;
const GALLERY_INDEX = 3;
const VIDEO_INDEX = 4;
const FEEDBACK_INDEX = 5;

export default function App() {
  const [pageIndex, setPageIndex] = useState(LANDING_INDEX);
  const [cinematic, setCinematic] = useState(false);

  const goTo = (i) => setPageIndex(i);
  const next = () => setPageIndex((i) => Math.min(i + 1, PAGE_COUNT - 1));
  const replay = () => setPageIndex(LANDING_INDEX);

  // The landing "spotlight" moment and the cinematic video both take over
  // the full viewport via a portal, so the persistent nav chrome (gallery
  // shortcut, feedback shortcut, page dots) hides itself while they're up.
  const showChrome = !cinematic && pageIndex !== LANDING_INDEX;

  return (
    <div className={cinematic ? "app app--cinematic" : "app"}>
      <GinghamBackground />

      {/* `key` forces a remount on page change, which replays the
          .page-frame entrance animation defined in index.css */}
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
    </div>
  );
}
