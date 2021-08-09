import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function LogoSmall() {
  const { colors, roundness } = useTheme();

  return (
    <View style={[styles.logo, { backgroundColor: colors.primary }]}>
      <AntDesign name="poweroff" size={32} color="white" />
      <View style={{ width: 8 }} />
      <Text style={{ color: "white" }}>BUSCAPC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export { LogoSmall };
