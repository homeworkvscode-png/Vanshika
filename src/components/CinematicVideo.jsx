import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen "cinema" video experience. Portaled straight into <body> so it
 * always covers the true viewport, independent of the app shell's padding /
 * max-width and the page-entrance animation's transform.
 *
 * Required prop: `src` — the video file to play (e.g. "/videos/video1.mp4").
 * Mounting this component IS the trigger: it immediately autoplays (muted,
 * for browser autoplay policies), notifies the parent via
 * `onCinematicChange(true)` so the rest of the UI can dim/hide, and shows
 * custom mute + close controls instead of the native browser video chrome.
 *
 * <CinematicVideo
 *   src="/videos/video1.mp4"
 *   caption="A small memory for you 💖"
 *   onFinished={goToNextPage}   // called once, when the video ends naturally
 *   onCinematicChange={setCinematic}
 * />
 */
export default function CinematicVideo({ src, caption, onFinished, onCinematicChange }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src && import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.warn("CinematicVideo: no `src` prop was given — pass the video file path.");
  }

  useEffect(() => {
    onCinematicChange?.(true);
    // Flip to the "ready" class on the next frame so the CSS fade-in
    // transition actually runs instead of the element mounting already-visible.
    const raf = requestAnimationFrame(() => setReady(true));
    return () => {
      cancelAnimationFrame(raf);
      onCinematicChange?.(false);
    };
  }, [onCinematicChange]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed || !src) return;
    v.play().catch(() => {
      /* autoplay-with-sound can be blocked even when muted on some
         browsers — the visible mute/close controls still let the user
         start playback manually via the native play affordance. */
    });
  }, [failed, src]);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const close = () => onFinished?.();

  return createPortal(
    <div className={`cinema-page${ready ? " cinema-page--ready" : ""}`}>
      <div className="cinema-vignette cinema-vignette--left" aria-hidden="true" />
      <div className="cinema-vignette cinema-vignette--right" aria-hidden="true" />

      <div className="cinema-controls">
        <button
          type="button"
          className="cinema-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button type="button" className="cinema-btn" onClick={close} aria-label="Close video">
          ✕
        </button>
      </div>

      <div className="cinema-video-wrap">
        {src && !failed ? (
          <video
            ref={videoRef}
            className="cinema-video"
            src={src}
            autoPlay
            muted={muted}
            playsInline
            onEnded={() => setEnded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="cinema-video-fallback">
            <span aria-hidden="true">🎥</span>
            <p>{src ? `Couldn't load ${src}` : "No video src was given"} — add your file at public/videos/video1.mp4</p>
          </div>
        )}
        {caption && <p className="cinema-overlay-text">{caption}</p>}
      </div>

      {ended && (
        <button type="button" className="btn btn--ghost cinema-next-btn" onClick={close}>
          Continue →
        </button>
      )}
    </div>,
    document.body
  );
}
