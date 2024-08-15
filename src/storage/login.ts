import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginDTO } from "./dto.ts";

export const setLoginData = async (login: loginDTO): Promise<void> => {
  await AsyncStorage.setItem("@login", JSON.stringify(login));
  await AsyncStorage.setItem("@token", login.token);
};
export const getLoginData = async (): Promise<loginDTO | null> => {
  const login = await AsyncStorage.getItem("@login");
  return login != null ? JSON.parse(login) : null;
};
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("@token");
};
export const getServerURL = async (): Promise<string> => {
  const url = await AsyncStorage.getItem("@serverURL");
  if (url === null) {
    return "http://192.168.0.120:2137/";
  }
  return url;
};
export const setServerURL = async (url: string): Promise<void> => {
  await AsyncStorage.setItem("@serverURL", url);
};