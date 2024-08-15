import AsyncStorage from "@react-native-async-storage/async-storage";
import { codejoinDTO, tableJoinDTO } from "./dto.ts";

export const saveCodeJoin = async (codeJoin: codejoinDTO) => {
  await AsyncStorage.setItem("@codeJoin", JSON.stringify(codeJoin));
};
export const getCodeJoin = async (): Promise<codejoinDTO | null> => {
  const codeJoin = await AsyncStorage.getItem("@codeJoin");
  return codeJoin != null ? JSON.parse(codeJoin) : null;
};

export const saveTableJoin = async (tableJoin: tableJoinDTO) => {
  await AsyncStorage.setItem("@tableJoin", JSON.stringify(tableJoin));
};
export const getTableJoin = async (): Promise<tableJoinDTO | null> => {
  const tableJoin = await AsyncStorage.getItem("@tableJoin");
  return tableJoin != null ? JSON.parse(tableJoin) : null;
};
