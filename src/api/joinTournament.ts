import { getCodeJoin } from "../storage/tournament.ts";
import { getServerURL } from "../storage/login.ts";
import { tournamentDTO } from "../storage/dto.ts";

export const joinTournament = async () => {
  const respons = await fetch(
    (await getServerURL()) + "api/view/tournament/" + (await getCodeJoin()),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log("joinTournament", "joinTournament: response not ok");
      throw new Error("joinTournament failed: data grab");
    })
    .then((respJson: tournamentDTO) => {
      console.log("joinTournament", "Done.");
      return respJson;
    });
  return respons;
};
