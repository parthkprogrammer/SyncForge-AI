import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

export function ProtectedRoute() {
  // Temporary authentication check (change to false to test redirect to /login)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <Outlet />;
}
