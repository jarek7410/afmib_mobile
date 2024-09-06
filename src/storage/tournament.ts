import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  codejoinDTO,
  movementDTO,
  tableJoinDTO,
  tournamentDTO,
} from "./dto.ts";
import { addCodeToHistory } from "./history.ts";

export const saveCodeJoin = async (codeJoin: codejoinDTO) => {
  await AsyncStorage.setItem("@codeJoin", JSON.stringify(codeJoin));
  if (codeJoin.code != null) {
    await addCodeToHistory(codeJoin.code);
  }
};
/**
 * @returns codeJoin can be null, and it signals that the app is in wrong state
 */
export const getCodeJoin = async (): Promise<string | null> => {
  const codeJoin = await AsyncStorage.getItem("@codeJoin");
  return codeJoin != null ? JSON.parse(codeJoin).code : null;
};
export const getCodeJoinObject = async (): Promise<codejoinDTO | null> => {
  const codeJoin = await AsyncStorage.getItem("@codeJoin");
  return codeJoin != null ? JSON.parse(codeJoin) : null;
};

export const saveTournament = async (tournament: tournamentDTO) => {
  await AsyncStorage.setItem(
    (await getCodeJoin()) + "@tournament",
    JSON.stringify(tournament),
  );
};
export const getTournament = async (): Promise<tournamentDTO> => {
  const tournament = await AsyncStorage.getItem(
    (await getCodeJoin()) + "@tournament",
  );
  return tournament != null
    ? JSON.parse(tournament)
    : { ID: 0, name: "", creator_id: "", code_id: "" }; //maybe should be null
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
export const getPairNumber = async (): Promise<number> => {
  const pairNumber = await AsyncStorage.getItem(
    (await getCodeJoin()) + "@pairNumber",
  );
  return pairNumber != null ? JSON.parse(pairNumber) : 0;
};

export const saveMovementData = async (movementData: movementDTO[]) => {
  await AsyncStorage.setItem(
    (await getCodeJoin()) + "@movementData",
    JSON.stringify(movementData),
  );
};
export const getMovementData = async (): Promise<movementDTO[]> => {
  const movementData = await AsyncStorage.getItem(
    (await getCodeJoin()) + "@movementData",
  );
  return movementData != null ? JSON.parse(movementData) : [];
};
