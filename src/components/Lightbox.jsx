import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Fullscreen photo viewer. Rendered via a portal straight into <body> so it
 * always covers the true viewport, no matter what transforms are happening
 * on its ancestors (the page-entrance animation puts a transform on
 * .page-frame, which would otherwise trap a position:fixed child inside it).
 *
 * <Lightbox items={GALLERY_ITEMS} index={openIndex} onClose={...} onNavigate={...} />
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const total = items.length;
  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  const item = items[index];

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {total > 1 && (
        <button
          className="lightbox-btn lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()} key={item.src}>
        <img src={item.src} alt={item.caption || ""} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>

      {total > 1 && (
        <button
          className="lightbox-btn lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>,
    document.body
  );
}
