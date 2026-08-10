import { useState } from "react";
import Button from "../components/Button.jsx";
import Lightbox from "../components/Lightbox.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { COLLAGE_KICKER, COLLAGE_HINT, COLLAGE_ITEMS } from "../content.js";

// Slight per-item rotation so the grid reads as scattered polaroids rather
// than a rigid grid. Cycled by index.
const ROTATIONS = [-6, 4, -3, 6, -5, 3];

export default function CollagePage({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [failed, setFailed] = useState({});

  return (
    <div className="collage-wrap">
      <WashiTape color="lilac" rotate={-8} width={90} style={{ top: -18, left: "10%" }} />
      <WashiTape color="yellow" rotate={6} width={80} style={{ top: -16, right: "12%" }} />
      <Sticker emoji="📌" rotate={-10} size={24} style={{ top: -6, right: "4%" }} />

      <p className="kicker">{COLLAGE_KICKER}</p>

      <div className="gallery-grid">
        {COLLAGE_ITEMS.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="gallery-item"
            style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
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
            {item.caption && <span className="gallery-item-caption">{item.caption}</span>}
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
