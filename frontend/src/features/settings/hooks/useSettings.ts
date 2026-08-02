import { useContext } from 'react';
import { SettingsContext as Context } from '../context/SettingsContext';

export function useSettings() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
