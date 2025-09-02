import MascoteBoris from "@/components/MascoteBoris";
import MascoteLaya from "@/components/MascoteLaya";
import MascoteIrina from "@/components/MascoteIrina";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">Teste Mascotes — Conjunto</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <MascoteBoris />
        <MascoteLaya />
        <MascoteIrina />
      </div>
    </main>
  );
}
