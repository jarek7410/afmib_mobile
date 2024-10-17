import { getServerURL, getToken } from "../storage/login.ts";
import { getCodeJoin, getTableJoin } from "../storage/tournament.ts";
import { sendMyPlayerNameDTO, sendPlayerNameDTO, sendPlayerNamesDTO } from "../storage/dto.ts";

export const sendPlayerNames = async (playerNames: sendMyPlayerNameDTO[]) => {
  const tableJoin = await getTableJoin();
  if (tableJoin == null) {
    throw new Error("getTableJoin failed: data grab");
  }
  await fetch(
    (await getServerURL()) + "api/view/tournament/" + (await getCodeJoin())+"/myplayers",
    {
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(playerNames),
    },
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    console.log("sendPlayerNames: response not ok");
    throw new Error("sendPlayerNames failed: data grab");
  });
};
