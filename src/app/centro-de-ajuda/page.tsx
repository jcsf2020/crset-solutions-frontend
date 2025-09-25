import type { Metadata } from "next";

export const metadata: Metadata = { 
  openGraph: { url: "/centro-de-ajuda" }, 
  alternates: { canonical: "/centro-de-ajuda" } 
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Centro de ajuda</h1>
      <p>FAQ e contactos. Adiciona artigos aqui.</p>
    </main>
  );
}
