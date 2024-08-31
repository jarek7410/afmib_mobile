// import React, { useState, useImperativeHandle } from "react";
// import { Text } from "react-native";
// import ModalContainer from "react-native-modal";
//
// export const imperativeModalRef = React.createRef();
//
// export const BasicModal = () => {
//   const [isVisible, setIsVisible] = useState(false);
//
//   const show = () => setIsVisible(true);
//   const hide = () => setIsVisible(false);
//
//   useImperativeHandle(imperativeModalRef, () => ({ hide, show }));
//
//   return (
//     <ModalContainer onBackdropPress={hide} isVisible={isVisible}>
//       <Text>My awesome modal!</Text>
//     </ModalContainer>
//   );
// };
