import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, Text, View, StyleSheet, Link, pdf } from '@react-pdf/renderer';

export const dynamic = 'force-dynamic'; // garantir node runtime

type Payload = {
  title?: string;
  date?: string;
  summary?: string;
  metrics?: {
    lighthouse?: { mobile?: number; desktop?: number; a11y?: number; seo?: number };
    smoke?: { count?: number; avg_ttfb_ms?: number };
    integrations?: { sentry?: string; resend?: string; supabase_lead_id?: string };
  };
  links?: string[];
  notes?: string[];
};

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11 },
  h1: { fontSize: 18, marginBottom: 8 },
  h2: { fontSize: 14, marginTop: 12, marginBottom: 6 },
  mono: { fontFamily: 'Courier', fontSize: 10 },
  li: { marginBottom: 2 }
});

function ReportDoc(data: Payload) {
  const { title = 'CRSET — Proof of Delivery', date, summary, metrics, links = [], notes = [] } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{title}</Text>
        <Text>{date || new Date().toISOString()}</Text>

        {summary ? (
          <>
            <Text style={styles.h2}>Resumo</Text>
            <Text>{summary}</Text>
          </>
        ) : null}

        <Text style={styles.h2}>Métricas</Text>
        <View>
          <Text>• Lighthouse — Mobile: {metrics?.lighthouse?.mobile ?? '-'} | Desktop: {metrics?.lighthouse?.desktop ?? '-'} | A11y: {metrics?.lighthouse?.a11y ?? '-'} | SEO: {metrics?.lighthouse?.seo ?? '-'}</Text>
          <Text>• Smoke — Rotas: {metrics?.smoke?.count ?? '-'} | TTFB médio: {metrics?.smoke?.avg_ttfb_ms ?? '-'} ms</Text>
          <Text>• Integrações — Sentry: {metrics?.integrations?.sentry ?? '-'} | Resend: {metrics?.integrations?.resend ?? '-'} | Supabase Lead: {metrics?.integrations?.supabase_lead_id ?? '-'}</Text>
        </View>

        {links.length ? (
          <>
            <Text style={styles.h2}>Links</Text>
            <View>
              {links.map((u, i) => (
                <View key={i} style={styles.li}>
                  <Link src={u}>{u}</Link>
                </View>
              ))}
            </View>
          </>
        ) : null}

        {notes.length ? (
          <>
            <Text style={styles.h2}>Observações</Text>
            {notes.map((n, i) => (
              <Text key={i}>• {n}</Text>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Payload;
  const doc = ReportDoc(body);
  const buffer = await pdf(doc).toBuffer();
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'inline; filename="crset-proof.pdf"'
    }
  });
}
