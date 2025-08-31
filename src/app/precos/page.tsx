/* page.tsx (rota /precos) */
import Pricing from "@/components/Pricing";

export const dynamic = "force-static";

export default function PrecosPage() {
  return <Pricing />;
}
