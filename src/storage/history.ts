import AsyncStorage from "@react-native-async-storage/async-storage";
import { codeWithDate } from "./dto.ts";
import { getLogin, getLoginData } from "./login.ts";

export const addCodeToHistory = async (code: string) => {
  const name:string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  })
  console.log("name", name);
  const codes = await getCodeHistoryWithDates();
  const date = new Date();
  const cwd: codeWithDate = { code, date: date };
  await AsyncStorage.setItem(name+"@codeHistory", JSON.stringify([...codes, cwd]))
};
export const getCodeHistory = async (): Promise<string[]> => {
  const codes = await getCodeHistoryWithDates();
  return codes.map(cwd => cwd.code);
};

export const getCodeHistoryWithDates = async (): Promise<codeWithDate[]> => {
  const name:string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  })
  const codes = await AsyncStorage.getItem(name+"@codeHistory");
  // console.log("code history", codes);
  if (codes === null) {
    return [];
  }
  const jcode = JSON.parse(codes);
  return jcode.map((code: any) => {
    return { code: code.code, date: new Date(code.date) };
  });
};
