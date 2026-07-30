import { useState } from 'react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);
    console.log('GitHub OAuth will be connected later.');

    // Mock asynchronous authentication sequence
    setTimeout(() => {
      setIsLoading(false);
      // Trigger error display to show off ErrorAlert UI
      setError('Unable to connect. Please try again later.');
    }, 2000);
  };

  return (
    <AuthLayout>
      <AuthCard
        isLoading={isLoading}
        error={error}
        onLoginClick={handleLogin}
        onClearError={() => setError(null)}
      />
    </AuthLayout>
  );
}
