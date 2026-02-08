import { useGetImplementationLibrary } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code2, Lightbulb, Zap, Sparkles, ChevronDown, User, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

export default function ImplementationLibraryPage() {
  const { data: library, isLoading } = useGetImplementationLibrary();
  const navigate = useNavigate();
  const [currentGoalsOpen, setCurrentGoalsOpen] = useState(true);
  const [futureGoalsOpen, setFutureGoalsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container py-16">
          <div className="max-w-6xl mx-auto space-y-8">
            <Skeleton className="h-12 w-96 mx-auto bg-slate-800" />
            <Skeleton className="h-96 w-full bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!library) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container py-16">
          <div className="text-center">
            <p className="text-white/60">Implementation Library not available.</p>
          </div>
        </div>
      </div>
    );
  }

  const futurePlaceholders = [
    {
      goalName: 'Advanced Analytics Integration',
      useCase: 'Coming soon: Real-time data visualization and predictive analytics for business intelligence',
      example: 'Stay tuned for implementation patterns leveraging machine learning pipelines and interactive dashboards'
    },
    {
      goalName: 'Distributed System Orchestration',
      useCase: 'Coming soon: Scalable microservices architecture with automated deployment and monitoring',
      example: 'Future examples will demonstrate containerization, service mesh patterns, and cloud-native strategies'
    }
  ];

  const displayFutureGoals = library.futureGoals && library.futureGoals.length > 0 
    ? library.futureGoals 
    : futurePlaceholders;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-10">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-5 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 shadow-2xl">
                  <Code2 className="h-14 w-14 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Implementation Library
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white/80">
              PETERBUILTWL Systems in Practice
            </p>
          </div>

          <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm shadow-2xl hover:border-cyan-500/50 transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shrink-0">
                  <Sparkles className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Strategic Code Patterns for Modern Systems
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    This section demonstrates practical, code-based use cases from the <span className="font-semibold text-cyan-400">PETERBUILTWL ecosystem</span>. 
                    Each implementation goal showcases strategic patterns designed for efficiency, scalability, and real-world deployment.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    These examples reflect the technical philosophy and system design vision that powers our AI-driven applications and infrastructure. 
                    From data filtering to process automation, each pattern is battle-tested and production-ready.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                      Production Ready
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
                      Scalable
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium">
                      Efficient
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Collapsible open={currentGoalsOpen} onOpenChange={setCurrentGoalsOpen}>
            <Card className="border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/60 hover:shadow-cyan-500/20">
              <CardHeader className="border-b border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <Zap className="h-7 w-7 text-cyan-400" />
                      Current Implementation Goals
                    </CardTitle>
                    <ChevronDown 
                      className={`h-6 w-6 text-cyan-400 transition-transform duration-300 ${currentGoalsOpen ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CardDescription className="text-white/60 text-left mt-2">
                  Active patterns and strategies in production
                </CardDescription>
              </CardHeader>
              
              <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <CardContent className="p-0">
                  <div className="grid gap-0">
                    {library.goals.map((goal, index) => (
                      <div
                        key={index}
                        className="group p-6 md:p-8 border-b border-slate-700/50 last:border-b-0 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                              <Lightbulb className="h-5 w-5 text-cyan-400" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                              {goal.goalName}
                            </h3>
                          </div>

                          <div className="pl-11 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Use Case</span>
                            </div>
                            <p className="text-white/80 leading-relaxed text-base md:text-lg">
                              {goal.useCase}
                            </p>
                          </div>

                          <div className="pl-11 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Implementation Example</span>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm md:text-base bg-slate-950/50 p-4 rounded-lg border border-slate-700/30 font-mono">
                              {goal.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={futureGoalsOpen} onOpenChange={setFutureGoalsOpen}>
            <Card className="border-2 border-blue-500/40 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/60 hover:shadow-blue-500/20">
              <CardHeader className="border-b border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <Rocket className="h-7 w-7 text-blue-400" />
                      Future Implementation Goals
                    </CardTitle>
                    <ChevronDown 
                      className={`h-6 w-6 text-blue-400 transition-transform duration-300 ${futureGoalsOpen ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CardDescription className="text-white/60 text-left mt-2">
                  Upcoming patterns and strategic initiatives
                </CardDescription>
              </CardHeader>
              
              <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <CardContent className="p-0">
                  <div className="grid gap-0">
                    {displayFutureGoals.map((goal, index) => (
                      <div
                        key={index}
                        className="group p-6 md:p-8 border-b border-slate-700/50 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                        
                        <div className="space-y-4 relative z-10">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 shrink-0 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                              <Lightbulb className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {goal.goalName}
                              </h3>
                              {library.futureGoals && library.futureGoals.length === 0 && (
                                <span className="inline-block mt-2 px-2 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pl-11 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Use Case</span>
                            </div>
                            <p className="text-white/80 leading-relaxed text-base md:text-lg">
                              {goal.useCase}
                            </p>
                          </div>

                          <div className="pl-11 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">Implementation Example</span>
                            </div>
                            <p className="text-white/70 leading-relaxed text-sm md:text-base bg-slate-950/50 p-4 rounded-lg border border-slate-700/30 font-mono">
                              {goal.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm shadow-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-cyan-500/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shrink-0">
                    <User className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      Discover the Vision Behind the Code
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      Learn how these implementation patterns tie into Damien's leadership philosophy, technical expertise, and system design approach that drives the PETERBUILTWL ecosystem.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate({ to: '/about' })}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap"
                >
                  About the Founder
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8 space-y-2">
            <p className="text-white/40 text-sm">
              Part of the PETERBUILTWL Portfolio Framework
            </p>
            <p className="text-white/30 text-xs">
              Strategic systems for transparent, scalable innovation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
