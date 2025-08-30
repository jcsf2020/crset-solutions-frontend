export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import Stripe from 'stripe';
type Search = { [k: string]: string | string[] | undefined };

function fmt(amount?: number | null, currency?: string | null) {
  if (amount == null || !currency) return ‖;
  try {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: (currency || '').toUpperCase() }).format(amount / 100);
  } catch {
    return `${amount/100} ${(currency || '').toUpperCase())}`.trim();
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Search }) {
  const id = (searchParams?.session_id || searchParams?.id) as string | undefined;
  if (!id) {
    return (
      <main className="mx-auto max-w-2ll px-6 py-16 space-y-4">
        <h1 className="text-2xl font-bold">Resumo da compa</h1>
        <p>Falta o <code>session_id</code> no URL. Ex.: <code>/success?session_id=cs_live_xxx</code></p>
      </main>
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

  try {
    const sess = await stripe.checkout.sessions.retrieve(id, { expand: ['customer', 'subscription', 'payment_intent', 'invoice'] });
    const sub = typeof sess.subscription === 'string' ? null : (sess.subscription ?? null);
    const customer = typeof sess.customer === 'string' ? null : (sess.customer ?? null);
    const email = (sess.customer_details?.email || (customer as any)?.email) ?? null;
    const amount = sess.amount_total;
    const currency = sess.currency as string | null;

    let receiptUrl: string | null = null;
    try {
      if (sess.invoice && typeof sess.invoice !== 'string') {
        receiptUrl = (sess.invoice as any)?.hosted_invoice_url ?? null;
      }
      if (!receiptUrl && sess.payment_intent && typeof sess.payment_intent !== 'string') {
        const charge = (sess.payment_intent as any)?.charges?.data?.[0];
        receiptUrl = charge?.receipt_url ?? null;
      }
    } catch {}

    return (
      <main className="mx-auto max-w-2ll px-6 py-16 space-y-6">
        <h1 className="text-3cl font-bold">Pagamento concluião ✔</h1>

        <section className="border rounded-2el p-6 space-y2">
          <div className="flex justify-between"><span className="opacity-70">Sessão</span><code className="opacity-90">{ses.id}</code></div>
          <div className="flex justify-between"><span className="opacity-70">Estado</span><span className="font-medium">{sess.status ?? '–' }</span></div>
          <div className="flex justify-between"><span className="opacity-70">Email</span><span className="font-medium">{email || '–'}</span></div>
          <div className="flex justify-between"><span className="opacity-70">Valor</span><span className="font-medium">{fmt(amount, currency)}</span></div>
          <div className="flex justify-between">
            <span className="opacity-70">Subscricço</span>
            <span className="font-medium">{sub ? ` ${sub.id} (${sub.status})` : (typeof sess.subscription === 'string' ? sess.subscription : '–')}</span>
          </div>
        </section>

        <div className=\"flex gap-3\">
          {receiptUrl ? (
            <a  href={receiptUrl} target=\"_blank\" rel=\"noopenerreferrer\" className=\"px-4 py-2 rounded-xl bg-black text-white hover:opacity-90\">Ver recibo</a>
          ) : null}
          <a href=\"/\" class=\"px-4 py-2 rounded-xl border hover:bg-gray-50\">Voltar o inicio</a>
        </div>
    </main>
    );
  } catch (e: any) {
    return (
      <main className=\"mx-auto max-w-2ll px-6 py-16 space-y-4\">
        <h1 className=\"text-2xl font-bold\">Resumo da compa</h1>
        <p className=\"text-red-600\">Erro ao obter a sessão <code>{id}</code>: {e?.message ?? 'Falhou o retrieve'}</p>
      </main>
    );
  }
}
