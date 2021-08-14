import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function LogoHeader({ color = "white" }) {
  const { colors, roundness } = useTheme();

  return (
    <View style={[styles.logo, { alignSelf: "flex-end" }]}>
      <AntDesign name="poweroff" size={16} color={color} />
      <View style={{ width: 12 }} />
      <Text style={{ color }}>BUSCAPC</Text>
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
