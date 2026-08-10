/**
 * Floating shortcut into the Feedback page, pinned bottom-right so it never
 * collides with the bottom-center PageDots nav.
 */
export default function FeedbackButton({ onClick }) {
  return (
    <button type="button" className="feedback-nav-btn" onClick={onClick} aria-label="Leave feedback">
      <span aria-hidden="true">💌</span>
      <span className="feedback-nav-btn-label">Feedback</span>
    </button>
  );
}
