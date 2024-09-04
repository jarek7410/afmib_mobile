import { getServerURL, getToken } from "../storage/login.ts";
import { MeDataDto, saveMeDataDto } from "../storage/dto.ts";

export const setMyObjects = async (data:saveMeDataDto) => {
  return fetch((await getServerURL()) + "api/me", {
    headers: {
      Authorization: "Bearer " + (await getToken()),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(
      data
    )
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("HomeScreen: getMyObjects: response not ok");
      throw new Error("login failed: data grab");
    })
    .then((respJson: any) => {
      console.log("Done.",respJson);
      // const jsonValue = respJson;
      return true;
    });
};
