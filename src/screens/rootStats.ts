export type RootStackParamList = {
  Home: undefined;
  Login: { login: () => void };
  Register: undefined;
  CodeJoin: undefined;
  Settings: { logout: () => void };
  InputPlayer: { join: () => void };
  Summary: { exit: () => void };
  InfoReceiver: undefined;
  Movement: undefined;
  InputData: undefined;
  Loading: undefined;
  Tournament: undefined;
};
