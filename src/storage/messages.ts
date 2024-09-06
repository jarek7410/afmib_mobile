import AsyncStorage from "@react-native-async-storage/async-storage";
import { messageWS } from "./dto.ts";
import { addMessageToHistory } from "./history.ts";

export const setNewestMessage = async (message: messageWS) => {
  await AsyncStorage.setItem("@newestMessage", JSON.stringify(message));
  addMessageToHistory(message);
};
export const getNewestMessage = async (): Promise<messageWS> => {
  const message = await AsyncStorage.getItem("@newestMessage");
  return message != null ? JSON.parse(message) : { message: "" };
};
