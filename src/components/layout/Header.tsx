"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/immobilienankauf", label: "Was wir ankaufen" },
  { href: "/#prozess", label: "Ablauf" },
  { href: "/#region", label: "Region" },
  { href: "/#team", label: "Team" },
  { href: "/portfolio", label: "Bestand" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Site-Header mit Desktop-Nav + Mobile-Burger-Drawer.
 *
 * Anti-Pattern-Schutz: globale Nav nur HIER, niemals in einer Page-Component.
 * Mobile-Drawer lockt Body-Scroll, schließt bei Escape / Link-Klick / Outside-Klick.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  // Schließen bei Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Body-Scroll-Lock wenn Drawer offen
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/" onClick={close}>
          <Image
            className="brand-logo"
            src="/images/gkn-logo-blue.png"
            alt="GKN Immobiliengruppe"
            width={220}
            height={45}
            priority
          />
          <div className="brand-divider"></div>
          <div className="brand-sub">Direktankauf · Bochum</div>
        </Link>

        {/* Desktop-Nav (versteckt < 1180px via design.css) */}
        <nav className="primary" aria-label="Hauptnavigation">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop-CTA (versteckt < 1180px via mobile-nav CSS) */}
        <Link href="/#kontakt" className="btn btn-ghost-light header-cta">
          Jetzt anbieten <span className="arrow">→</span>
        </Link>

        {/* Burger-Button (sichtbar < 1180px) */}
        <button
          type="button"
          className="burger"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger-icon ${open ? "is-open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile-Drawer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile-Navigation"
        aria-hidden={!open}
      >
        <div className="mobile-drawer-backdrop" onClick={close} />
        <div className="mobile-drawer-panel">
          <nav
            className="mobile-nav"
            aria-label="Mobile-Hauptnavigation"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="mobile-nav-link"
              >
                {l.label}
                <span className="mobile-nav-arrow">→</span>
              </Link>
            ))}
          </nav>
          <div className="mobile-drawer-footer">
            <Link
              href="/#kontakt"
              onClick={close}
              className="btn btn-primary mobile-cta"
            >
              Jetzt Immobilie anbieten <span className="arrow">→</span>
            </Link>
            <div className="mobile-drawer-contact">
              <a href="tel:02343671506220">+49 234 3671 506 220</a>
              <a href="mailto:info@gkn-immobilien.de">
                info@gkn-immobilien.de
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
