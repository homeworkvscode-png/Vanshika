import Button from "../components/Button.jsx";
import SpotlightLanding from "../components/SpotlightLanding.jsx";
import { LANDING_TITLE, LANDING_SUBTEXT, LANDING_BUTTON } from "../content.js";

export default function LandingPage({ onNext }) {
  return (
    <SpotlightLanding title={LANDING_TITLE} subtitle={LANDING_SUBTEXT}>
      <Button onClick={onNext}>{LANDING_BUTTON}</Button>
    </SpotlightLanding>
  );
}
