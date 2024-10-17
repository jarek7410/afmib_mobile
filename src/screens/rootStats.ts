import { movementDTO } from "../storage/dto.ts";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  CodeJoin: undefined;
  Settings: undefined;
  InputPlayer: { join: () => void };
  Summary: { exit: () => void };
  InfoReceiver: undefined;
  Movement: undefined;
  InputData: undefined;
  Loading: undefined;
  Tournament: undefined;
  UserSettings: undefined;
  PlayerNames: { movment: movementDTO };
  InputReceiveData: undefined;
};
