import { useEffect, useState } from "react";

export type UserPrefs = {
    message: string;
    color1: string;
    color2: string;
    highlightColor: string;
    textColor1: string;
    textColor2: string;
    logo: string;
}

const defaultPrefs: UserPrefs = {
    message: "Bem-vindo!",
    color1: "#F5F5F5",
    color2: "#FFFFFF",
    highlightColor: "#EC6907",
    textColor1: "#56545D",
    textColor2: "#9390A6",
    logo: "/logo.png"
}

const getLocalPrefs = (key: string): UserPrefs => {
    const storedPrefs = localStorage.getItem(key);
    if (storedPrefs) {
      try {
        return JSON.parse(storedPrefs);
      } catch (error) {
        console.error('Error parsing user preferences from local storage:', error);
      }
    }
    return defaultPrefs;
  };

const useUserPrefs = () => {
    const key = `userPrefs`;

    const [userPrefs, setUserPrefs] = useState<UserPrefs>(getLocalPrefs(key));

    useEffect(() => {
      const currentPrefs = getLocalPrefs(key);
      setUserPrefs(currentPrefs);
    }, [key]);

    useEffect(() => {
      if (!userPrefs) return;
      localStorage.setItem(key, JSON.stringify(userPrefs));
    }, [userPrefs, key]);

    const updateUserPrefs = (newPrefs: UserPrefs) => {
      console.log('updateUserPrefs called with:', newPrefs);
      const updatedPrefs = { ...newPrefs };
      setUserPrefs(updatedPrefs);
    };

    return { userPrefs, updateUserPrefs };
  };
export default useUserPrefs;