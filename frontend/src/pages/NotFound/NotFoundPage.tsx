import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ROUTE_PATHS } from '../../routes/routePaths';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70svh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* 404 Title Graphic */}
      <div className="text-8xl font-black text-slate-200 dark:text-slate-800 tracking-widest select-none leading-none">
        404
      </div>
      
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-6 tracking-tight">
        Page Not Found
      </h1>
      
      <p className="text-slate-500 dark:text-slate-400 mt-2.5 text-sm leading-relaxed max-w-xs">
        The page you are looking for does not exist or has been relocated to another workspace connector.
      </p>

      {/* Control Buttons */}
      <div className="flex gap-3 mt-8 w-full justify-center">
        <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button variant="primary" className="flex-1" onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>
          Go Dashboard
        </Button>
      </div>
    </div>
  );
}
