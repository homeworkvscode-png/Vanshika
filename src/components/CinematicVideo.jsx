import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen "cinema" video experience. Portaled straight into <body> so it
 * always covers the true viewport. Audio ON by default!
 */
export default function CinematicVideo({ src, caption, onFinished, onCinematicChange }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false); // Audio ON by default
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onCinematicChange?.(true);
    const raf = requestAnimationFrame(() => setReady(true));
    return () => {
      cancelAnimationFrame(raf);
      onCinematicChange?.(false);
    };
  }, [onCinematicChange]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed || !src) return;

    v.muted = false;
    v.play().catch(() => {
      // If browser blocks unmuted autoplay without user click, fallback to muted autoplay
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
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
