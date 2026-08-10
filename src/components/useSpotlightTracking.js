import { useEffect } from "react";

/**
 * Tracks the cursor (or touch) position over `containerRef` and writes it,
 * smoothed via linear interpolation, to the CSS custom properties --mx/--my
 * on that element, once per animation frame.
 *
 * Writing directly to el.style inside rAF (rather than React state) means
 * no re-renders and no layout thrash — only compositing/paint on the
 * mask-image, which is cheap.
 *
 * On devices without a fine pointer (touch-only), the spotlight drifts on
 * its own in a slow, gentle path so the reveal still animates.
 */
export default function useSpotlightTracking(containerRef) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = { left: 0, top: 0, width: 0, height: 0 };
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let autoMode = true;
    let rafId = null;
    let t = 0;

    const measure = () => {
      const r = el.getBoundingClientRect();
      rect.left = r.left;
      rect.top = r.top;
      rect.width = r.width;
      rect.height = r.height;
      if (current.x === 0 && current.y === 0) {
        current.x = target.x = r.width / 2;
        current.y = target.y = r.height / 2;
      }
    };
    measure();

    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    autoMode = !finePointer;

    const setTarget = (clientX, clientY) => {
      autoMode = false;
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
    };

    const onMouseMove = (e) => setTarget(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (!e.touches?.[0]) return;
      setTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      autoMode = !finePointer;
    };
    const onResize = () => measure();

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerpFactor = reducedMotion ? 1 : 0.09;

    const loop = () => {
      if (autoMode) {
        t += 0.0045;
        target.x = rect.width / 2 + Math.cos(t) * rect.width * 0.3;
        target.y = rect.height / 2 + Math.sin(t * 1.35) * rect.height * 0.24;
      }
      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;

      el.style.setProperty("--mx", `${current.x}px`);
      el.style.setProperty("--my", `${current.y}px`);

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);
}
