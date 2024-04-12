import { useEffect, useState } from "react";

export type UserPrefs = {
    message: string;
    color1: string;
    color2: string;
    highlightColor: string;
    textColor1: string;
    textColor2: string;
    logo: string;
    table_map: Array<[string, string]>;
    column_order: Array<[number, string]>;
}

const defaultPrefs: UserPrefs = {
    message: "Bem-vindo!",
    color1: "#F5F5F5",
    color2: "#FFFFFF",
    highlightColor: "#EC6907",
    textColor1: "#56545D",
    textColor2: "#9390A6",
    logo: "/logo.png",
    table_map: [
        ["DutyStartTime", "DutyStartTime"],
        ["DutyEndTimeSeconds", "DutyEndTimeSeconds"],
        ["IsDriverPresent", "IsDriverPresent"],
        ["VehicleNr", "VehicleNr"],
        ["VehicleLicensePlate", "VehicleLicensePlate"],
        ["DailyRosterDate", "DailyRosterDate"],
        ["DutyName", "DutyName"],
        ["DutyEndTime", "DutyEndTime"],
        ["DutyEndNode", "DutyEndNode"],
        ["EndLines", "EndLines"],
        ["EndDriverId1", "EndDriverId1"],
    ],
    column_order: [
        [0, "DutyStartTime"],
        [1, "DutyEndTimeSeconds"],
        [2, "IsDriverPresent"],
        [3, "VehicleNr"],
        [4, "VehicleLicensePlate"],
        [5, "DailyRosterDate"],
        [6, "DutyName"],
        [7, "DutyEndTime"],
        [8, "DutyEndNode"],
        [9, "EndLines"],
        [10, "EndDriverId1"],
    ],
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