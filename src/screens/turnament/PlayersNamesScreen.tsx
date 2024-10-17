import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";

type Props = NativeStackScreenProps<RootStackParamList, "PlayerNames">;

export const PlayersNamesScreen = ({route}: Props) => {
  route.params.movment;
};
