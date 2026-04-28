/**
 * RegionMap — Editorial-SVG-Karte der Metropolregion Ruhr.
 *
 * Pure SVG, keine externe Library. Skaliert verlustfrei, nutzt die globalen
 * Schriftvariablen (--serif, --grotesk) damit Cormorant + Inter geladen werden.
 *
 * Aufbau:
 * - Subtle grid pattern als Hintergrund
 * - Leicht gekipptes Trapez = Ankaufsgebiet
 * - Gestrichelte Wellenlinie = Ruhrachse
 * - 3 Hauptstädte (Bochum als gold-Sitz mit Ring, Essen + Dortmund als outlined)
 * - Sekundäre Städte als kleine graue Dots
 * - Compass "N" oben rechts, Maßstab "~ 30 km" unten links
 */
export function RegionMap() {
  return (
    <svg
      viewBox="0 0 800 540"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Karte der Metropolregion Ruhr mit Bochum als Sitz, Essen und Dortmund"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Grid pattern */}
      <defs>
        <pattern
          id="region-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        </pattern>
        <radialGradient id="bochum-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a341" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4a341" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="540" fill="url(#region-grid)" />

      {/* Header text — top-left */}
      <text
        x="60"
        y="80"
        fontFamily="var(--serif)"
        fontSize="26"
        fontStyle="italic"
        fontWeight="400"
        fill="#ffffff"
        letterSpacing="0.01em"
      >
        Metropolregion Ruhr
      </text>
      <text
        x="60"
        y="106"
        fontFamily="var(--grotesk)"
        fontSize="11"
        fontWeight="500"
        fill="rgba(255,255,255,0.65)"
        letterSpacing="0.22em"
      >
        ANKAUFSGEBIET · GKN
      </text>

      {/* Compass N — top-right */}
      <g transform="translate(740, 70)">
        <text
          fontFamily="var(--serif)"
          fontSize="18"
          fontStyle="italic"
          fill="rgba(255,255,255,0.65)"
          textAnchor="middle"
          x="0"
          y="0"
        >
          N
        </text>
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="40"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
        />
      </g>

      {/* Trapez = Ankaufsgebiet (leicht gekippt) */}
      <polygon
        points="90,200 740,150 760,400 110,440"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />

      {/* Gestrichelte Wellenlinie = Ruhrachse */}
      <path
        d="M 100,360 Q 230,320 360,355 T 620,340 T 770,330"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        strokeDasharray="3 5"
      />

      {/* Sekundäre Punkte (weitere Städte) */}
      {[
        [200, 250],
        [330, 220],
        [505, 200],
        [640, 220],
        [180, 380],
        [310, 410],
        [450, 400],
        [610, 380],
        [700, 350],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="rgba(255,255,255,0.25)"
        />
      ))}

      {/* Essen — links */}
      <g>
        <circle
          cx="280"
          cy="290"
          r="6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <text
          x="280"
          y="270"
          fontFamily="var(--serif)"
          fontSize="22"
          fontWeight="400"
          fill="#ffffff"
          textAnchor="middle"
        >
          Essen
        </text>
      </g>

      {/* Bochum — Sitz (mit goldenem Ring + Glow) */}
      <g>
        <circle cx="440" cy="310" r="35" fill="url(#bochum-glow)" />
        <circle
          cx="440"
          cy="310"
          r="22"
          fill="none"
          stroke="#d4a341"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <circle cx="440" cy="310" r="9" fill="#d4a341" />
        <text
          x="440"
          y="285"
          fontFamily="var(--serif)"
          fontSize="24"
          fontWeight="400"
          fill="#ffffff"
          textAnchor="middle"
        >
          Bochum
        </text>
        <text
          x="440"
          y="358"
          fontFamily="var(--grotesk)"
          fontSize="10"
          fontWeight="500"
          fill="#d4a341"
          textAnchor="middle"
          letterSpacing="0.22em"
        >
          SITZ
        </text>
      </g>

      {/* Dortmund — rechts */}
      <g>
        <circle
          cx="610"
          cy="265"
          r="6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <text
          x="610"
          y="245"
          fontFamily="var(--serif)"
          fontSize="22"
          fontWeight="400"
          fill="#ffffff"
          textAnchor="middle"
        >
          Dortmund
        </text>
      </g>

      {/* Maßstab — unten links */}
      <g transform="translate(75, 490)">
        <line
          x1="0"
          y1="0"
          x2="60"
          y2="0"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="-4"
          x2="0"
          y2="4"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />
        <line
          x1="60"
          y1="-4"
          x2="60"
          y2="4"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />
        <text
          x="0"
          y="22"
          fontFamily="var(--grotesk)"
          fontSize="11"
          fill="rgba(255,255,255,0.5)"
          letterSpacing="0.05em"
        >
          ~ 30 km
        </text>
      </g>
    </svg>
  );
}
