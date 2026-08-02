import { AppRouter } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './features/settings/context/SettingsContext';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AppRouter />
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
