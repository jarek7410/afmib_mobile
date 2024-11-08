import { getCodeJoin, getPairNumber } from "../storage/tournament.ts";
import { getServerURL } from "../storage/login.ts";
import { movementDTO } from "../storage/dto.ts";

export const getMovement = async (): Promise<movementDTO[]> => {
  return await fetch(
    (await getServerURL()) +
      "api/view/tournament/" +
      (await getCodeJoin()) +
      "/" +
      (await getPairNumber()),
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
      console.log("getMovement: response not ok");
      throw new Error("getPair failed: data grab");
    })
    .then((respJson: movementDTO[]) => {
      console.log("getMovement", "Done.");
      return respJson;
    });
};
