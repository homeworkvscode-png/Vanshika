import { useMemo } from "react";

const EMOJIS = ["✨", "⭐", "🎉", "🌸", "🌷", "✨"];

/**
 * A field of celebratory stars and sparkles drifting upward.
 */
export default function FloatingHearts({ count = 22 }) {
  const elements = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 1.6,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      })),
    [count]
  );

  return (
    <div className="hearts-field" aria-hidden="true">
      {elements.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            "--size": `${h.size}rem`,
            "--duration": `${h.duration}s`,
            "--delay": `${h.delay}s`,
            "--drift": `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
