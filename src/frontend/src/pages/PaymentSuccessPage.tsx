import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti or celebration animation could be added here
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container max-w-2xl">
        <Card className="border-primary/30 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10 animate-pulse">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Your subscription has been activated successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>You now have unlimited access to the Blog/Newsletter Generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Start generating high-quality content immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Your subscription will renew automatically each month</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate({ to: '/blog-generator' })} className="flex-1" size="lg">
                Start Generating Content
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => navigate({ to: '/' })} variant="outline" className="flex-1" size="lg">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

