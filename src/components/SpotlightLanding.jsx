import { useRef } from "react";
import { createPortal } from "react-dom";
import useSpotlightTracking from "./useSpotlightTracking.js";

/**
 * Full-bleed, fullscreen spotlight reveal for the landing page. Portaled
 * straight into <body> so it always covers the true viewport, independent
 * of the app shell's padding / max-width.
 *
 * Two full-screen layers:
 *  - UNDER (bottom): a soft, light blush gradient — always fully there.
 *  - OVER (top): a darker rose/near-black overlay with a mask-image radial
 *    hole cut around the cursor (see useSpotlightTracking + --mx/--my),
 *    so moving the cursor "peeks" the lighter layer underneath.
 *
 * The title/subtitle/children sit above both layers and are never masked,
 * so "Happy Birthday ❤️" is always readable.
 */
export default function SpotlightLanding({ title, subtitle, children }) {
  const containerRef = useRef(null);
  useSpotlightTracking(containerRef);

  return createPortal(
    <div className="landing-portal" ref={containerRef}>
      <div className="landing-under" aria-hidden="true" />
      <div className="landing-over" aria-hidden="true" />
      <div className="landing-glow" aria-hidden="true" />

      <div className="landing-content">
        {title && <h1 className="landing-title">{title}</h1>}
        {subtitle && <p className="landing-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>,
    document.body
  );
}
