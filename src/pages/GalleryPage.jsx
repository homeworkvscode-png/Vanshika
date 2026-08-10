import { useState } from "react";
import Button from "../components/Button.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { GALLERY_TITLE, GALLERY_HINT, GALLERY_ITEMS } from "../content.js";

/**
 * The full album. Unlike the Collage page (a small curated, rotated
 * polaroid spread), this page is a plain responsive CSS grid built to
 * comfortably hold many photos — add as many entries as you like to
 * GALLERY_ITEMS in content.js and the grid + lightbox both scale.
 */
export default function GalleryPage({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [failed, setFailed] = useState({});

  return (
    <div className="full-gallery">
      <p className="kicker">{GALLERY_TITLE}</p>

      <div className="full-gallery-grid">
        {GALLERY_ITEMS.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="full-gallery-item"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${item.caption || "photo " + (i + 1)}`}
          >
            {!failed[i] ? (
              <img
                src={item.src}
                alt={item.caption || ""}
                loading="lazy"
                onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              />
            ) : (
              <div className="gallery-fallback" aria-hidden="true">
                <span>🖼️</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="hint-text">{GALLERY_HINT}</p>

      {onNext && <Button onClick={onNext}>Keep going →</Button>}

      {openIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
