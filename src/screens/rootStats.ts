export type RootStackParamList = {
  Home: undefined;
  Login: { login: () => Promise<void> };
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
