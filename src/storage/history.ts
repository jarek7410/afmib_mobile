import AsyncStorage from "@react-native-async-storage/async-storage";
import { codeWithDate } from "./dto.ts";

export const addCodeToHistory = async (code: string) => {
  const codes = await getCodeHistoryWithDates();
  const date = new Date();
  const cwd: codeWithDate = { code, date: date };
  await AsyncStorage.setItem("@codeHistory", JSON.stringify([...codes, cwd]));
};
export const getCodeHistory = async (): Promise<string[]> => {
  const codes = await getCodeHistoryWithDates();
  return codes.map(cwd => cwd.code);
};

export const getCodeHistoryWithDates = async (): Promise<codeWithDate[]> => {
  const codes = await AsyncStorage.getItem("@codeHistory");
  // console.log("code history", codes);
  if (codes === null) {
    return [];
  }
  const jcode = JSON.parse(codes);
  return jcode.map((code: any) => {
    return { code: code.code, date: new Date(code.date) };
  });
};
