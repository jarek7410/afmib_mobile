import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLangue = async (langue: string) => {
  await AsyncStorage.setItem("@langue", langue);
}
export const getLangue = () => {
 return AsyncStorage.getItem("@langue")
  .then(
    language => {
      return language != null ? language : "en";
    },
  );

}
