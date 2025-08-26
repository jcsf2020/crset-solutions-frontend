import { agiChat } from '@/actions/agi';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const out = await agiChat('Responde apenas com: OK');
  return <pre className="p-6">{out}</pre>;
}
