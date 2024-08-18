import { getServerURL, getToken } from "../storage/login.ts";
import { getCodeJoin, getPairNumber } from "../storage/tournament.ts";

export var ws: WebSocket | null = null;
export const messager = async (
  onmessage?: (e: WebSocketMessageEvent) => void,
  onerror?: (e: WebSocketMessageEvent) => void,
  onclose?: (e: WebSocketMessageEvent) => void,
): Promise<WebSocket> => {
  // if (ws === null || ws.readyState === WebSocket.CLOSED) {
  ws = new WebSocket(
    (await getServerURL()) +
      "api/ws/" +
      ((await getCodeJoin()) + "/" + (await getPairNumber())),
    null,
    {
      headers: { Authorization: `Bearer ${await getToken()}` },
    },
  );
  // }
  console.log(ws.readyState);
  ws.onopen = () => {
    // connection opened
    // ws.send("something"); // send a message
  };

  ws.onmessage = onmessage !== undefined ? onmessage : null;

  ws.onerror = onerror !== undefined ? onerror : null;

  ws.onclose = onclose !== undefined ? onclose : null;
  return ws;
};
