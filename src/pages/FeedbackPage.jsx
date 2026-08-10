import { useState } from "react";
import Button from "../components/Button.jsx";
import FloatingHearts from "../components/FloatingHearts.jsx";
import { saveFeedback } from "../utils/db.js";
import {
  FINAL_MESSAGE,
  FINAL_SUBTEXT,
  FEEDBACK_PROMPT,
  FEEDBACK_CONFIRM,
  INSTAGRAM_URL,
  INSTAGRAM_LABEL,
} from "../content.js";

const RATINGS = ["💖", "🥰", "✨", "💌", "🎉"];

export default function FeedbackPage({ onReplay }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRating, setSelectedRating] = useState("💖");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveFeedback({
      name: name.trim(),
      message: message.trim(),
      rating: selectedRating,
    });

    setSubmitted(true);
  };

  return (
    <div className="final-wrap">
      <FloatingHearts />

      <h1 className="final-title">{FINAL_MESSAGE} 💖</h1>
      <p className="final-subtext">{FINAL_SUBTEXT}</p>

      <div className="feedback-card">
        {!submitted ? (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <p className="feedback-prompt">{FEEDBACK_PROMPT}</p>

            <div className="rating-picker">
              {RATINGS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className={`rating-emoji ${selectedRating === emoji ? "rating-emoji--active" : ""}`}
                  onClick={() => setSelectedRating(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <label className="feedback-label" htmlFor="fb-name">
              Your name
            </label>
            <input
              id="fb-name"
              className="feedback-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vanshika"
              required
            />

            <label className="feedback-label" htmlFor="fb-message">
              A little note
            </label>
            <textarea
              id="fb-message"
              className="feedback-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say anything you'd like..."
              rows={4}
            />

            <Button type="submit">Send Note ❤️</Button>
          </form>
        ) : (
          <div className="feedback-confirm" role="status">
            <span className="feedback-confirm-emoji" aria-hidden="true">
              💌
            </span>
            <p>{FEEDBACK_CONFIRM}</p>
            <span style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginTop: "0.4rem" }}>
              Your note has been saved into the scrapbook database!
            </span>
          </div>
        )}
      </div>

      {INSTAGRAM_URL && (
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="insta-btn"
        >
          <span className="insta-icon">📸</span>
          <span>{INSTAGRAM_LABEL || "Visit Instagram Profile"}</span>
        </a>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Button variant="ghost" onClick={onReplay}>
          Replay ↺
        </Button>
      </div>
    </div>
  );
}
