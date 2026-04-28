# GKN Immobiliengruppe — Project Brief

## Stack
- **Next.js 16** App Router, React 19, TypeScript strict
- **Tailwind CSS v4** (PostCSS-Plugin)
- **Sanity v4** embedded Studio bei `/studio`
- **Vercel Marketplace Integration** (Sanity native, Env-Vars auto)

## Architektur
Single-Repo, Single-Deployment. Frontend + Studio in einer Codebase.

```
app/
├── (site)/                    # Frontend Route Group
│   ├── page.tsx               # Startseite (homePage Singleton)
│   ├── [serviceSlug]/         # Leistungsseiten (servicePage)
│   │   └── [city]/            # Service+Stadt Kombi (serviceLocationPage)
│   ├── immobilienankauf/[city]/  # Stadtseiten (locationPage)
│   ├── portfolio/             # Referenzen-Hub
│   ├── referenzen/[slug]/     # Referenz-Detail (referencePage)
│   ├── ratgeber/[slug]/       # Ratgeber (guidePage)
│   ├── blog/[slug]/           # Blog (blogPost)
│   └── kontakt/
├── studio/[[...tool]]/        # Embedded Sanity Studio
├── sitemap.ts                 # Auto-Sitemap aus Sanity
└── robots.ts

src/sanity/
├── env.ts
├── lib/{client,image,live}.ts
├── schemas/                   # Alle Schemas
└── structure.ts               # Studio-Navigation
```

## SEO-Strategie (Cluster-Pillar)
- **Pillar-Seiten**: Startseite, 4 Leistungsseiten (MFH, Gewerbe, Grundstücke, Portfolios)
- **Cluster**: Stadt-Seiten (Bochum, Dortmund, Essen) + Service+Stadt Kombi-Seiten
- **Supporting**: Ratgeber-Artikel verlinken IMMER min. 1 transaktionale Seite (im Schema enforced)
- **BOFU-First**: Priority Score BV 45% / RE 35% / TP 20%

## Sanity-Datenmodell
- **Singletons**: `siteSettings`, `homePage`
- **Pages**: `servicePage`, `locationPage`, `serviceLocationPage`, `referencePage`, `guidePage`, `blogPost`
- **Other**: `teamMember`
- **Reusable Objects**: `seoFields`, `hero`, `faqSection`, `trustBar`, `processSection`, `richTextSection`, `ctaSection`, `referenceShowcase`

## Deployment
- **Hoster**: Vercel
- **Domain**: gkn-immobilien.de (DNS-Cutover am Ende)
- **Sanity Setup**: Über Vercel Marketplace (1-Click) → provisioned automatisch Project ID, Dataset, Tokens als Env-Vars

## Env-Vars (auto via Vercel-Sanity-Integration)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (default: production)
- `NEXT_PUBLIC_SANITY_API_VERSION` (default: 2026-04-28)
- `SANITY_API_READ_TOKEN` (für Draft-Mode)
- `NEXT_PUBLIC_SITE_URL` (https://gkn-immobilien.de)

## Git
```bash
git config user.email "designedbygotti@gmail.com"
git config user.name "VibeGoette"
```

## TODO (next sessions)
- [ ] Design-System aus Claude-Design-Output übernehmen → `app/globals.css` (CSS-Variables, Fonts, Tokens)
- [ ] Header + Footer Components aus Design ableiten
- [ ] Section-Renderer-Komponenten bauen (für `pageBuilder` Output)
- [ ] PortableText-Custom-Components für Body-Inhalte
- [ ] FAQPage Schema.org JSON-LD pro Seite mit FAQ
- [ ] Local SEO Schema (RealEstateAgent + LocalBusiness) für Stadtseiten
- [ ] Sanity-Projekt via Vercel Marketplace verbinden
- [ ] Inhalte ins Studio einpflegen (URL-Map/Keyword-Cluster aus Briefing)
- [ ] DNS-Cutover gkn-immobilien.de → Vercel

## Rollout-Reihenfolge (laut Briefing)
1. Startseite
2. 4 Leistungsseiten
3. 3 Stadtseiten (Bochum, Dortmund, Essen)
4. Kombiseiten (Bochum zuerst)
5. Referenzen migrieren
6. Ratgeber für Longtails
