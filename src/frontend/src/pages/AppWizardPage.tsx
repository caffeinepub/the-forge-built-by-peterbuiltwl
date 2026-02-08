import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function AppWizardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [step, setStep] = useState(1);
  const [appData, setAppData] = useState({
    name: '',
    description: '',
    icon: '',
    inputFields: '',
    paymentModel: '',
    outputType: '',
  });

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to create new applications.
            </p>
            <Button onClick={() => navigate({ to: '/' })} className="rounded-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('App created successfully!');
    navigate({ to: '/apps' });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">App Name</Label>
              <Input
                id="name"
                placeholder="e.g., Resume Optimizer"
                value={appData.name}
                onChange={(e) => setAppData({ ...appData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your app does..."
                value={appData.description}
                onChange={(e) => setAppData({ ...appData, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon URL (optional)</Label>
              <Input
                id="icon"
                placeholder="https://example.com/icon.png"
                value={appData.icon}
                onChange={(e) => setAppData({ ...appData, icon: e.target.value })}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="inputFields">Input Fields Configuration</Label>
              <Textarea
                id="inputFields"
                placeholder="Define input fields (e.g., topic, tone, target audience)"
                value={appData.inputFields}
                onChange={(e) => setAppData({ ...appData, inputFields: e.target.value })}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Specify the input fields your app needs, one per line
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentModel">Payment Model</Label>
              <Select
                value={appData.paymentModel}
                onValueChange={(value) => setAppData({ ...appData, paymentModel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">Subscription (Monthly)</SelectItem>
                  <SelectItem value="one-time">One-Time Payment</SelectItem>
                  <SelectItem value="per-use">Per Use</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {appData.paymentModel && appData.paymentModel !== 'free' && (
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="outputType">Output Type</Label>
              <Select
                value={appData.outputType}
                onValueChange={(value) => setAppData({ ...appData, outputType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select output type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Output</SelectItem>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="both">Text + PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Review Your App</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{appData.name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{appData.description || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Model</p>
                  <p className="font-medium capitalize">{appData.paymentModel || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Output Type</p>
                  <p className="font-medium capitalize">{appData.outputType || 'Not set'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Wand2 className="h-4 w-4 mr-2" />
            App Creation Wizard
          </Badge>
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">Create New AI App</span>
          </h1>
          <p className="text-muted-foreground">
            Follow the steps to configure your custom AI application
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`h-2 w-12 rounded-full transition-colors ${
                  index + 1 <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
              {index < totalSteps - 1 && (
                <div className="h-0.5 w-4 bg-muted" />
              )}
            </div>
          ))}
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Step {step} of {totalSteps}</CardTitle>
            <CardDescription>
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Input Configuration'}
              {step === 3 && 'Payment Setup'}
              {step === 4 && 'Output & Review'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {step < totalSteps ? (
                <Button onClick={handleNext} className="rounded-full">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="rounded-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create App
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wand2 className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Universal Workflow Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Your app will automatically integrate with the universal workflow system: 
                  Input → Payment → AI Prompt → Output
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
