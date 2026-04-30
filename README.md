# GKN Immobiliengruppe

Website der **GKN Immobiliengruppe** — Immobilienankauf im Ruhrgebiet.

Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Sanity v4 (embedded Studio).

## Lokale Entwicklung

```bash
npm install

# Sanity-Env-Vars aus Vercel-Marketplace-Integration ziehen
# (alternativ: .env.example → .env.local manuell befüllen)
vercel link
vercel env pull .env.local

npm run dev
```

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

Erwartete Vars siehe [`.env.example`](./.env.example).

## Architektur

Single-Repo, Single-Deployment. Frontend + CMS in einer Codebase.
Cluster-Pillar SEO-Architektur mit modularem Page-Builder.

Details: siehe [`CLAUDE.md`](./CLAUDE.md).

## Deployment

Vercel + Sanity Marketplace Integration (1-Click-Setup).
Domain: gkn-immobilien.de
