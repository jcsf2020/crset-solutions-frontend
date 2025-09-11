# Smoke Tests (producao)
BASE="https://crset-solutions-frontend.vercel.app"
for s in essential pro enterprise imobiliaria agenda ecommerce catalogo; do
  curl -s -o /dev/null -w "%{http_code} /servicos/%s\n" "$BASE/servicos/$s" "$s"; done
curl -s -o /dev/null -w "%{http_code} /servicos/slug-invalido\n" "$BASE/servicos/slug-invalido"
curl -s "$BASE/servicos/essential" | grep -o 'utm_campaign=servicos' | head -1
curl -s "$BASE/servicos/essential" | grep -o 'utm_content=essential' | head -1
curl -s "$BASE/sitemap.xml" | grep -oE '/servicos(/[a-z-]+)?' | sort -u
curl -s "$BASE/robots.txt" | sed -n '1,12p'
curl -s "$BASE/api/debug/sentry" | grep -o '"eventId":"[^"]*"'
curl -s -X POST "$BASE/api/debug/sentry" | grep -o '"eventId":"[^"]*"'
TS=$(date -u +%Y%m%dT%H%M%SZ); curl -s -X POST "$BASE/api/contact" -H "Content-Type: application/json" --data-raw "{\"name\":\"QA $TS\",\"email\":\"qa+$TS@crsetsolutions.com\",\"message\":\"Smoke $TS\",\"source\":\"servicos/essential\",\"utm\":{\"utm_source\":\"site\",\"utm_medium\":\"cta\",\"utm_campaign\":\"servicos\",\"utm_content\":\"essential\"},\"metadata\":{\"test_id\":\"LEAD-$TS\",\"env\":\"production\"}}"
