import { getCodeJoin } from "../storage/tournament.ts";
import { getServerURL } from "../storage/login.ts";
import { settings } from "../storage/dto.ts";
import { setSettings } from "../storage/settings.ts";

export const GetTournamentSettings = async () => {
  await fetch(
    (await getServerURL()) +
      "api/view/tournament/" +
      (await getCodeJoin()) +
      "/settings",
    {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   // Authorization: "Bearer " + (await getToken()),
      // },
      // body: JSON.stringify(await getTableJoin()),
    },
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("getPair: response not ok");
      throw new Error("getPair failed: data grab");
    })
    .then((respJson: settings) => {
      console.log("settings:", respJson);
      setSettings(respJson)
      // return respJson.pair_number;
    });
};
