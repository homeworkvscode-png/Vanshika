import CinematicVideo from "../components/CinematicVideo.jsx";
import { VIDEO_SRC, VIDEO_CAPTION } from "../content.js";

/**
 * The moment the user LANDS on this page, CinematicVideo takes over the
 * full viewport: the app shell fades to a dark pink/near-black backdrop
 * (see .app--cinematic in index.css), every other UI element (nav dots,
 * gallery/feedback buttons) hides, and the video autoplays muted with
 * custom mute + close controls.
 */
export default function VideoPage({ onNext, onCinematicChange }) {
  return (
    <CinematicVideo
      src={VIDEO_SRC}
      caption={VIDEO_CAPTION}
      onFinished={onNext}
      onCinematicChange={onCinematicChange}
    />
  );
}
