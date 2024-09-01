import { Direction, magicModal } from "react-native-magic-modal";
import React from "react";

export const handleQuickModal = async (
  content: React.JSX.Element,
  timeout: number,
) => {
  const swipeDirection = ["up", "down", "left", "right"][
    Math.round(Math.random() * 3)
  ] as Direction;

  console.log("Opening modal");
  const modalResponse = magicModal.show(() => content, {
    swipeDirection,
  });

  console.log("Modal ID: " + modalResponse.modalID);

  // Closing the modal automatically, programmatically
  if (timeout) {
    setTimeout(() => {
      magicModal.hide("close timeout", { modalID: modalResponse.modalID });
    }, timeout);
  }

  console.log("Modal closed with response:", await modalResponse.promise);
};
