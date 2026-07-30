import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

export function PublicRoute() {
  // Temporary authentication check (change to true to test redirect of authenticated users to dashboard)
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
