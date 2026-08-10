import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Clean fullscreen video player with YouTube Ambient Lighting (Dolby Glow Effect),
 * instant play on landscape, theme-matched small rotation hint for portrait mode, and smooth fade transitions!
 */
export default function CinematicVideo({ src, caption, onFinished, onCinematicChange }) {
  const videoRef = useRef(null);
  const ambientRef = useRef(null);
  const [muted, setMuted] = useState(false); // Audio ON by default
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissRotate, setDismissRotate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check & monitor device orientation
  useEffect(() => {
    const handleOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth <= 768;
      setIsPortrait(portrait);

      // Auto-play video instantly when rotated to landscape
      if (!portrait && videoRef.current) {
        const v = videoRef.current;
        v.play().catch(() => {});
        if (ambientRef.current) ambientRef.current.play().catch(() => {});
      }
    };

    handleOrientation();
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

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

  const close = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onFinished?.();
    }, 600);
  };

  return createPortal(
    <div className={`cinema-page cinema-page--ready ${isClosing ? "cinema-page--closing" : ""}`}>
      <div className="cinema-vignette cinema-vignette--left" aria-hidden="true" />
      <div className="cinema-vignette cinema-vignette--right" aria-hidden="true" />

      {/* Small theme-matched rotation notification ONLY for portrait mobile view */}
      {isPortrait && !dismissRotate && (
        <div className="cinema-rotate-hint" role="alert">
          <span className="rotate-phone-icon">🔄</span>
          <span>Rotate to <strong>landscape</strong> for the best experience ✨</span>
          <button
            type="button"
            className="cinema-rotate-close"
            onClick={() => setDismissRotate(true)}
            aria-label="Dismiss rotation hint"
          >
            ✕
          </button>
        </div>
      )}

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
        {/* YouTube Ambient Glow Background */}
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
              ambientRef.current?.pause();
              setTimeout(() => {
                close();
              }, 800);
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
        <button
          type="button"
          className="btn btn--ghost cinema-next-btn"
          onClick={close}
        >
          Continue →
        </button>
      )}
    </div>,
    document.body
  );
}
