import { useState } from "react";
import Button from "../components/Button.jsx";
import Lightbox from "../components/Lightbox.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { COLLAGE_KICKER, COLLAGE_HINT, COLLAGE_ITEMS } from "../content.js";

// Clean, subtle polaroid tilts that look organized and beautiful on all screens
const ROTATIONS = [-1.5, 1.5, -1, 1.8, -1.2, 1.5];

export default function CollagePage({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [failed, setFailed] = useState({});

  return (
    <div className="collage-wrap">
      <WashiTape color="lilac" rotate={-4} width={85} style={{ top: -14, left: "8%" }} />
      <WashiTape color="yellow" rotate={5} width={75} style={{ top: -12, right: "10%" }} />
      <Sticker emoji="📌" rotate={-8} size={24} style={{ top: -4, right: "2%" }} />
      <Sticker emoji="✨" rotate={10} size={24} style={{ top: -4, left: "2%" }} />

      <p className="kicker">{COLLAGE_KICKER}</p>

      <div className="collage-clean-grid">
        {COLLAGE_ITEMS.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="collage-card"
            style={{
              transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
              animationDelay: `${i * 0.08}s`,
            }}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${item.caption || "photo " + (i + 1)}`}
          >
            <div className="collage-photo-frame">
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
            </div>
          </button>
        ))}
      </div>

      <p className="hint-text">{COLLAGE_HINT}</p>

      <Button onClick={onNext}>Keep going →</Button>

      {openIndex !== null && (
        <Lightbox
          items={COLLAGE_ITEMS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
