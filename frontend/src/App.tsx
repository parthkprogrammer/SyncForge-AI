import { AppRouter } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './features/settings/context/SettingsContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SettingsProvider>
          <AppRouter />
        </SettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
