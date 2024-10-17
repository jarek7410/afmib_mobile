import { PairStat } from "../storage/dto.ts";
import { getServerURL } from "../storage/login.ts";
import { getCodeJoin, getPairNumber } from "../storage/tournament.ts";

export const GetCurrentRound = async (): Promise<PairStat> => {
  return await fetch(
    (await getServerURL()) +
      "api/view/tournament/" +
      (await getCodeJoin()) +
      "/pair/" +
      (await getPairNumber()) +
      "/round",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + (await getToken()),
      },
    },
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("getCurrentRoung: response not ok");
      throw new Error("getPair failed: data grab");
    })
    .then((respJson: PairStat) => {
      console.log("getCurrentRoung", "Done.");
      return respJson;
    });
};
