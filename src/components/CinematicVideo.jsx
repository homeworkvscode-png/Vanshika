import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen "cinema" video experience with YouTube-style Ambient Lighting (Dolby Glow Effect),
 * auto-play on phone rotation to landscape, tap-to-play animation, and smooth fade transitions!
 */
export default function CinematicVideo({ src, caption, onFinished, onCinematicChange }) {
  const videoRef = useRef(null);
  const ambientRef = useRef(null);
  const [muted, setMuted] = useState(false); // Audio ON by default
  const [isPlaying, setIsPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissRotate, setDismissRotate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [tapRipple, setTapRipple] = useState(null);

  // Check & monitor device orientation
  useEffect(() => {
    const handleOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth <= 768;
      setIsPortrait(portrait);

      // Auto-play video when rotated to landscape
      if (!portrait && videoRef.current) {
        const v = videoRef.current;
        v.play()
          .then(() => {
            setIsPlaying(true);
            if (ambientRef.current) ambientRef.current.play().catch(() => {});
          })
          .catch(() => {});
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
        setLoading(false);
        setIsPlaying(true);
        if (amb) amb.play().catch(() => {});
      })
      .catch(() => {
        // Fallback to muted or wait for user tap
        v.muted = true;
        setMuted(true);
        v.play()
          .then(() => {
            setLoading(false);
            setIsPlaying(true);
          })
          .catch(() => {
            setLoading(false);
            setIsPlaying(false);
          });
        if (amb) amb.play().catch(() => {});
      });
  }, [failed, src]);

  // Handle tap anywhere on screen to play/pause in any orientation
  const handleVideoTap = (e) => {
    const v = videoRef.current;
    const amb = ambientRef.current;
    if (!v) return;

    // Create visual ripple animation at tap position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTapRipple({ x, y, id: Date.now() });

    if (v.paused) {
      v.muted = muted;
      v.play()
        .then(() => {
          setIsPlaying(true);
          if (amb) amb.play().catch(() => {});
        })
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
      if (amb) amb.pause();
    }
  };

  const handlePlay = () => {
    setLoading(false);
    setIsPlaying(true);
    ambientRef.current?.play().catch(() => {});
  };

  const handlePause = () => {
    setIsPlaying(false);
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

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted((m) => {
      const next = !m;
      if (videoRef.current) videoRef.current.muted = next;
      return next;
    });
  };

  const close = (e) => {
    e?.stopPropagation();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onFinished?.();
    }, 600);
  };

  return createPortal(
    <div
      className={`cinema-page cinema-page--ready ${isClosing ? "cinema-page--closing" : ""}`}
      onClick={handleVideoTap}
    >
      <div className="cinema-vignette cinema-vignette--left" aria-hidden="true" />
      <div className="cinema-vignette cinema-vignette--right" aria-hidden="true" />

      {/* Rotation hint prompt for video page */}
      {isPortrait && !dismissRotate && (
        <div className="cinema-rotate-hint" role="alert" onClick={(e) => e.stopPropagation()}>
          <span className="rotate-phone-icon">📱</span>
          <span>Rotate phone or <strong>Tap Screen</strong> to play! 🔄</span>
          <button
            type="button"
            className="cinema-rotate-close"
            onClick={(e) => {
              e.stopPropagation();
              setDismissRotate(true);
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="cinema-controls" onClick={(e) => e.stopPropagation()}>
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
        {/* Visual Tap Ripple Animation */}
        {tapRipple && (
          <span
            key={tapRipple.id}
            className="tap-ripple-circle"
            style={{ left: `${tapRipple.x}px`, top: `${tapRipple.y}px` }}
          />
        )}

        {/* Tap to Play Overlay Banner when paused */}
        {!isPlaying && !loading && !failed && (
          <div className="tap-play-overlay">
            <span className="tap-hand-icon">👆</span>
            <p>Tap anywhere to Play 🎬</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && !failed && (
          <div className="video-loading-spinner">
            <span className="spinner-icon">✨</span>
            <p>Loading video...</p>
          </div>
        )}

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
            onCanPlay={() => setLoading(false)}
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setEnded(true);
              setIsPlaying(false);
              ambientRef.current?.pause();
              setTimeout(() => {
                close();
              }, 800);
            }}
            onError={() => {
              setFailed(true);
              setLoading(false);
            }}
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
