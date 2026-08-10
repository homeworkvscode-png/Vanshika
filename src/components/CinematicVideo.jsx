import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen "cinema" video experience with YouTube-style Ambient Lighting (Dolby Glow Effect).
 * Automatically syncs a blurred background glow with real-time video colors!
 */
export default function CinematicVideo({ src, caption, onFinished, onCinematicChange }) {
  const videoRef = useRef(null);
  const ambientRef = useRef(null);
  const [muted, setMuted] = useState(false); // Audio ON by default
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onCinematicChange?.(true);
    return () => {
      onCinematicChange?.(false);
    };
  }, [onCinematicChange]);

  useEffect(() => {
    const v = videoRef.current;
    const amb = ambientRef.current;
    if (!v || failed || !src) return;

    v.muted = false;
    v.play()
      .then(() => {
        if (amb) amb.play().catch(() => {});
      })
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
        if (amb) amb.play().catch(() => {});
      });
  }, [failed, src]);

  const handlePlay = () => {
    ambientRef.current?.play().catch(() => {});
  };

  const handlePause = () => {
    ambientRef.current?.pause();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && ambientRef.current) {
      const diff = Math.abs(ambientRef.current.currentTime - videoRef.current.currentTime);
      if (diff > 0.2) {
        ambientRef.current.currentTime = videoRef.current.currentTime;
      }
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const close = () => onFinished?.();

  return createPortal(
    <div className="cinema-page cinema-page--ready">
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
        {/* Real-time YouTube-style Ambient Glow Background */}
        {src && !failed && (
          <video
            ref={ambientRef}
            className="cinema-ambient-bg"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}

        {src && !failed ? (
          <video
            ref={videoRef}
            className="cinema-video"
            src={src}
            autoPlay
            preload="auto"
            muted={muted}
            playsInline
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setEnded(true);
              ambientRef.current?.pause();
            }}
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
