import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  Activity, 
  AlertCircle, 
  Heart,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to access the dashboard.
            </p>
            <Button onClick={() => navigate({ to: '/' })} className="rounded-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Revenue Today',
      value: '$0.00',
      icon: DollarSign,
      trend: '+0%',
      color: 'text-primary',
    },
    {
      title: 'Active Subscriptions',
      value: '0',
      icon: Users,
      trend: '+0',
      color: 'text-accent',
    },
    {
      title: 'Runs Today',
      value: '0',
      icon: Activity,
      trend: '+0',
      color: 'text-chart-4',
    },
    {
      title: 'Error Rate',
      value: '0%',
      icon: AlertCircle,
      trend: '0%',
      color: 'text-muted-foreground',
    },
    {
      title: 'Donations Today',
      value: '$0.00',
      icon: Heart,
      trend: '+0',
      color: 'text-destructive',
    },
  ];

  const activityFeed = [
    {
      type: 'info',
      message: 'Dashboard initialized',
      timestamp: new Date().toLocaleTimeString(),
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Control Center</span>
            </h1>
            <p className="text-muted-foreground">
              Monitor your portfolio performance and activity
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Live Dashboard
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {kpis.map((kpi, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {kpi.trend} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No recent activity</p>
                  <p className="text-xs mt-1">Activity will appear here as you use the platform</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-between rounded-full" 
                variant="outline"
                onClick={() => navigate({ to: '/apps' })}
              >
                <span>Browse Apps</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between rounded-full" 
                variant="outline"
                onClick={() => navigate({ to: '/donations' })}
              >
                <span>View Donations</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between rounded-full" 
                variant="outline"
                onClick={() => navigate({ to: '/payments' })}
              >
                <span>Payment History</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                className="w-full justify-between rounded-full" 
                variant="outline"
                onClick={() => navigate({ to: '/app-wizard' })}
              >
                <span>Create New App</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Ready to scale your portfolio?</h3>
                <p className="text-muted-foreground">
                  Add new AI applications and expand your offerings
                </p>
              </div>
              <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/app-wizard' })}>
                Launch App Wizard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
