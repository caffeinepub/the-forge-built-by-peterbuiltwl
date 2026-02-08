import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ImplementationGoal {
    goalName: string;
    useCase: string;
    example: string;
}
export interface GeneratedContent {
    output: BlogGeneratorOutput;
    appId: string;
    timestamp: bigint;
    input: BlogGeneratorInput;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface FounderProfile {
    bio: string;
    missionStatement: string;
    title: string;
    name: string;
    coreSkills: string;
}
export type PricingModel = {
    __kind__: "credits";
    credits: {
        pricePerCreditCents: bigint;
    };
} | {
    __kind__: "subscription";
    subscription: {
        monthlyPriceCents: bigint;
    };
} | {
    __kind__: "oneTime";
    oneTime: {
        priceCents: bigint;
    };
};
export interface ImplementationLibrary {
    futureGoals: Array<ImplementationGoal>;
    goals: Array<ImplementationGoal>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AppInfo {
    id: string;
    name: string;
    description: string;
    pricingModel: PricingModel;
}
export interface BlogGeneratorInput {
    topic: string;
    tone: string;
    targetAudience: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface StressTestMetrics {
    applicationsTested: bigint;
    peakLoad: bigint;
    optimizationRecommendations: string;
    completionTimeMs: bigint;
    successRate: bigint;
    bottlenecksDetected: bigint;
    errorRate: bigint;
    latencyMs: bigint;
    workflowStagesTested: bigint;
    simulatedUsers: bigint;
    memoryUsageMb: bigint;
    throughputRps: bigint;
    reportInsights: string;
    averageResponseTimeMs: bigint;
}
export interface BlogGeneratorOutput {
    wordCount: bigint;
    article: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SubscriptionStatus {
    status: string;
    nextBillingDate: bigint;
    monthlyPriceCents: bigint;
    appId: string;
    startDate: bigint;
}
export interface UserProfile {
    credits: bigint;
    name: string;
    email: string;
    subscriptionStatus?: SubscriptionStatus;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFutureImplementationGoal(goal: ImplementationGoal): Promise<void>;
    addImplementationGoal(goal: ImplementationGoal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getApps(): Promise<Array<AppInfo>>;
    getCallerGeneratedContent(): Promise<Array<GeneratedContent>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDefaultImplementationGoals(): Promise<Array<ImplementationGoal>>;
    getDefaultStressTestMetrics(): Promise<StressTestMetrics>;
    getFounderProfile(): Promise<FounderProfile>;
    getImplementationGoals(): Promise<Array<ImplementationGoal>>;
    getImplementationLibrary(): Promise<ImplementationLibrary>;
    getLastStressTestResults(): Promise<StressTestMetrics | null>;
    getStressTestMetricsHistory(): Promise<Array<StressTestMetrics>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeImplementationGoal(goalName: string): Promise<void>;
    runStressTest(): Promise<StressTestMetrics>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveGeneratedContent(content: GeneratedContent): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
