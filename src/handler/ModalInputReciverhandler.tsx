import {
  magicModal,
  MagicModalHideReason,
  useMagicModal,
} from "react-native-magic-modal";
import { TouchableOpacity, Vibration, View } from "react-native";
import Text from "../components/Text";
import { Colors } from "../styles/Colors.ts";
import { reciveDataDto } from "../storage/dto.ts";
import Button from "../components/Button";
import { style } from "../styles/loginRegisterStyle.ts";
import { useState } from "react";

type ConfirmationModalReturn = {
  success: boolean;
};

interface ConfirmationModalProps {
  NewRecData: reciveDataDto;
}

const ConfirmationModal = ({ NewRecData }: ConfirmationModalProps) => {
  const { hide } = useMagicModal<ConfirmationModalReturn>();
  const [dis, setDis] = useState(true);
  setTimeout(() => {
    setDis(false);
  }, 5000);

  return (
    <View
      style={[
        style.horCare,
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "pink",
        },
      ]}>
      <Text>Are you sure you want to confirm?</Text>
      <Text>
        Table:{NewRecData.table} Round:{NewRecData.round} Board:
        {NewRecData.board}
      </Text>
      <Text>
        NS: {NewRecData.pairNS} EW: {NewRecData.pairEW}
      </Text>
      <Text>
        declare: {NewRecData.ns} in pair {NewRecData.declarer}
      </Text>
      <Text>
        Contract: {NewRecData.contract} Result: {NewRecData.result}
      </Text>
      <Text> Lead: {NewRecData.leadCard}</Text>

      {!dis && (
        <Button onPress={() => hide({ success: true })}>
          <Text>Click here to confirm</Text>
        </Button>
      )}
      {dis && (
        <Button onPress={() => {}} disabled>
          <Text>Wait</Text>
        </Button>
      )}
    </View>
  );
};

export const handleConfirmationFlow = async (NewRecData: reciveDataDto) => {
  // You can call `show` with or without props, depending on the requirements of the modal.
  const result = await magicModal.show<ConfirmationModalReturn>(() => (
    <ConfirmationModal NewRecData={NewRecData} />
  )).promise;

  // Hide could potentially be a backdrop press, a back button press, or a swipe gesture.
  if (result.reason !== MagicModalHideReason.INTENTIONAL_HIDE) {
    // User cancelled the flow
    return false;
  }

  if (result.data.success) {
    Vibration.vibrate();
    console.log("Success!");
    return true;
    // magicModal.show(() => <ResponseModal text="Success!" />);
  }
  return false;
  // return magicModal.show(() => <ResponseModal text="Failure :(" />).promise;
};
