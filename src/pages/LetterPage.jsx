import Button from "../components/Button.jsx";
import WashiTape from "../components/WashiTape.jsx";
import Sticker from "../components/Sticker.jsx";
import { LETTER_BODY } from "../content.js";

export default function LetterPage({ onNext }) {
  const [greeting, ...paragraphs] = LETTER_BODY;

  return (
    <div className="card letter-card">
      <WashiTape color="mint" />
      <Sticker emoji="🌷" rotate={-8} size={26} style={{ bottom: -10, right: -8 }} />

      <p className="letter-greeting">{greeting}</p>
      <div className="letter-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="letter-actions">
        <Button onClick={onNext}>Turn the page →</Button>
      </div>
    </div>
  );
}
