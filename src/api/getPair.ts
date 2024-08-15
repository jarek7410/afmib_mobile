import { getCodeJoin, getTableJoin } from "../storage/tournament.ts";
import { getServerURL } from "../storage/login.ts";

export const getPair = async () => {
  return await fetch(
    (await getServerURL()) + "/api/tournament/" + (await getCodeJoin()),
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await getTableJoin()),
    },
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("getPair: response not ok");
      throw new Error("getPair failed: data grab");
    })
    .then((respJson: any) => {
      console.log("Done.");
      return respJson.pair_number;
    });
};
