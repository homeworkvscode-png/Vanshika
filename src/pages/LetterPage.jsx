import Button from "../components/Button.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { LETTER_BODY, RECIPIENT_NAME } from "../content.js";

export default function LetterPage({ onNext }) {
  const [greeting, ...paragraphs] = LETTER_BODY;

  return (
    <div className="card letter-card">
      <WashiTape color="mint" rotate={-4} width={80} style={{ top: -14, left: "15%" }} />
      <WashiTape color="pink" rotate={5} width={70} style={{ top: -12, right: "15%" }} />
      <Sticker emoji="🌷" rotate={-8} size={28} style={{ bottom: 16, right: 16 }} />
      <Sticker emoji="💖" rotate={10} size={26} style={{ top: 20, right: 20 }} />

      <div className="letter-header">
        <p className="letter-greeting">{greeting}</p>
        <span className="letter-badge">Special Birthday Note 💌</span>
      </div>

      <div className="letter-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="letter-footer">
        <p className="letter-signoff">With all our love, 💖</p>
      </div>

      <div className="letter-actions">
        <Button onClick={onNext}>Turn the page →</Button>
      </div>
    </div>
  );
}
