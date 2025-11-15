import MascotesSectionAnimated from "@/components/MascotesSectionAnimated";

export const metadata = {
  title: "Mascotes — CRSET Solutions",
  description: "Conhece a nossa equipa de mascotes: Boris, Laya e Irina",
  alternates: { canonical: "/mascotes" },
};

// Cache busting: Force fresh page generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <main className="min-h-screen">
      <MascotesSectionAnimated />
    </main>
  );
}
