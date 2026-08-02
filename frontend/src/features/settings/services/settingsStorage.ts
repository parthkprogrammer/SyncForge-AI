import type { UserSettings } from '../types/settings.types';
import { DEFAULT_SETTINGS } from '../constants/defaultSettings';

const STORAGE_KEY = 'sf_user_settings';

export const settingsStorage = {
  loadSettings(): UserSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_SETTINGS;
      
      const parsed = JSON.parse(stored);
      // Basic schema merge validation in case stored properties are missing
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          ...(parsed.notifications || {}),
        },
        privacy: {
          ...DEFAULT_SETTINGS.privacy,
          ...(parsed.privacy || {}),
        },
      };
    } catch (err) {
      console.warn('Failed to parse user settings from storage, resetting to defaults.', err);
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to write user settings preferences to localStorage', err);
    }
  },

  clearSettings(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear user settings from localStorage', err);
    }
  },
};
