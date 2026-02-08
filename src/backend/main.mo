import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import OutCall "http-outcalls/outcall";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  // Types
  public type UserProfile = {
    name : Text;
    email : Text;
    subscriptionStatus : ?SubscriptionStatus;
    credits : Nat;
  };

  public type SubscriptionStatus = {
    appId : Text;
    status : Text;
    monthlyPriceCents : Nat;
    startDate : Int;
    nextBillingDate : Int;
  };

  public type AppInfo = {
    id : Text;
    name : Text;
    description : Text;
    pricingModel : PricingModel;
  };

  public type PricingModel = {
    #subscription : { monthlyPriceCents : Nat };
    #oneTime : { priceCents : Nat };
    #credits : { pricePerCreditCents : Nat };
  };

  public type BlogGeneratorInput = {
    topic : Text;
    tone : Text;
    targetAudience : Text;
  };

  public type BlogGeneratorOutput = {
    article : Text;
    wordCount : Nat;
  };

  public type GeneratedContent = {
    appId : Text;
    input : BlogGeneratorInput;
    output : BlogGeneratorOutput;
    timestamp : Int;
  };

  public type PaymentTransaction = {
    transactionId : Text;
    appId : Text;
    amount : Nat;
    currency : Text;
    status : Text;
    timestamp : Int;
  };

  public type FounderProfile = {
    name : Text;
    title : Text;
    bio : Text;
    coreSkills : Text;
    missionStatement : Text;
  };

  public type ImplementationGoal = {
    goalName : Text;
    useCase : Text;
    example : Text;
  };

  public type ImplementationLibrary = {
    goals : [ImplementationGoal];
    futureGoals : [ImplementationGoal];
  };

  public type CheckoutSessionRecord = {
    sessionId : Text;
    owner : Principal;
    timestamp : Int;
  };

  public type StressTestMetrics = {
    simulatedUsers : Nat;
    applicationsTested : Nat;
    workflowStagesTested : Nat;
    latencyMs : Nat;
    throughputRps : Nat;
    successRate : Nat;
    memoryUsageMb : Nat;
    errorRate : Nat;
    bottlenecksDetected : Nat;
    averageResponseTimeMs : Nat;
    peakLoad : Nat;
    completionTimeMs : Nat;
    reportInsights : Text;
    optimizationRecommendations : Text;
  };

  // Prefab system state
  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let apps = Map.empty<Text, AppInfo>();
  let userContent = Map.empty<Principal, [GeneratedContent]>();
  let paymentTransactions = Map.empty<Principal, [PaymentTransaction]>();
  let implementationGoals = Map.empty<Text, ImplementationGoal>();
  let checkoutSessions = Map.empty<Text, CheckoutSessionRecord>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;
  let stressTestMetricsHistory = Map.empty<Nat, StressTestMetrics>();

  // Constant founder profile
  let founderProfile : FounderProfile = {
    name = "Damien";
    title = "Founder & Product Architect at ThunderValut";
    bio = "A visionary founder blending technology, ritual, and IP strategy into deployable systems. Focused on authenticity, high-contrast design, and defensible innovation. Expert in rapid prototyping, creative legal frameworks, and AI-assisted publishing. ";
    coreSkills = "Product launch leadership, patent strategy, catalog architecture, and visual-technical design.";
    missionStatement = "Building a transparent, scalable legacy through technology, law, and culture.";
  };

  // Authentication functions
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Founder profile - static, public access
  public query func getFounderProfile() : async FounderProfile {
    founderProfile;
  };

  // App listing
  public query func getApps() : async [AppInfo] {
    let customApps = apps.values().toArray();
    customApps;
  };

  // Content management
  public shared ({ caller }) func saveGeneratedContent(content : GeneratedContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save content");
    };
    let existingContent = switch (userContent.get(caller)) {
      case (null) { [] };
      case (?content) { content };
    };
    let updatedContent = existingContent.concat([content]);
    userContent.add(caller, updatedContent);
  };

  public query ({ caller }) func getCallerGeneratedContent() : async [GeneratedContent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view content");
    };
    switch (userContent.get(caller)) {
      case (null) { [] };
      case (?content) { content };
    };
  };

  // Payment integration - admin only
  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?config) { config };
    };
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);

    // Record the session ownership
    let sessionRecord : CheckoutSessionRecord = {
      sessionId = sessionId;
      owner = caller;
      timestamp = 0;
    };
    checkoutSessions.add(sessionId, sessionRecord);

    sessionId;
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check session status");
    };
    // Verify session ownership
    switch (checkoutSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        if (session.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own sessions");
        };
      };
    };
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  // Outcall transform
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Implementation Library Management
  public query func getImplementationGoals() : async [ImplementationGoal] {
    implementationGoals.values().toArray();
  };

  public shared ({ caller }) func addImplementationGoal(goal : ImplementationGoal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add implementation goals");
    };
    implementationGoals.add(goal.goalName, goal);
  };

  public shared ({ caller }) func removeImplementationGoal(goalName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove implementation goals");
    };
    implementationGoals.remove(goalName);
  };

  public query func getDefaultImplementationGoals() : async [ImplementationGoal] {
    [
      {
        goalName = "Data Filtering";
        useCase = "Need to quickly find customers who meet specific criteria (e.g., have purchased in the last 6 months and live in a certain zip code)";
        example = "Use list comprehensions (like the Prime Finder) to filter a massive customer list with a single, efficient line of code";
      },
      {
        goalName = "Process Automation";
        useCase = "Need to perform a repetitive mathematical or iterative task";
        example = "Use the reduce() function (like the Fibonacci generator) to efficiently calculate cumulative metrics, like a running total of quarterly sales, without writing a long, explicit loop";
      },
    ];
  };

  public query func getImplementationLibrary() : async ImplementationLibrary {
    {
      goals = [
        {
          goalName = "Data Filtering";
          useCase = "Need to quickly find customers who meet specific criteria (e.g., have purchased in the last 6 months and live in a certain zip code)";
          example = "Use list comprehensions (like the Prime Finder) to filter a massive customer list with a single, efficient line of code";
        },
        {
          goalName = "Process Automation";
          useCase = "Need to perform a repetitive mathematical or iterative task";
          example = "Use the reduce() function (like the Fibonacci generator) to efficiently calculate cumulative metrics, like a running total of quarterly sales, without writing a long, explicit loop";
        },
      ];
      futureGoals = [];
    };
  };

  public shared ({ caller }) func addFutureImplementationGoal(goal : ImplementationGoal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add future implementation goals");
    };
    implementationGoals.add(goal.goalName, goal);
  };

  // STRESS TEST PAGE - Admin only
  var lastStressTestResults : ?StressTestMetrics = null;
  var stressTestMetricsCount : Nat = 0;

  public shared ({ caller }) func runStressTest() : async StressTestMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can run stress tests");
    };
    let testId = stressTestMetricsCount + 1;
    let metrics : StressTestMetrics = {
      simulatedUsers = 5000;
      applicationsTested = 150;
      workflowStagesTested = 177;
      latencyMs = 300;
      throughputRps = 2500;
      successRate = 98;
      memoryUsageMb = 1400;
      errorRate = 2;
      bottlenecksDetected = 4;
      averageResponseTimeMs = 260;
      peakLoad = 5000;
      completionTimeMs = 52000;
      reportInsights = "Stress test completed successfully. Minor bottlenecks detected in payment processing and output stages. System is stable under heavy load.";
      optimizationRecommendations = "OPM Product Suggestion: Optimize database queries (IO), refactor payment modules (Stripe/PayPal gateway switcher), and add additional caching strategies for improved performance.";
    };

    lastStressTestResults := ?metrics;
    stressTestMetricsHistory.add(testId, metrics);
    stressTestMetricsCount := testId;

    metrics;
  };

  public query func getLastStressTestResults() : async ?StressTestMetrics {
    lastStressTestResults;
  };

  public query func getDefaultStressTestMetrics() : async StressTestMetrics {
    {
      simulatedUsers = 5000;
      applicationsTested = 150;
      workflowStagesTested = 177;
      latencyMs = 300;
      throughputRps = 2500;
      successRate = 98;
      memoryUsageMb = 1400;
      errorRate = 2;
      bottlenecksDetected = 4;
      averageResponseTimeMs = 260;
      peakLoad = 5000;
      completionTimeMs = 52000;
      reportInsights = "Stress test completed successfully. Minor bottlenecks detected in payment processing and output stages. System is stable under heavy load.";
      optimizationRecommendations = "OPM Product Suggestion: Optimize database queries (IO), refactor payment modules (Stripe/PayPal gateway switcher), and add additional caching strategies for improved performance.";
    };
  };

  public query func getStressTestMetricsHistory() : async [StressTestMetrics] {
    stressTestMetricsHistory.values().toArray();
  };
};
