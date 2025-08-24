'use client';

export default function Hub() {
  const LINKS = [
    { group: 'App', items: [
      { label: '🏠 Site (prod)', href: 'https://crsetsolutions.com' },
      { label: '📋 Admin — Leads', href: '/admin' },
      { label: '📈 Admin — Métricas', href: '/admin/metrics' },
    ]},
    { group: 'APIs', items: [
      { label: 'Leads API (FE)', href: '/api/leads' },
      { label: 'Métricas API (FE)', href: '/api/metrics' },
      { label: 'Health API (BE/Railway)', href: 'https://crset-api-production.up.railway.app/health' },
    ]},
    { group: 'Ops', items: [
      { label: '🔗 GitHub (frontend)', href: 'https://github.com/jcsf2020/crset-solutions-frontend' },
      { label: '▲ Vercel — Project', href: 'https://vercel.com/joao-fonsecas-projects/crset-solutions-frontend' },
      { label: '🚆 Railway — API', href: 'https://crset-api-production.up.railway.app' },
      { label: '📮 Resend — Dashboard', href: 'https://resend.com/dashboard' },
      { label: '🗂️ Notion — CRM DB', href: 'https://www.notion.so/24087471aef18008b409f2879db15cea?v=24087471aef181a09451000c88a156f9' },
    ]},
  ];

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>CRSET — Hub de Operações</h1>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 12 }}>
        {LINKS.map((g, gi) => (
          <div key={gi} style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{g.group}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {g.items.map((it, ii) => (
                <li key={ii}>
                  <a
                    href={it.href}
                    target={it.href.startsWith('http') ? '_blank' : undefined}
                    rel={it.href.startsWith('http') ? 'noreferrer' : undefined}
                    style={{ textDecoration: 'none', border: '1px solid #ddd', borderRadius: 10, padding: '8px 10px', display: 'block' }}
                  >
                    {it.label}
                    <span style={{ opacity: .6, fontSize: 12, marginLeft: 6 }}>{it.href}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
