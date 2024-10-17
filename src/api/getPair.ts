import { getCodeJoin, getTableJoin } from "../storage/tournament.ts";
import { getServerURL, getToken } from "../storage/login.ts";

export const getPair = async (): Promise<number> => {
  return await fetch(
    (await getServerURL()) + "api/view/tournament/" + (await getCodeJoin()),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + (await getToken()),
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
      // console.log("Done.");
      return respJson.pair_number;
    });
};
