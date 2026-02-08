import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container max-w-2xl">
        <Card className="border-destructive/30 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-destructive/10">
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Payment Cancelled</CardTitle>
            <CardDescription className="text-lg">Your payment was not completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertDescription>
                Don't worry! No charges were made to your account. You can try again whenever you're ready.
              </AlertDescription>
            </Alert>

            <div className="p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-3">Common Issues:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Payment window was closed before completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Card details were incorrect or expired</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>Insufficient funds or payment declined by bank</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate({ to: '/blog-generator' })} className="flex-1" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={() => navigate({ to: '/' })} variant="outline" className="flex-1" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

