import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AppsPage from './pages/AppsPage';
import PaymentsPage from './pages/PaymentsPage';
import DonationsPage from './pages/DonationsPage';
import BlogGeneratorPage from './pages/BlogGeneratorPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import AboutPage from './pages/AboutPage';
import ImplementationLibraryPage from './pages/ImplementationLibraryPage';
import AppWizardPage from './pages/AppWizardPage';
import StressTestPage from './pages/StressTestPage';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const appsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apps',
  component: AppsPage,
});

const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payments',
  component: PaymentsPage,
});

const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donations',
  component: DonationsPage,
});

const appWizardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app-wizard',
  component: AppWizardPage,
});

const blogGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog-generator',
  component: BlogGeneratorPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const implementationLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/implementation-library',
  component: ImplementationLibraryPage,
});

const stressTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stress-test',
  component: StressTestPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  appsRoute,
  paymentsRoute,
  donationsRoute,
  appWizardRoute,
  blogGeneratorRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  aboutRoute,
  implementationLibraryRoute,
  stressTestRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
