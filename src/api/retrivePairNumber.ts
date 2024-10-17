import { getPairNumber, savePairNumber } from "../storage/tournament.ts";
import { getPair } from "./getPair.ts";
import { sleep } from "../handler/sleep.ts";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import { EventRegister } from "react-native-event-listeners";

export const retrivePairNumber=async ()=>{
  var pairNumber=await getPairNumber()
  if(pairNumber!=0){
    return
  }
  while (true){

    await sleep(5000)
    const pair=await getPair()
    await savePairNumber(pair)
    var pairnumber = await getPairNumber()
    if(pair!=0){
      EventRegister.emit("pairNumberRetrive",pair)
      break
    }
  }

}
