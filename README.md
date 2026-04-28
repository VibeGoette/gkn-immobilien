# GKN Immobiliengruppe

Website der **GKN Immobiliengruppe** — Immobilienankauf im Ruhrgebiet.

Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Sanity v4 (embedded Studio).

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte ausfüllen oder via Vercel Marketplace ziehen
npm run dev
```

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Architektur

Single-Repo, Single-Deployment. Frontend + CMS in einer Codebase.
Cluster-Pillar SEO-Architektur mit modularem Page-Builder.

Details: siehe [`CLAUDE.md`](./CLAUDE.md).

## Deployment

Vercel + Sanity Marketplace Integration (1-Click-Setup).
Domain: gkn-immobilien.de
