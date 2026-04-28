// Layout für alle Frontend-Seiten (außer /studio)
// Header + Footer kommen rein, sobald Design-Snippet von Max da ist.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
