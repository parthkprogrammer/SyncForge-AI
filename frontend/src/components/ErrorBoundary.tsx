import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-white select-none">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col items-center">
            
            {/* Error Icon */}
            <div className="h-14 w-14 rounded-full bg-error-50 dark:bg-error-950/10 text-error-500 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h1 className="text-xl font-extrabold tracking-tight">
              Something went wrong.
            </h1>
            
            <p className="text-xs text-slate-450 dark:text-slate-400 mt-2.5 leading-relaxed">
              SyncForge AI encountered an unexpected error.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="w-full mt-4 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-left overflow-x-auto text-[10px] font-mono text-rose-500">
                <strong>{this.state.error.name}:</strong> {this.state.error.message}
              </div>
            )}

            <div className="flex gap-3 mt-6 w-full justify-center">
              <Button
                variant="outline"
                className="w-1/2 rounded-xl text-xs font-bold"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              
              <Button
                variant="primary"
                className="w-1/2 rounded-xl text-xs font-bold"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
              >
                Go to Dashboard
              </Button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
