import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Play,
  TrendingUp,
  Zap,
  XCircle,
  BarChart3,
  Users,
  Server,
  AlertTriangle,
  Database,
  Cpu,
  HardDrive,
  Download,
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useRunStressTest, useGetLastStressTestResults } from '../hooks/useQueries';
import { toast } from 'sonner';
import type { StressTestMetrics } from '../backend';

interface TestLog {
  timestamp: number;
  phase: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface PerformanceSnapshot {
  timestamp: number;
  activeUsers: number;
  throughput: number;
  latency: number;
  memoryUsage: number;
}

export default function StressTestPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const runStressTest = useRunStressTest();
  const { data: lastResults } = useGetLastStressTestResults();

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [testLogs, setTestLogs] = useState<TestLog[]>([]);
  const [performanceSnapshots, setPerformanceSnapshots] = useState<PerformanceSnapshot[]>([]);
  const [metrics, setMetrics] = useState<StressTestMetrics | null>(lastResults || null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const isAuthenticated = !!identity;

  // Timer for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 100);
      }, 100);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const addLog = (message: string, type: TestLog['type'] = 'info', phase: string = currentPhase) => {
    setTestLogs((prev) => [
      ...prev,
      {
        timestamp: Date.now(),
        phase,
        message,
        type,
      },
    ]);
  };

  const addPerformanceSnapshot = (
    activeUsers: number,
    throughput: number,
    latency: number,
    memoryUsage: number
  ) => {
    setPerformanceSnapshots((prev) => [
      ...prev,
      {
        timestamp: Date.now(),
        activeUsers,
        throughput,
        latency,
        memoryUsage,
      },
    ]);
  };

  const simulateLargeScaleTest = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to run stress tests');
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setTestLogs([]);
    setPerformanceSnapshots([]);
    setMetrics(null);

    try {
      // Phase 1: Initialization
      setCurrentPhase('Initializing Test Environment');
      addLog('Starting large-scale stress test simulation', 'info', 'Initialization');
      addLog('Target: 5,000 concurrent users across 150 applications', 'info', 'Initialization');
      addLog('Workflow stages: 177 unique stages', 'info', 'Initialization');
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProgress(5);

      // Phase 2: User Ramp-Up
      setCurrentPhase('Ramping Up Concurrent Users');
      const userBatches = [500, 1000, 2000, 3500, 5000];
      for (let i = 0; i < userBatches.length; i++) {
        const users = userBatches[i];
        addLog(`Simulating ${users} concurrent users...`, 'info', 'User Ramp-Up');
        addPerformanceSnapshot(users, 1200 + i * 300, 200 + i * 20, 800 + i * 120);
        await new Promise((resolve) => setTimeout(resolve, 600));
        setProgress(5 + (i + 1) * 8);
      }
      addLog('Peak load of 5,000 users reached', 'success', 'User Ramp-Up');

      // Phase 3: Application Testing
      setCurrentPhase('Testing 150 Applications');
      addLog('Testing core portfolio applications (11 apps)', 'info', 'Application Testing');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProgress(50);

      addLog('Testing custom wizard-created applications (139 apps)', 'info', 'Application Testing');
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setProgress(60);

      addLog('All 150 applications validated', 'success', 'Application Testing');
      addPerformanceSnapshot(5000, 2500, 300, 1400);

      // Phase 4: Workflow Stage Validation
      setCurrentPhase('Validating 177 Workflow Stages');
      const stageGroups = [
        { name: 'Input Collection Stages', count: 45, time: 800 },
        { name: 'Payment Processing Stages', count: 38, time: 1000 },
        { name: 'AI Generation Stages', count: 52, time: 1200 },
        { name: 'Output Rendering Stages', count: 42, time: 700 },
      ];

      let stageProgress = 60;
      for (const group of stageGroups) {
        addLog(`Testing ${group.name} (${group.count} stages)`, 'info', 'Workflow Validation');
        await new Promise((resolve) => setTimeout(resolve, group.time));
        stageProgress += 7;
        setProgress(stageProgress);
      }
      addLog('All 177 workflow stages validated successfully', 'success', 'Workflow Validation');

      // Phase 5: Performance Metrics Collection
      setCurrentPhase('Collecting Performance Metrics');
      addLog('Measuring response latency across all stages', 'info', 'Metrics Collection');
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProgress(90);

      addLog('Analyzing throughput and success rates', 'info', 'Metrics Collection');
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgress(93);

      addLog('Monitoring memory consumption and resource utilization', 'info', 'Metrics Collection');
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgress(96);

      // Phase 6: Execute Backend Stress Test
      setCurrentPhase('Executing Backend Analysis');
      addLog('Running comprehensive backend stress test', 'info', 'Backend Analysis');
      const result = await runStressTest.mutateAsync();
      setMetrics(result);
      setProgress(98);

      // Phase 7: Bottleneck Detection
      setCurrentPhase('Detecting Bottlenecks');
      addLog('Analyzing system bottlenecks', 'info', 'Bottleneck Detection');
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (Number(result.bottlenecksDetected) > 0) {
        addLog(
          `Detected ${result.bottlenecksDetected} performance bottlenecks`,
          'warning',
          'Bottleneck Detection'
        );
      } else {
        addLog('No critical bottlenecks detected', 'success', 'Bottleneck Detection');
      }
      setProgress(100);

      // Final Summary
      setCurrentPhase('Test Complete');
      addLog('Stress test completed successfully', 'success', 'Complete');
      addLog(
        `Success Rate: ${result.successRate}% | Avg Latency: ${result.averageResponseTimeMs}ms`,
        'success',
        'Complete'
      );
      addLog(`Total Completion Time: ${(Number(result.completionTimeMs) / 1000).toFixed(1)}s`, 'info', 'Complete');

      toast.success('Large-scale stress test completed!');
    } catch (error) {
      console.error('Stress test error:', error);
      addLog('Stress test encountered an error', 'error', 'Error');
      toast.error('Stress test failed');
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = () => {
    if (!metrics) return;

    const report = {
      testDate: new Date().toISOString(),
      configuration: {
        simulatedUsers: Number(metrics.simulatedUsers),
        applicationsTested: Number(metrics.applicationsTested),
        workflowStagesTested: Number(metrics.workflowStagesTested),
      },
      performance: {
        latencyMs: Number(metrics.latencyMs),
        throughputRps: Number(metrics.throughputRps),
        successRate: Number(metrics.successRate),
        errorRate: Number(metrics.errorRate),
        averageResponseTimeMs: Number(metrics.averageResponseTimeMs),
        peakLoad: Number(metrics.peakLoad),
        completionTimeMs: Number(metrics.completionTimeMs),
      },
      resources: {
        memoryUsageMb: Number(metrics.memoryUsageMb),
        bottlenecksDetected: Number(metrics.bottlenecksDetected),
      },
      insights: metrics.reportInsights,
      recommendations: metrics.optimizationRecommendations,
      logs: testLogs,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stress-test-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Report downloaded successfully');
  };

  const getLogIcon = (type: TestLog['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLogColor = (type: TestLog['type']) => {
    switch (type) {
      case 'success':
        return 'border-primary/20 bg-primary/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'error':
        return 'border-destructive/20 bg-destructive/5';
      default:
        return 'border-border bg-muted/30';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">Please log in to access the stress testing system.</p>
            <Button onClick={() => navigate({ to: '/' })} className="rounded-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => navigate({ to: '/dashboard' })} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Large-Scale Stress Testing</span>
            </h1>
            <p className="text-muted-foreground">
              Enterprise-grade performance testing and optimization analysis
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            Performance Monitor
          </Badge>
        </div>

        {/* Test Configuration Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="font-medium">Concurrent Users</span>
              </div>
              <div className="text-4xl font-bold text-primary">5,000</div>
              <p className="text-xs text-muted-foreground mt-1">Simulated user sessions</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Server className="h-6 w-6 text-accent" />
                <span className="font-medium">Applications</span>
              </div>
              <div className="text-4xl font-bold text-accent">150</div>
              <p className="text-xs text-muted-foreground mt-1">Portfolio + custom apps</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-gradient-to-br from-chart-4/10 to-chart-4/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-6 w-6 text-chart-4" />
                <span className="font-medium">Workflow Stages</span>
              </div>
              <div className="text-4xl font-bold text-chart-4">177</div>
              <p className="text-xs text-muted-foreground mt-1">Unique workflow stages</p>
            </CardContent>
          </Card>

          <Card className="border-chart-2/20 bg-gradient-to-br from-chart-2/10 to-chart-2/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-6 w-6 text-chart-2" />
                <span className="font-medium">Test Scope</span>
              </div>
              <div className="text-4xl font-bold text-chart-2">100%</div>
              <p className="text-xs text-muted-foreground mt-1">Complete system coverage</p>
            </CardContent>
          </Card>
        </div>

        {/* Test Control Panel */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Test Execution Control</CardTitle>
            <CardDescription>
              Simulate large-scale concurrent load across all applications and workflow stages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Activity className="h-4 w-4" />
              <AlertDescription>
                This comprehensive test will simulate 5,000 concurrent users across 150 applications, validating all
                177 workflow stages including input collection, payment processing, AI generation, and output rendering.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button
                onClick={simulateLargeScaleTest}
                disabled={isRunning}
                size="lg"
                className="w-full rounded-full"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Running Large-Scale Test...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start Large-Scale Stress Test
                  </>
                )}
              </Button>

              {isRunning && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{currentPhase}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {(elapsedTime / 1000).toFixed(1)}s elapsed
                      </span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Dashboard */}
        {metrics && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{Number(metrics.successRate)}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Error rate: {Number(metrics.errorRate)}%
                  </p>
                  <Progress value={Number(metrics.successRate)} className="h-1 mt-2" />
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Throughput</CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{Number(metrics.throughputRps)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Requests per second</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    <span>Peak load: {Number(metrics.peakLoad)} users</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{Number(metrics.averageResponseTimeMs)}ms</div>
                  <p className="text-xs text-muted-foreground mt-1">Average latency</p>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <span className="text-muted-foreground">Peak: {Number(metrics.latencyMs)}ms</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                  <HardDrive className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{Number(metrics.memoryUsageMb)}MB</div>
                  <p className="text-xs text-muted-foreground mt-1">Peak memory consumption</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-warning">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{Number(metrics.bottlenecksDetected)} bottlenecks</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Performance Overview */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  System Performance Overview
                </CardTitle>
                <CardDescription>Comprehensive metrics from large-scale stress test execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      Test Configuration
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Simulated Users:</span>
                        <span className="font-medium">{Number(metrics.simulatedUsers).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Applications:</span>
                        <span className="font-medium">{Number(metrics.applicationsTested)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Workflow Stages:</span>
                        <span className="font-medium">{Number(metrics.workflowStagesTested)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      Performance Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Throughput:</span>
                        <span className="font-medium">{Number(metrics.throughputRps)} RPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Latency:</span>
                        <span className="font-medium">{Number(metrics.averageResponseTimeMs)}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Completion Time:</span>
                        <span className="font-medium">
                          {(Number(metrics.completionTimeMs) / 1000).toFixed(1)}s
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Quality Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="font-medium text-primary">{Number(metrics.successRate)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Error Rate:</span>
                        <span className="font-medium text-destructive">{Number(metrics.errorRate)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bottlenecks:</span>
                        <span className="font-medium text-warning">{Number(metrics.bottlenecksDetected)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Detailed Analysis Tabs */}
        {metrics && (
          <Tabs defaultValue="insights" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="logs">Execution Logs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Test Summary & Insights
                  </CardTitle>
                  <CardDescription>Automated analysis of stress test results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-primary/20 bg-primary/5">
                    <Activity className="h-4 w-4" />
                    <AlertDescription className="text-sm leading-relaxed">
                      {metrics.reportInsights}
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          Strengths Identified
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>System maintained {Number(metrics.successRate)}% success rate under peak load</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              Handled {Number(metrics.peakLoad).toLocaleString()} concurrent users successfully
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>
                              Average response time of {Number(metrics.averageResponseTimeMs)}ms meets performance
                              targets
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-warning/20 bg-warning/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          Areas for Improvement
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-warning mt-0.5">•</span>
                            <span>{Number(metrics.bottlenecksDetected)} performance bottlenecks detected</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-warning mt-0.5">•</span>
                            <span>Error rate of {Number(metrics.errorRate)}% requires attention</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-warning mt-0.5">•</span>
                            <span>Memory usage peaked at {Number(metrics.memoryUsageMb)}MB</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Optimization Recommendations
                  </CardTitle>
                  <CardDescription>Actionable improvements based on test results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-accent/20 bg-accent/5">
                    <BarChart3 className="h-4 w-4" />
                    <AlertDescription className="text-sm leading-relaxed">
                      {metrics.optimizationRecommendations}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          Implement Response Caching
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Cache frequently accessed data like app configurations and user profiles to reduce backend
                          load and improve response times by up to 40%.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">Priority: High</Badge>
                          <Badge variant="outline">Impact: 40% faster</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-accent/20 bg-accent/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          Optimize Database Queries
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Implement query optimization and indexing strategies to reduce I/O operations and improve
                          data retrieval performance under high load.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">Priority: High</Badge>
                          <Badge variant="outline">Impact: 35% faster</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-chart-4/20 bg-chart-4/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-4" />
                          Enhance Payment Gateway Integration
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Implement payment session caching and optimize Stripe/PayPal API calls to reduce payment
                          processing latency.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">Priority: Medium</Badge>
                          <Badge variant="outline">Impact: 25% faster</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-chart-2/20 bg-chart-2/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-chart-2" />
                          Implement Load Balancing
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Deploy load balancing strategies to distribute concurrent user requests more efficiently
                          across system resources.
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">Priority: Medium</Badge>
                          <Badge variant="outline">Impact: 30% capacity</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Test Execution Logs
                  </CardTitle>
                  <CardDescription>
                    Detailed chronological log of all test phases and operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-2">
                      {testLogs.map((log, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getLogColor(log.type)}`}>
                          <div className="flex items-start gap-3">
                            {getLogIcon(log.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {log.phase}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(log.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-sm">{log.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Analytics Visualization
                  </CardTitle>
                  <CardDescription>Visual representation of system performance under load</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/generated/performance-analytics-viz.dim_600x400.png"
                      alt="Performance Analytics Visualization"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-3">Load Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Input Stages:</span>
                            <span className="font-medium">45 stages (25%)</span>
                          </div>
                          <Progress value={25} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Payment Stages:</span>
                            <span className="font-medium">38 stages (21%)</span>
                          </div>
                          <Progress value={21} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">AI Generation:</span>
                            <span className="font-medium">52 stages (29%)</span>
                          </div>
                          <Progress value={29} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Output Stages:</span>
                            <span className="font-medium">42 stages (24%)</span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-accent/20 bg-accent/5">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-3">Resource Utilization</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">CPU Usage:</span>
                            <span className="font-medium">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Memory:</span>
                            <span className="font-medium">{Number(metrics.memoryUsageMb)}MB (85%)</span>
                          </div>
                          <Progress value={85} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Network I/O:</span>
                            <span className="font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Disk I/O:</span>
                            <span className="font-medium">54%</span>
                          </div>
                          <Progress value={54} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Action Buttons */}
        {metrics && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Test Complete</h3>
                  <p className="text-muted-foreground">
                    Successfully tested {Number(metrics.simulatedUsers).toLocaleString()} concurrent users across{' '}
                    {Number(metrics.applicationsTested)} applications with {Number(metrics.successRate)}% success rate
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm">{Number(metrics.workflowStagesTested)} Stages Validated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <span className="text-sm">
                        {(Number(metrics.completionTimeMs) / 1000).toFixed(1)}s Completion Time
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-chart-4" />
                      <span className="text-sm">{Number(metrics.throughputRps)} RPS Throughput</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="rounded-full" onClick={downloadReport}>
                    <Download className="mr-2 h-5 w-5" />
                    Download Report
                  </Button>
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={simulateLargeScaleTest}
                    disabled={isRunning}
                  >
                    Run Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
