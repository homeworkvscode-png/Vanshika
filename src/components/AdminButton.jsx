export default function AdminButton({ onClick }) {
  return (
    <button
      type="button"
      className="admin-nav-btn"
      onClick={onClick}
      aria-label="Open Admin Portal"
      title="Admin Dashboard 🔐"
    >
      <span aria-hidden="true">🔐</span>
    </button>
  );
}
