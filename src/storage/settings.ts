import { settings } from "./dto.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCodeJoin } from "./tournament.ts";

export const setSettings = async (settings: settings) => {
  AsyncStorage.setItem(
    (await getCodeJoin()) + "@Settings",
    JSON.stringify(settings),
  );
  AsyncStorage.setItem(
    (await getCodeJoin()) + "@helloMessage",
    JSON.stringify(settings.helloMessage),
  );
};
export const getSettings = async (): Promise<settings | null> => {
  return await AsyncStorage.getItem((await getCodeJoin()) + "@settings").then(
    setting => {
      if (setting != null) {
        return JSON.parse(setting);
      }
    },
  );
};
