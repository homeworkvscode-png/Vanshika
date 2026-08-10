/**
 * A small rotated emoji "sticker" for scrapbook flair.
 *
 * <Sticker emoji="✨" rotate={12} size={28} style={{ top: -10, right: -8 }} />
 */
export default function Sticker({ emoji, rotate = 0, size = 32, style }) {
  return (
    <span
      className="sticker"
      style={{ fontSize: size, transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
}
