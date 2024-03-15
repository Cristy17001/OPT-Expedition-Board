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
    let currentPrefs: UserPrefs = defaultPrefs;
    try {
        currentPrefs = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultPrefs));
    } catch (error) {
        console.error("Error getting local prefs:", error);
        return defaultPrefs;
    }
    return currentPrefs;
}

const useUserPrefs = () => {
    const key = `userPrefs`;

    const [userPrefs, setUserPrefs] = useState<UserPrefs>(defaultPrefs);

    useEffect(() => {
        const currentPrefs = getLocalPrefs(key);
        setUserPrefs(currentPrefs);
    }, [])

    useEffect(() => {
        if(!userPrefs) return ;
        localStorage.setItem(key, JSON.stringify(userPrefs))
    }, [userPrefs])

    const updateUserPrefs = (newPrefs: Partial<UserPrefs>) => {
        const currentPrefs = getLocalPrefs(key);
        const updatedPrefs = {...currentPrefs, ...newPrefs};
        setUserPrefs(updatedPrefs);
    }

    return {userPrefs: userPrefs, updateUserPrefs};

};

export default useUserPrefs;