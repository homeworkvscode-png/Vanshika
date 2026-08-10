import Button from "../components/Button.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { LANDING_TITLE, LANDING_SUBTEXT, LANDING_BUTTON } from "../content.js";

export default function LandingPage({ onNext }) {
  return (
    <div className="card cover-card">
      <WashiTape color="lilac" rotate={-6} width={100} style={{ top: -14, left: -20 }} />
      <WashiTape color="yellow" rotate={5} width={80} style={{ top: -12, right: -16 }} />
      <Sticker emoji="✨" rotate={10} size={26} style={{ top: 10, right: 14 }} />
      <Sticker emoji="🎀" rotate={-12} size={30} style={{ bottom: 14, left: 12 }} />

      <div className="cover-heart">💗</div>
      <h1 className="cover-title">{LANDING_TITLE}</h1>
      <p className="cover-subtext">{LANDING_SUBTEXT}</p>

      <Button onClick={onNext}>{LANDING_BUTTON}</Button>
    </div>
  );
}
