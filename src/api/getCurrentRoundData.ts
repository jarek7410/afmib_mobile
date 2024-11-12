import { PairStat } from "../storage/dto.ts";
import { getServerURL } from "../storage/login.ts";
import { getCodeJoin } from "../storage/tournament.ts";

/**
 * Deprecated????but now is reused
 */
export const getCurrentRoundData = async (): Promise<[PairStat]> => {
  return await fetch(
    (await getServerURL()) +
      "api/view/tournament/" +
      (await getCodeJoin()) +
      "/pair/rounds",
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
    .then((respJson: [PairStat]) => {
      console.log("getCurrentRoung", "Done.");
      return respJson;
    });
};
