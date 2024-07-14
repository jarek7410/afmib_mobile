import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginDTO } from "./dto.ts";

export const setLoginData = async (login: loginDTO): Promise<void> => {
  await AsyncStorage.setItem("@login", JSON.stringify(login));
  await AsyncStorage.setItem("@jwt", login.jwt);
};
export const GetLoginData = async (): Promise<loginDTO | null> => {
  const login = await AsyncStorage.getItem("@login");
  return login != null ? JSON.parse(login) : null;
};
export const GetJWT = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("@jwt");
};
