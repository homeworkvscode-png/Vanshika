import { useState } from "react";
import Button from "../components/Button.jsx";
import FloatingHearts from "../components/FloatingHearts.jsx";
import { FINAL_MESSAGE, FINAL_SUBTEXT, FEEDBACK_PROMPT, FEEDBACK_CONFIRM } from "../content.js";

export default function FeedbackPage({ onReplay }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    // UI-only — no backend. Swap this for a fetch()/form action if you
    // wire one up later.
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

            <label className="feedback-label" htmlFor="fb-name">
              Your name
            </label>
            <input
              id="fb-name"
              className="feedback-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
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

            <Button type="submit">Send ❤️</Button>
          </form>
        ) : (
          <div className="feedback-confirm" role="status">
            <span className="feedback-confirm-emoji" aria-hidden="true">
              💌
            </span>
            <p>{FEEDBACK_CONFIRM}</p>
          </div>
        )}
      </div>

      <Button variant="ghost" onClick={onReplay}>
        Replay ↺
      </Button>
    </div>
  );
}
