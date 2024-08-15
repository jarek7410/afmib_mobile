import AsyncStorage from "@react-native-async-storage/async-storage";
import { codejoinDTO, tableJoinDTO } from "./dto.ts";
import { addCodeToHistory } from "./history.ts";

export const saveCodeJoin = async (codeJoin: codejoinDTO) => {
  await AsyncStorage.setItem("@codeJoin", JSON.stringify(codeJoin));
  addCodeToHistory(codeJoin.code);
};
export const getCodeJoin = async (): Promise<codejoinDTO | null> => {
  const codeJoin = await AsyncStorage.getItem("@codeJoin");
  return codeJoin != null ? JSON.parse(codeJoin) : null;
};

export const saveTableJoin = async (tableJoin: tableJoinDTO) => {
  await AsyncStorage.setItem(
    (await getCodeJoin()) + "@tableJoin",
    JSON.stringify(tableJoin),
  );
};
export const getTableJoin = async (): Promise<tableJoinDTO | null> => {
  const tableJoin = await AsyncStorage.getItem(
    (await getCodeJoin()) + "@tableJoin",
  );
  return tableJoin != null ? JSON.parse(tableJoin) : null;
};

export const savePairNumber = async (pairNumber: number) => {
  await AsyncStorage.setItem(
    (await getCodeJoin()) + "@pairNumber",
    JSON.stringify(pairNumber),
  );
};
export const getPairNumber = async (): Promise<number | null> => {
  const pairNumber = await AsyncStorage.getItem(
    (await getCodeJoin()) + "@pairNumber",
  );
  return pairNumber != null ? JSON.parse(pairNumber) : null;
};
