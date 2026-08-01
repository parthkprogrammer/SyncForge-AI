import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AppLayout } from '../layouts/AppLayout';
import { Spinner } from '../components/ui/Spinner';

// Lazy loading all pages to optimize initial bundle delivery
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const ProblemsPage = lazy(() => import('../pages/Problems'));
const ProblemDetailsPage = lazy(() => import('../pages/Problems/ProblemDetailsPage'));
const AnalyticsPage = lazy(() => import('../pages/Analytics'));
const AIAssistantPage = lazy(() => import('../pages/AIAssistant'));
const NotesPage = lazy(() => import('../pages/Notes'));
const RepositoriesPage = lazy(() => import('../pages/Repositories'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const SettingsPage = lazy(() => import('../pages/Settings'));
const LoginPage = lazy(() => import('../pages/Login'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Consistent full-page loading spinner fallback
function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          
          {/* 1. Protected System Routes (Requires Authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path={ROUTE_PATHS.PROBLEMS} element={<ProblemsPage />} />
              <Route path="/problems/:problemId" element={<ProblemDetailsPage />} />
              <Route path={ROUTE_PATHS.ANALYTICS} element={<AnalyticsPage />} />
              <Route path={ROUTE_PATHS.AI_ASSISTANT} element={<AIAssistantPage />} />
              <Route path={ROUTE_PATHS.NOTES} element={<NotesPage />} />
              <Route path={ROUTE_PATHS.REPOSITORIES} element={<RepositoriesPage />} />
              <Route path={ROUTE_PATHS.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTE_PATHS.SETTINGS} element={<SettingsPage />} />
            </Route>
          </Route>

          {/* 2. Public System Routes (Cannot access if logged in) */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          </Route>

          {/* 3. Global Catch-all Routing (404 Page Not Found) */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
