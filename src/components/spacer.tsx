import React from "react";
import { View } from "react-native";

type SpacerProps = {
  height?: string | number;
  width?: string | number;
};

function Spacer({ height, width }: SpacerProps) {
  return <View style={{ height, width }} />;
}

export { Spacer };
