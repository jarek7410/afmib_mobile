import { getServerURL, getToken } from "../storage/login.ts";
import { MeDataDto } from "../storage/dto.ts";

export const getMyObjects = async () => {
  return fetch((await getServerURL()) + "api/me", {
    headers: {
      Authorization: "Bearer " + (await getToken()),
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("HomeScreen: getMyObjects: response not ok");
      throw new Error("login failed: data grab");
    })
    .then((respJson: MeDataDto) => {
      console.log("Done.");
      // const jsonValue = respJson;
      return respJson;
    });
};
