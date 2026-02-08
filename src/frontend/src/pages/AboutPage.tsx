import { useGetFounderProfile } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Target, Award, ArrowLeft, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function AboutPage() {
  const { data: founderProfile, isLoading } = useGetFounderProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!founderProfile) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <p className="text-muted-foreground">Founder profile not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About the Founder
            </h1>
            <p className="text-muted-foreground text-lg">
              Meet the visionary behind ThunderValut and PETERBUILTWL
            </p>
          </div>

          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-40"></div>
                  <img
                    src="/assets/generated/damien-founder-portrait.dim_300x300.png"
                    alt={founderProfile.name}
                    className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-primary/30 object-cover shadow-2xl"
                  />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {founderProfile.name}
              </CardTitle>
              <p className="text-lg text-muted-foreground font-medium mt-2">
                {founderProfile.title}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <div className="p-6 rounded-lg bg-gradient-to-br from-card to-primary/5 border border-border/50">
                  <p className="text-foreground leading-relaxed text-base md:text-lg">
                    {founderProfile.bio}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Core Skills</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {founderProfile.coreSkills}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Target className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-xl">Mission Statement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{founderProfile.missionStatement}"
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2 border-primary/20">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Building the Future with PETERBUILTWL</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Through PETERBUILTWL, {founderProfile.name} is creating a portfolio of AI-powered applications
                      that blend cutting-edge technology with strategic innovation. Each project reflects a commitment
                      to authenticity, high-contrast design, and defensible innovation. The platform showcases
                      production-ready systems designed for transparency, scalability, and real-world impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => navigate({ to: '/implementation-library' })}
                  variant="outline"
                  className="gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Code2 className="h-4 w-4" />
                  View Implementation Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
