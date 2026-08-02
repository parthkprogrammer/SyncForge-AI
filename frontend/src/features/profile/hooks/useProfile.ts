import { useState, useEffect, useCallback } from 'react';
import type { DeveloperProfile, ConnectedAccount, EditProfileFormData } from '../types/profile.types';
import {
  initialProfile,
  initialConnectedAccounts,
} from '../data/profileMockData';
import toast from 'react-hot-toast';

export function useProfile() {
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    const stored = localStorage.getItem('sf_profile');
    return stored ? JSON.parse(stored) : initialProfile();
  });

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(() => {
    const stored = localStorage.getItem('sf_connected_accounts');
    return stored ? JSON.parse(stored) : initialConnectedAccounts();
  });

  // Local storage persistence sync
  useEffect(() => {
    localStorage.setItem('sf_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sf_connected_accounts', JSON.stringify(connectedAccounts));
  }, [connectedAccounts]);

  const updateProfile = useCallback((data: EditProfileFormData) => {
    setProfile((prev) => ({
      ...prev,
      displayName: data.displayName,
      username: data.username.toLowerCase(),
      bio: data.bio.trim() || null,
      location: data.location.trim() || null,
      website: data.website.trim() || null,
      primaryLanguage: data.primaryLanguage,
      profileVisibility: data.profileVisibility,
    }));
    toast.success('Profile updated successfully!');
  }, []);

  const toggleVisibility = useCallback(() => {
    setProfile((prev) => {
      const newVisibility = prev.profileVisibility === 'public' ? 'private' : 'public';
      toast.success(`Profile visibility set to ${newVisibility}`);
      return {
        ...prev,
        profileVisibility: newVisibility,
      };
    });
  }, []);

  const connectAccount = useCallback((provider: string, username: string) => {
    setConnectedAccounts((prev) =>
      prev.map((acc) => {
        if (acc.provider === provider) {
          return {
            ...acc,
            username,
            isConnected: true,
            connectedAt: new Date().toISOString(),
          };
        }
        return acc;
      })
    );
    toast.success(`Connected to ${provider} as ${username}`);
  }, []);

  const disconnectAccount = useCallback((provider: string) => {
    setConnectedAccounts((prev) =>
      prev.map((acc) => {
        if (acc.provider === provider) {
          return {
            ...acc,
            username: undefined,
            isConnected: false,
            connectedAt: undefined,
          };
        }
        return acc;
      })
    );
    toast.success(`Disconnected ${provider} integration`);
  }, []);

  const uploadAvatarSimulated = useCallback(() => {
    toast.success('Avatar upload will be connected later.');
  }, []);

  return {
    profile,
    connectedAccounts,
    updateProfile,
    toggleVisibility,
    connectAccount,
    disconnectAccount,
    uploadAvatarSimulated,
  };
}
