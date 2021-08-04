import React from "react";
import { View } from "react-native";

type RadioWrapperProps = {
  children: React.ReactNode;
};

function RadioWrapper({ children }: RadioWrapperProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}

export { RadioWrapper };
