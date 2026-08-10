import { useState } from "react";
import Button from "../components/Button.jsx";
import Lightbox from "../components/Lightbox.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { GALLERY_TITLE, GALLERY_HINT, GALLERY_ITEMS } from "../content.js";

// Organic scattered polaroid angles for a handmade scrapbook layout
const ROTATIONS = [-4, 3, -5, 6, -3, 5, -6, 4, -2, 7, -4, 3];
const TAPES = ["yellow", "mint", "lilac", "pink"];

export default function GalleryPage({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [failed, setFailed] = useState({});

  return (
    <div className="full-gallery">
      <WashiTape color="pink" rotate={-5} width={90} style={{ top: -14, left: "8%" }} />
      <WashiTape color="mint" rotate={4} width={80} style={{ top: -12, right: "10%" }} />
      <Sticker emoji="📸" rotate={12} size={28} style={{ top: -10, right: "2%" }} />
      <Sticker emoji="💖" rotate={-8} size={26} style={{ top: -8, left: "2%" }} />

      <p className="kicker">{GALLERY_TITLE}</p>

      <div className="full-gallery-grid">
        {GALLERY_ITEMS.map((item, i) => {
          const rotation = ROTATIONS[i % ROTATIONS.length];
          const tapeColor = TAPES[i % TAPES.length];
          const hasTape = i % 3 === 0;

          return (
            <button
              key={item.src}
              type="button"
              className="full-gallery-item polaroid-card"
              style={{
                transform: `rotate(${rotation}deg)`,
                animationDelay: `${i * 0.07}s`,
              }}
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${item.caption || "photo " + (i + 1)}`}
            >
              {hasTape && (
                <WashiTape
                  color={tapeColor}
                  rotate={i % 2 === 0 ? -6 : 6}
                  width={60}
                  style={{ top: -10, left: "50%", transform: "translateX(-50%)" }}
                />
              )}

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

              <span className="polaroid-caption">{item.caption || `Memory #${i + 1}`}</span>
            </button>
          );
        })}
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
