import AsyncStorage from "@react-native-async-storage/async-storage";
import { codeWithDate, messageForHistory, messageWS, tableJoinDTO } from "./dto.ts";
import { getLoginData } from "./login.ts";
import { getCodeJoin } from "./tournament.ts";

export const addCodeToHistory = async (code: string) => {
  const name: string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  });
  if (code == "") {
    console.log("empty code");
    return;
  }
  console.log("name", name);
  const codes = await getCodeHistoryWithDates();
  const date = new Date();
  const cwd: codeWithDate = { code, date: date };
  const index = codes.findIndex(c => c.code === code);
  if (index !== -1) {
    codes[index] = cwd;
    await AsyncStorage.setItem(
      name + "@codeHistory",
      JSON.stringify([...codes]),
    );
    return;
  }
  await AsyncStorage.setItem(
    name + "@codeHistory",
    JSON.stringify([...codes, cwd]),
  );
};
export const getCodeHistory = async (): Promise<string[]> => {
  const codes = await getCodeHistoryWithDates();
  return codes.map(cwd => cwd.code);
};

export const getCodeHistoryWithDates = async (): Promise<codeWithDate[]> => {
  const name: string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  });
  const codes = await AsyncStorage.getItem(name + "@codeHistory");
  // console.log("code history", codes);
  if (codes === null) {
    return [];
  }
  const jcode = JSON.parse(codes);
  return jcode.map((code: any) => {
    return { code: code.code, date: new Date(code.date) };
  });
};

export async function getMessageHistory(): Promise<messageForHistory[]> {
  const name: string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  });
  const messages = await AsyncStorage.getItem(
    name + "@" + (await getCodeJoin()) + "@messageHistory",
  );
  if (messages === null) {
    return [];
  }
  return JSON.parse(messages);
}

export const addMessageToHistory = async (message: messageWS) => {
  const name: string = await getLoginData().then(login => {
    if (login === null) {
      return "";
    }
    return login.name;
  });
  if (message == null) {
    console.log("empty message");
    return;
  }
  console.log("name", name);
  const messages = await getMessageHistory();
  const date = new Date();
  const cwd: messageForHistory = {
    message: message.message,
    date: date,
    ID: message.ID,
    type: message.type,
  };
  await AsyncStorage.setItem(
    name + "@" + (await getCodeJoin()) + "@messageHistory",
    JSON.stringify([...messages, cwd]),
  );
};
export const getTableJoin = async (
  code: codeWithDate,
): Promise<tableJoinDTO | null> => {
  const tableJoin = await AsyncStorage.getItem(code.code + "@tableJoin");
  return tableJoin != null ? JSON.parse(tableJoin) : null;
};
