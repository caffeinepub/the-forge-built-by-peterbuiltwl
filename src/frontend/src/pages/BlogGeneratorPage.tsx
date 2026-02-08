import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, FileText, DollarSign, Sparkles, Copy, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateCheckoutSession, useGetCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { ShoppingItem } from '../backend';

type WorkflowStep = 'input' | 'payment' | 'generating' | 'output';

export default function BlogGeneratorPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const createCheckout = useCreateCheckoutSession();

  const [currentStep, setCurrentStep] = useState<WorkflowStep>('input');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const isAuthenticated = !!identity;

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to continue');
      return;
    }

    if (!topic.trim() || !tone || !targetAudience.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;

      const items: ShoppingItem[] = [
        {
          productName: 'Blog Generator Monthly Subscription',
          productDescription: 'Unlimited blog and newsletter generation',
          priceInCents: BigInt(1000),
          currency: 'USD',
          quantity: BigInt(1),
        },
      ];

      const result = await createCheckout.mutateAsync({ items, successUrl, cancelUrl });
      const session = JSON.parse(result);

      // Redirect to Stripe checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to create checkout session. Please try again.');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success('Content copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Note: PDF generation would need backend support
    toast.info('PDF download feature coming soon!');
  };

  const steps = [
    { id: 'input', label: 'Input', icon: FileText },
    { id: 'payment', label: 'Payment', icon: DollarSign },
    { id: 'generating', label: 'AI Processing', icon: Sparkles },
    { id: 'output', label: 'Output', icon: CheckCircle2 },
  ];

  const getStepIndex = (step: WorkflowStep) => steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/assets/generated/blog-newsletter-icon.dim_128x128.png"
              alt="Blog Generator"
              className="h-16 w-16 rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold">Niche Blog/Newsletter Generator</h1>
              <p className="text-muted-foreground">Generate tailored blog and newsletter content with AI</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = getStepIndex(currentStep) === index;
                const isCompleted = getStepIndex(currentStep) > index;

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : isCompleted
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background text-muted-foreground'
                        }`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 transition-all ${isCompleted ? 'bg-primary' : 'bg-border'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Input Step */}
        {currentStep === 'input' && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Step 1: Enter Your Content Details</CardTitle>
              <CardDescription>Tell us what kind of content you want to generate</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInputSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Sustainable Living Tips for Urban Dwellers"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Textarea
                    id="audience"
                    placeholder="e.g., Young professionals aged 25-35 interested in eco-friendly lifestyle"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    rows={3}
                  />
                </div>

                {!isAuthenticated && (
                  <Alert>
                    <AlertDescription>Please login to continue with content generation.</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={!isAuthenticated}>
                  Continue to Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Payment Step */}
        {currentStep === 'payment' && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Step 2: Choose Your Subscription</CardTitle>
              <CardDescription>Subscribe to generate unlimited content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <img
                  src="/assets/generated/payment-illustration.dim_400x300.png"
                  alt="Payment"
                  className="h-48 w-auto"
                />
              </div>

              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Monthly Subscription</h3>
                      <p className="text-sm text-muted-foreground">Unlimited blog and newsletter generation</p>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      Popular
                    </Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Unlimited content generation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>500-800 word articles</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Multiple tone options</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>PDF export & copy to clipboard</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Button
                    onClick={handlePayment}
                    className="w-full"
                    size="lg"
                    disabled={createCheckout.isPending}
                  >
                    {createCheckout.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Subscribe Now'
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => setCurrentStep('input')} className="w-full">
                Back to Input
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Mock Output Step (for demonstration) */}
        {currentStep === 'output' && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Step 4: Your Generated Content</CardTitle>
              <CardDescription>Copy or download your AI-generated blog article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-lg border border-border">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h2 className="text-xl font-bold mb-4">{topic}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{generatedContent}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCopyToClipboard} variant="outline" className="flex-1">
                  {copied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <Button onClick={() => setCurrentStep('input')} className="w-full" size="lg">
                Generate Another Article
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
