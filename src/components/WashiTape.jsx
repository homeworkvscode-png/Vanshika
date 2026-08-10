/**
 * A strip of decorative "washi tape" — position it with the `style` prop
 * (top/left/right/bottom), pick a `color`, and optionally rotate it.
 *
 * <WashiTape color="mint" rotate={-5} width={100} style={{ top: -14, left: 24 }} />
 */
export default function WashiTape({ color = "pink", rotate = 0, width = 90, style }) {
  return (
    <span
      className={`washi-tape washi-tape--${color}`}
      style={{ width, transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    />
  );
}
