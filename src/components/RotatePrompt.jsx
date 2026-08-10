import { useState, useEffect } from "react";

export default function RotatePrompt() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth <= 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsPortraitMobile(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isPortraitMobile || dismissed) return null;

  return (
    <div className="rotate-prompt-banner" role="alert">
      <div className="rotate-icon-wrap">
        <span className="rotate-phone-icon">📱</span>
        <span className="rotate-arrow-icon">🔄</span>
      </div>
      <div className="rotate-prompt-text">
        <strong>Rotate your phone!</strong>
        <span>Turn to Landscape mode for the best scrapbook experience ✨</span>
      </div>
      <button
        type="button"
        className="rotate-dismiss-btn"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss rotation prompt"
      >
        ✕
      </button>
    </div>
  );
}
