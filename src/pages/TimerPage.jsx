import { useState, useEffect } from "react";
import Button from "../components/Button.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import confetti from "canvas-confetti";

// Target Date: August 11, 2026 00:00:00 IST (Indian Standard Time / Asia/Kolkata)
// Equivalent to UTC: 2026-08-10T18:30:00.000Z
const TARGET_IST_TIME = new Date("2026-08-11T00:00:00+05:30").getTime();

export default function TimerPage({ onNext }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = TARGET_IST_TIME - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds, total: difference };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        setIsFinished(true);
        clearInterval(timer);
        triggerBirthdayConfetti();
      }
    }, 1000);

    if (timeLeft.total <= 0 && !isFinished) {
      setIsFinished(true);
      triggerBirthdayConfetti();
    }

    return () => clearInterval(timer);
  }, []);

  const triggerBirthdayConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f472b6", "#fb7185", "#f43f5e", "#fda4af", "#ffe4e6"],
      });
    } catch {}
  };

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="timer-wrap">
      <WashiTape color="pink" rotate={-5} width={90} style={{ top: -14, left: "6%" }} />
      <WashiTape color="yellow" rotate={4} width={80} style={{ top: -12, right: "8%" }} />
      <Sticker emoji="🎂" rotate={-10} size={30} style={{ top: -8, right: "2%" }} />
      <Sticker emoji="✨" rotate={12} size={26} style={{ top: -6, left: "2%" }} />

      <div className="timer-badge">
        <span>🇮🇳 Delhi Time (IST • 11 August 00:00 AM)</span>
      </div>

      <h1 className="timer-title">
        {isFinished ? "Happy Birthday Vanshika! 🎉" : "Counting Down To August 11th ⏳"}
      </h1>

      <p className="timer-subtext">
        {isFinished
          ? "The wait is over! Your special birthday surprise is ready ✨"
          : "Counting down every second to your special day..."}
      </p>

      <div className="timer-clock-grid">
        <div className="timer-card">
          <span className="timer-num">{formatNumber(timeLeft.hours)}</span>
          <span className="timer-unit">HOURS</span>
        </div>
        <span className="timer-colon">:</span>
        <div className="timer-card">
          <span className="timer-num">{formatNumber(timeLeft.minutes)}</span>
          <span className="timer-unit">MINUTES</span>
        </div>
        <span className="timer-colon">:</span>
        <div className="timer-card">
          <span className="timer-num">{formatNumber(timeLeft.seconds)}</span>
          <span className="timer-unit">SECONDS</span>
        </div>
      </div>

      <div className="timer-footer-box">
        {isFinished ? (
          <Button onClick={onNext} className="timer-unlock-btn">
            Open Surprise → 🎉
          </Button>
        ) : (
          <div className="timer-waiting-box">
            <span className="timer-sparkle-icon">✨</span>
            <span>Surprise unlocks at midnight IST! Or tap below to enter preview.</span>
            <button type="button" className="timer-skip-link" onClick={onNext}>
              Open Scrapbook Early →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
