import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserSettings } from '../types/settings.types';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';
import { settingsStorage } from '../services/settingsStorage';
import { useTheme } from '../../../hooks/useTheme';
import toast from 'react-hot-toast';

export type SaveStatus = 'saved' | 'saving' | 'error';

interface SettingsContextType {
  settings: UserSettings;
  saveStatus: SaveStatus;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  resetAllSettings: () => void;
  clearAllLocalData: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();
  
  const [settings, setSettings] = useState<UserSettings>(() => {
    return settingsStorage.loadSettings();
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');

  // Sync themeContext to local storage load on boot
  useEffect(() => {
    if (settings.theme) {
      setTheme(settings.theme);
    }
  }, [settings.theme, setTheme]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    // 1. Instantly update local state
    setSettings((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      // 2. Perform background autosave simulation
      setSaveStatus('saving');
      
      // Delay simulating disk write/network queue latency
      setTimeout(() => {
        try {
          settingsStorage.saveSettings(updated);
          setSaveStatus('saved');
          
          // Trigger global Theme shift if theme changed
          if (key === 'theme') {
            setTheme(value as any);
          }
        } catch {
          setSaveStatus('error');
        }
      }, 400);

      return updated;
    });
  };

  const resetAllSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    settingsStorage.saveSettings(DEFAULT_SETTINGS);
    setTheme(DEFAULT_SETTINGS.theme);
    toast.success('Settings reset to defaults');
    setSaveStatus('saved');
  };

  const clearAllLocalData = () => {
    settingsStorage.clearSettings();
    localStorage.removeItem('syncforge-theme');
    
    // Clear other lists for safety
    localStorage.removeItem('sf_profile');
    localStorage.removeItem('sf_connected_accounts');
    localStorage.removeItem('sf_connected_repos');
    localStorage.removeItem('sf_unconnected_repos');
    localStorage.removeItem('sf_sync_history');
    localStorage.removeItem('sf_notes');

    setSettings(DEFAULT_SETTINGS);
    setTheme(DEFAULT_SETTINGS.theme);
    toast.success('All local workspace cache cleared!');
    setSaveStatus('saved');
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveStatus,
        updateSetting,
        resetAllSettings,
        clearAllLocalData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
