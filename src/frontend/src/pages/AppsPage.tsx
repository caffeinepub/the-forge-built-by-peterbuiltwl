import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Sparkles } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function AppsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const apps = [
    {
      id: 'blog-newsletter',
      name: 'Niche Blog/Newsletter Generator',
      description: 'Generate tailored blog and newsletter content for your audience',
      icon: '/assets/generated/blog-newsletter-icon.dim_128x128.png',
      pricing: '$10-30/month',
      pricingType: 'subscription',
      route: '/blog-generator',
    },
    {
      id: 'resume-optimizer',
      name: 'Resume Optimizer',
      description: 'Optimize your resume for specific job descriptions',
      icon: '/assets/generated/resume-optimizer-icon.dim_128x128.png',
      pricing: '$15',
      pricingType: 'one-time',
      route: '/blog-generator',
    },
    {
      id: 'ad-copy',
      name: 'Ad Copy Generator',
      description: 'Create compelling ad copy for multiple platforms',
      icon: '/assets/generated/ad-copy-icon.dim_128x128.png',
      pricing: '$5/use',
      pricingType: 'per-use',
      route: '/blog-generator',
    },
    {
      id: 'blog-writer',
      name: 'Blog Writer',
      description: 'Generate full blog posts with SEO optimization',
      icon: '/assets/generated/blog-writer-icon.dim_128x128.png',
      pricing: '$20/month',
      pricingType: 'subscription',
      route: '/blog-generator',
    },
    {
      id: 'social-scheduler',
      name: 'Social Media Scheduler',
      description: 'Plan and generate social media content calendars',
      icon: '/assets/generated/social-scheduler-icon.dim_128x128.png',
      pricing: '$25/month',
      pricingType: 'subscription',
      route: '/blog-generator',
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter Builder',
      description: 'Create personalized cover letters for job applications',
      icon: '/assets/generated/cover-letter-icon.dim_128x128.png',
      pricing: '$10',
      pricingType: 'one-time',
      route: '/blog-generator',
    },
    {
      id: 'faq-generator',
      name: 'FAQ Generator',
      description: 'Generate comprehensive FAQ sections for your products',
      icon: '/assets/generated/faq-generator-icon.dim_128x128.png',
      pricing: '$8',
      pricingType: 'one-time',
      route: '/blog-generator',
    },
    {
      id: 'product-description',
      name: 'Product Description AI',
      description: 'Write compelling product descriptions that convert',
      icon: '/assets/generated/product-description-icon.dim_128x128.png',
      pricing: '$3/use',
      pricingType: 'per-use',
      route: '/blog-generator',
    },
    {
      id: 'email-campaign',
      name: 'Email Campaign Writer',
      description: 'Design complete email marketing campaigns',
      icon: '/assets/generated/email-campaign-icon.dim_128x128.png',
      pricing: '$30/month',
      pricingType: 'subscription',
      route: '/blog-generator',
    },
    {
      id: 'presentation',
      name: 'Presentation Builder',
      description: 'Create presentation outlines and content',
      icon: '/assets/generated/presentation-builder-icon.dim_128x128.png',
      pricing: '$12',
      pricingType: 'one-time',
      route: '/blog-generator',
    },
    {
      id: 'podcast-script',
      name: 'Podcast Script Maker',
      description: 'Generate structured podcast scripts and show notes',
      icon: '/assets/generated/podcast-script-icon.dim_128x128.png',
      pricing: '$18/month',
      pricingType: 'subscription',
      route: '/blog-generator',
    },
  ];

  const getPricingBadge = (type: string) => {
    switch (type) {
      case 'subscription':
        return <Badge variant="default">Subscription</Badge>;
      case 'one-time':
        return <Badge variant="secondary">One-Time</Badge>;
      case 'per-use':
        return <Badge variant="outline">Per Use</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">AI Applications</span>
            </h1>
            <p className="text-muted-foreground">
              Explore our complete suite of AI-powered tools
            </p>
          </div>
          {identity && (
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={() => navigate({ to: '/app-wizard' })}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create App
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card
              key={app.id}
              className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group"
            >
              <CardHeader>
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="h-12 w-12"
                  />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{app.name}</CardTitle>
                  {getPricingBadge(app.pricingType)}
                </div>
                <CardDescription className="text-base">{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <span className="text-lg font-bold text-primary">{app.pricing}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground"
                  variant="outline"
                  onClick={() => navigate({ to: app.route })}
                >
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center space-y-4">
            <Sparkles className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-2xl font-bold">Need a custom AI application?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our App Wizard to create custom AI applications tailored to your specific needs
            </p>
            <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/app-wizard' })}>
              Launch App Wizard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
