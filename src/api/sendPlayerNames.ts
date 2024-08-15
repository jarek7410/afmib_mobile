import { getServerURL, getToken } from "../storage/login.ts";
import { getCodeJoin, getTableJoin } from "../storage/tournament.ts";
import { sendPlayerNameDTO, sendPlayerNamesDTO } from "../storage/dto.ts";

export const sendPlayerNames = async (playerNames: sendPlayerNameDTO[]) => {
  const tableJoin = await getTableJoin();
  if (tableJoin == null) {
    throw new Error("getTableJoin failed: data grab");
  }
  const reqData: sendPlayerNamesDTO = {
    playerNumbers: playerNames,
    round: tableJoin.round,
    section: tableJoin.section,
    table: tableJoin.table,
  };
  await fetch(
    (await getServerURL()) + "api/playernames/" + (await getCodeJoin()),
    {
      headers: {
        Authorization: "Bearer " + (await getToken()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    },
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    console.log("sendPlayerNames: response not ok");
    throw new Error("sendPlayerNames failed: data grab");
  });
};
