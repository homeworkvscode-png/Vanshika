/**
 * Fixed, always-reachable shortcut into the Gallery page. Pinned top-right
 * so it's easy to tap on mobile (thumb-friendly corner) and easy to spot
 * on desktop without hunting for nav.
 */
export default function GalleryButton({ onClick }) {
  return (
    <button type="button" className="gallery-nav-btn" onClick={onClick} aria-label="Open gallery">
      <span aria-hidden="true">🖼️</span>
      <span className="gallery-nav-btn-label">Gallery</span>
    </button>
  );
}
