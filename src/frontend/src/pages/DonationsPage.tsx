import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Heart, 
  DollarSign, 
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function DonationsPage() {
  const [amount, setAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const donationStats = [
    {
      title: 'Today',
      value: '$0.00',
      icon: DollarSign,
      color: 'text-primary',
    },
    {
      title: 'This Month',
      value: '$0.00',
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      title: 'Lifetime',
      value: '$0.00',
      icon: Heart,
      color: 'text-destructive',
    },
    {
      title: 'Total Donors',
      value: '0',
      icon: Users,
      color: 'text-chart-4',
    },
  ];

  const recentDonors = [
    // Placeholder for when real data is available
  ];

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast.success('Thank you for your donation!');
      setAmount('');
      setIsProcessing(false);
    }, 2000);
  };

  const quickAmounts = [5, 10, 25, 50, 100];

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Heart className="h-4 w-4 mr-2 text-destructive" />
            $DSWENTWORTH Donation System
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Support Our Mission</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donations help us continue building innovative AI applications and supporting the community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {donationStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Make a Donation
              </CardTitle>
              <CardDescription>
                Support the PETERBUILTWL + $DSWENTWORTH ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label>Quick Select</Label>
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="rounded-full"
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous">Donate Anonymously</Label>
                  <p className="text-xs text-muted-foreground">
                    Hide your name from the donor list
                  </p>
                </div>
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              <Button
                className="w-full rounded-full"
                size="lg"
                onClick={handleDonate}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  'Processing...'
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Donate ${amount || '0.00'}
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Secure payment processing via Stripe & PayPal
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Recent Donors
              </CardTitle>
              <CardDescription>
                Thank you to our generous supporters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentDonors.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Be the first donor!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your support helps us build amazing AI applications
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentDonors.map((donor: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div>
                        <p className="font-medium">{donor.name}</p>
                        <p className="text-xs text-muted-foreground">{donor.date}</p>
                      </div>
                      <Badge variant="outline">${donor.amount}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="h-12 w-12 text-destructive mx-auto" />
            <h3 className="text-2xl font-bold">Why Donate?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your donations directly support the development of new AI applications, infrastructure improvements, 
              and community initiatives. Every contribution, no matter the size, makes a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge variant="outline" className="px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                New Features
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Infrastructure
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
