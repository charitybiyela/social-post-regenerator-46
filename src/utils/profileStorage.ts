import { Profile } from "@/types/profile";

const STORAGE_KEY = "user_profile";

export const saveProfile = (profile: Profile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const loadProfile = (): Profile | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};