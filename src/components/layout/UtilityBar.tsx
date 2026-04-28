/**
 * UtilityBar — schmale Status-/Kontaktleiste oberhalb des Headers.
 * Kontaktdaten kommen später aus siteSettings.contact via Server Component.
 */
export function UtilityBar() {
  return (
    <div className="utility">
      <div className="container">
        <div className="left">
          <span>
            <span className="dot"></span>Aktiv ankaufend im gesamten Ruhrgebiet
          </span>
          <span>Bochum · Dortmund · Essen</span>
        </div>
        <div className="right">
          <a href="tel:02343671506220">+49 234 3671 506 220</a>
          <a href="mailto:info@gkn-immobilien.de">info@gkn-immobilien.de</a>
        </div>
      </div>
    </div>
  );
}
