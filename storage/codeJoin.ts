import AsyncStorage from "@react-native-async-storage/async-storage";
import { codejoinDTO } from "./dto.ts";

export const saveCodeJoin = async (codeJoin: codejoinDTO) => {
  await AsyncStorage.setItem("@codeJoin", JSON.stringify(codeJoin));
};
export const getCodeJoin = async (): Promise<codejoinDTO | null> => {
  const codeJoin = await AsyncStorage.getItem("@codeJoin");
  return codeJoin != null ? JSON.parse(codeJoin) : null;
};
