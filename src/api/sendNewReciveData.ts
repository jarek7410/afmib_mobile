import { reciveDataDto } from "../storage/dto.ts";
import { getCodeJoin } from "../storage/tournament.ts";
import { getServerURL } from "../storage/login.ts";

export const sendNewReciveData = async (NewRecData: reciveDataDto) => {
  await fetch(
    (await getServerURL()) +
      "api/view/tournament/" +
      (await getCodeJoin()) +
      "/board",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewRecData),
    },
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    console.log("sendPlayerNames: response not ok");
    throw new Error("sendPlayerNames failed: data grab");
  });
};
