import AsyncStorage from "@react-native-async-storage/async-storage";
import { codeWithDate } from "./dto.ts";

export const addCodeToHistory = async (code: string) => {
  const codes = await getCodeHistoryWithDates();
  const date = new Date();
  const codeWithDate:codeWithDate= {code, date:date}
  await AsyncStorage.setItem("@codeHistory", JSON.stringify([...codes, codeWithDate]));
}
export const getCodeHistory = async (): Promise<string[]> => {
  const codes =await getCodeHistoryWithDates();
  return codes.map((codeWithDate)=>codeWithDate.code);
}

export const getCodeHistoryWithDates = async (): Promise<codeWithDate[]> => {
  const codes = await AsyncStorage.getItem("@codeHistory");
  return codes!=null ? JSON.parse(codes) : [];
}
