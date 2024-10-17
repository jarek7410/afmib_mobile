import { MeDataDto } from "./dto.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyObjects } from "../api/getMe.ts";

// eslint-disable-next-line prettier/prettier
export const getMyData = async (): Promise<MeDataDto> =>{
  const myData = await AsyncStorage.getItem("@userData");
  if (myData != null) {
    return JSON.parse(myData);
  }
  try {
    const myDataNew = await getMyObjects();
    setMyData(myDataNew);
    return myDataNew;
  } catch {
    return {
      ID: -1,
      email: "",
      name: "",
      pid: "",
      surname: "",
      username: "Guest",
    };
  }
};

export const setMyData = async (mydata: MeDataDto): Promise<void> => {
  await AsyncStorage.setItem("@userData", JSON.stringify(mydata));
};
