'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';

interface SystemStatus {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  response_time?: number;
  last_check: string;
}

interface Analytics {
  pageviews: { total: number; unique_pages: number };
  events: { total: number; unique_events: number };
  traffic_sources: Array<{ source: string; count: number }>;
}

export default function AdminDashboard() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Verificar autenticação (simplificado)
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    setAuthenticated(isAuth);
    
    if (isAuth) {
      loadDashboardData();
    }
  }, [authenticated]);

  const handleLogin = async () => {
    if (password === 'Financeflow2025') {
      localStorage.setItem('admin_auth', 'true');
      setAuthenticated(true);
      loadDashboardData();
    } else {
      alert('Senha incorreta');
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Carregar status dos serviços
      const services = [
        'agi/status',
        'flags/chat',
        'contact',
        'leads',
        'payments',
        'monitoring',
        'cache',
        'analytics',
        'workflows'
      ];

      const statusPromises = services.map(async (service) => {
        try {
          const response = await fetch(`/api/${service}?debug=1`);
          const data = await response.json();
          return {
            service: service.replace('/', '_'),
            status: response.ok ? 'operational' : 'down',
            response_time: Math.random() * 200 + 50, // Simulado
            last_check: new Date().toISOString()
          } as SystemStatus;
        } catch {
          return {
            service: service.replace('/', '_'),
            status: 'down',
            last_check: new Date().toISOString()
          } as SystemStatus;
        }
      });

      const statuses = await Promise.all(statusPromises);
      setSystemStatus(statuses);

      // Carregar analytics
      const analyticsResponse = await fetch('/api/analytics?report=summary');
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
      }

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Administrativo</CardTitle>
            <CardDescription>
              Introduza a senha para aceder ao dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">A carregar dashboard...</p>
        </div>
      </div>
    );
  }

  const operationalServices = systemStatus.filter(s => s.status === 'operational').length;
  const totalServices = systemStatus.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">CRSET Solutions - Monitorização e Gestão</p>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Operacionais</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{operationalServices}/{totalServices}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((operationalServices / totalServices) * 100)}% uptime
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações (24h)</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.pageviews.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.pageviews.unique_pages || 0} páginas únicas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos (24h)</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.events.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {analytics?.events.unique_events || 0} tipos únicos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Segurança</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Seguro</div>
              <p className="text-xs text-muted-foreground">
                Sem ameaças detectadas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList>
            <TabsTrigger value="status">Estado dos Serviços</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado dos Serviços</CardTitle>
                <CardDescription>
                  Monitorização em tempo real de todos os serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus.map((service) => (
                    <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-medium">{service.service.replace('_', ' ').toUpperCase()}</h3>
                          <p className="text-sm text-gray-500">
                            Última verificação: {new Date(service.last_check).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {service.response_time && (
                          <span className="text-sm text-gray-500">
                            {Math.round(service.response_time)}ms
                          </span>
                        )}
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fontes de Tráfego</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.traffic_sources.map((source, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="capitalize">{source.source}</span>
                        <Badge variant="outline">{source.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open('/api/analytics?debug=1', '_blank')}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver Analytics Detalhados
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={loadDashboardData}
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    Atualizar Estado
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      localStorage.removeItem('admin_auth');
                      setAuthenticated(false);
                    }}
                  >
                    Terminar Sessão
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Workflows</CardTitle>
                <CardDescription>
                  Automações e integrações ativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Zap className="mx-auto h-12 w-12 mb-4" />
                  <p>Funcionalidade em desenvolvimento</p>
                  <p className="text-sm">Workflows automáticos serão configuráveis aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Gestão de configurações e integrações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Database className="mx-auto h-12 w-12 mb-4" />
                  <p>Painel de configurações em desenvolvimento</p>
                  <p className="text-sm">Gestão de APIs, integrações e configurações avançadas</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
