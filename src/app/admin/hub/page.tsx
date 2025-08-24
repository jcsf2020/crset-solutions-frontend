'use client';
import Gate from '../_components/Gate';

export default function Hub() {
  return (
    <Gate>
      <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>CRSET — Hub de Operações</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 12 }}>
          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>App</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              <li><a href="https://crsetsolutions.com" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>🏠 Site (prod) <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>https://crsetsolutions.com</span></a></li>
              <li><a href="/admin" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>📋 Admin — Leads <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>/admin</span></a></li>
              <li><a href="/admin/metrics" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>📈 Admin — Métricas <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>/admin/metrics</span></a></li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>APIs</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              <li><a href="/api/leads" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>Leads API (FE) <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>/api/leads</span></a></li>
              <li><a href="/api/metrics" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>Métricas API (FE) <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>/api/metrics</span></a></li>
              <li><a href="https://crset-api-production.up.railway.app/health" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>Health API (BE/Railway) <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>https://crset-api-production.up.railway.app/health</span></a></li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Ops</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              <li><a href="https://github.com/jcsf2020/crset-solutions-frontend" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>🔗 GitHub (frontend) <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>github.com/jcsf2020/…</span></a></li>
              <li><a href="https://vercel.com/joao-fonsecas-projects/crset-solutions-frontend" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>▲ Vercel — Project <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>vercel.com/…</span></a></li>
              <li><a href="https://crset-api-production.up.railway.app" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>🚆 Railway — API <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>railway.app/…</span></a></li>
              <li><a href="https://resend.com/dashboard" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>📮 Resend — Dashboard <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>resend.com/…</span></a></li>
              <li><a href="https://www.notion.so/24087471aef18008b409f2879db15cea?v=24087471aef181a09451000c88a156f9" target="_blank" rel="noreferrer" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius:10, padding:'8px 10px', display:'block' }}>🗂️ Notion — CRM DB <span style={{ opacity:.6, fontSize:12, marginLeft:6 }}>notion.so/…</span></a></li>
            </ul>
          </div>
        </div>
      </main>
    </Gate>
  );
}
