import React from "react";
import { View } from "react-native";

type SpacerProps = {
  height: string | number | undefined;
};

function Spacer({ height }: SpacerProps) {
  return <View style={{ height }} />;
}

export { Spacer };
