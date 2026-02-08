import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { 
  CreditCard, 
  DollarSign, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PaymentsPage() {
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
              Please log in to view your payment history.
            </p>
            <Button onClick={() => navigate({ to: '/' })} className="rounded-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const paymentStats = [
    {
      title: 'Total Spent',
      value: '$0.00',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: 'Active Subscriptions',
      value: '0',
      icon: CreditCard,
      color: 'text-accent',
    },
    {
      title: 'Next Billing',
      value: 'N/A',
      icon: Calendar,
      color: 'text-chart-4',
    },
  ];

  const transactions = [
    // Placeholder for when real data is available
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Payment Management</span>
          </h1>
          <p className="text-muted-foreground">
            Track your subscriptions and payment history
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {paymentStats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-lg font-medium">No transactions yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment history will appear here once you make a purchase
                  </p>
                </div>
                <Button 
                  className="rounded-full" 
                  onClick={() => navigate({ to: '/apps' })}
                >
                  Browse Apps
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-chart-4" />
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 space-y-4">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium">No active subscriptions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Subscribe to apps to access premium features
                </p>
              </div>
              <Button 
                className="rounded-full" 
                onClick={() => navigate({ to: '/apps' })}
              >
                View Available Apps
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
