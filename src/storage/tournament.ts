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
  await AsyncStorage.setItem(
    "@tableJoin" + (await getCodeJoin()),
    JSON.stringify(tableJoin),
  );
};
export const getTableJoin = async (): Promise<tableJoinDTO | null> => {
  const tableJoin = await AsyncStorage.getItem(
    "@tableJoin" + (await getCodeJoin()),
  );
  return tableJoin != null ? JSON.parse(tableJoin) : null;
};

export const savePairNumber = async (pairNumber: number) => {
  await AsyncStorage.setItem(
    "@pairNumber" + (await getCodeJoin()),
    JSON.stringify(pairNumber),
  );
};
export const getPairNumber = async (): Promise<number | null> => {
  const pairNumber = await AsyncStorage.getItem(
    "@pairNumber" + (await getCodeJoin()),
  );
  return pairNumber != null ? JSON.parse(pairNumber) : null;
};
