export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-5xl font-light tracking-tight md:text-7xl">
        GKN Immobiliengruppe
      </h1>
      <p className="max-w-2xl text-lg text-neutral-400">
        Immobilienankauf auf die schnelle, transparente und feine Art.
      </p>
      <p className="mt-8 text-sm text-neutral-500">
        Scaffold ready · Design + Inhalte werden gleich befüllt
      </p>
      <a
        href="/studio"
        className="mt-2 rounded-full border border-neutral-700 px-5 py-2 text-sm text-neutral-300 transition hover:border-neutral-400 hover:text-white"
      >
        Studio öffnen →
      </a>
    </main>
  );
}
