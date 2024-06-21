import { useEffect, useState } from "react";
import { getStartNodes } from "./queries";

export type UserPrefs = {
    message: string;
    color1: string;
    color2: string;
    highlightColor: string;
    textColor1: string;
    textColor2: string;
    logo: string;
    table_map: Array<[string, string]>;
    column_order: string[];
    switch_map: Array<[string,boolean]>;
    station: string;
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
        ["DutyStartTimeSeconds", "DutyStartTimeSeconds"],
        ["DutyEndTimeSeconds", "DutyEndTimeSeconds"],
        ["IsDriverPresent", "IsDriverPresent"],
        ["VehicleNr", "VehicleNr"],
        ["VehicleLicensePlate", "VehicleLicensePlate"],
        ["DailyRosterDate", "DailyRosterDate"],
        ["DutyName", "DutyName"],
        ["DutyEndTime", "DutyEndTime"],
        ["DutyEndNode", "DutyEndNode"],
        ["DutyStartNode", "DutyStartNode"],
        ["EndLines", "EndLines"],
        ["EndDriverId1", "EndDriverId1"],
    ],
    column_order: [
        "DutyStartTimeSeconds",
        "DutyEndTimeSeconds",
        "IsDriverPresent",
        "VehicleNr",
        "VehicleLicensePlate",
        "DailyRosterDate",
        "DutyName",
        "DutyEndTime",
        "DutyEndNode",
        "DutyStartNode",
        "EndLines",
        "EndDriverId1",
    ],
    switch_map: [
      ["DutyStartTimeSeconds",true],
      ["DutyEndTimeSeconds",true],
      ["IsDriverPresent",true],
      ["VehicleNr",true],
      ["VehicleLicensePlate",true],
      ["DailyRosterDate",true],
      ["DutyName",true],
      ["DutyEndTime",true],
      ["DutyEndNode",true],
      ["DutyStartNode",true],
      ["EndLines",true],
      ["EndDriverId1",true]
    ],
    station:"",
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
    const [stations, setStations] = useState<string[]>([]);

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

    return { userPrefs, updateUserPrefs, stations };
  };

export default useUserPrefs;