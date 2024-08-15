import AsyncStorage from "@react-native-async-storage/async-storage";

export const dbOptions = async () => {
  console.log("Dumping DB to LOG");
  const keys = await AsyncStorage.getAllKeys();
  console.log("Keys", keys);
  for (const key of keys) {
    const value = await AsyncStorage.getItem(key);
    console.log(key, value);
  }
  console.log("Dumping DB to LOG done");
};
export const clearDB = async () => {
  await AsyncStorage.clear();
  console.log("DB cleared");
};
