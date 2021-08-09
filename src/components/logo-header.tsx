import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function LogoHeader() {
  const { colors, roundness } = useTheme();

  return (
    <View
      style={[
        styles.logo,
        { backgroundColor: colors.primary, alignSelf: "flex-end" },
      ]}
    >
      <AntDesign name="poweroff" size={16} color="white" />
      <View style={{ width: 4 }} />
      <Text style={{ color: "white" }}>BUSCAPC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
  },
});

export { LogoHeader };
