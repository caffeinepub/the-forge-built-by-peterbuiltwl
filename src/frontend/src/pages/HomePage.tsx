import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Shield, Rocket, LayoutDashboard } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function HomePage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Cutting-edge AI technology for content generation',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional content in seconds',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
    },
    {
      icon: Rocket,
      title: 'Easy to Use',
      description: 'Simple workflow from input to output',
    },
  ];

  const featuredApps = [
    {
      name: 'Blog Generator',
      description: 'Create engaging blog posts and newsletters',
      icon: '/assets/generated/blog-newsletter-icon.dim_128x128.png',
      route: '/blog-generator',
    },
    {
      name: 'Resume Optimizer',
      description: 'Optimize resumes for job applications',
      icon: '/assets/generated/resume-optimizer-icon.dim_128x128.png',
      route: '/apps',
    },
    {
      name: 'Ad Copy Generator',
      description: 'Create compelling advertising copy',
      icon: '/assets/generated/ad-copy-icon.dim_128x128.png',
      route: '/apps',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/30">
                  <Sparkles className="h-3.5 w-3.5 mr-2 inline" />
                  Unified Portfolio Control Center
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="gradient-text">PETERBUILTWL</span>
                <br />
                <span className="text-foreground">+ $DSWENTWORTH</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                A comprehensive portfolio management system consolidating all AI applications under one unified control center.
              </p>
              <div className="flex flex-wrap gap-4">
                {identity ? (
                  <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/dashboard' })}>
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/apps' })}>
                    Explore Apps
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => navigate({ to: '/about' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1200x400.png"
                alt="PETERBUILTWL Hero Banner"
                className="rounded-2xl shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and designed for maximum efficiency
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Applications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our AI-powered tools designed to boost your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featuredApps.map((app, index) => (
              <Card
                key={index}
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
                  <CardTitle className="text-xl">{app.name}</CardTitle>
                  <CardDescription className="text-base">{app.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground"
                    variant="outline"
                    onClick={() => navigate({ to: app.route })}
                  >
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/apps' })}>
              View All 11 Applications
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container">
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the PETERBUILTWL + $DSWENTWORTH ecosystem and start creating with AI
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full" onClick={() => navigate({ to: '/apps' })}>
                  Browse Apps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => navigate({ to: '/donations' })}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Support via Donation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
