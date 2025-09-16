import Link from "next/link";
import { ExternalLink, Shield, Zap, GitBranch } from "lucide-react";

export function SocialProof() {
  return (
    <section className="border-t border-border/40 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Transparência total • Métricas públicas
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Lighthouse Desktop */}
          <Link 
            href="https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1758060570753-93513.report.html"
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <Zap className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Lighthouse Desktop</div>
              <div className="text-xs text-muted-foreground">100/100/96/100</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Link>

          {/* Lighthouse Mobile */}
          <Link 
            href="https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1758060659567-47467.report.html"
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <Zap className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Lighthouse Mobile</div>
              <div className="text-xs text-muted-foreground">100/100/96/100</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Link>

          {/* GitGuardian Security */}
          <Link 
            href="https://github.com/jcsf2020/crset-solutions-frontend/actions"
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Security Scan</div>
              <div className="text-xs text-muted-foreground">GitGuardian ✓</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Link>

          {/* Changelog */}
          <Link 
            href="https://github.com/jcsf2020/crset-solutions-frontend/pulls?q=is%3Apr+is%3Amerged"
            className="group flex items-center gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
              <GitBranch className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Changelog</div>
              <div className="text-xs text-muted-foreground">PRs & Releases</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Todos os links são públicos • Verificação independente disponível
          </p>
        </div>
      </div>
    </section>
  );
}

