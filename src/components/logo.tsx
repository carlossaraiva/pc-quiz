import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function Logo() {
  const { colors } = useTheme();

  return (
    <View style={[styles.logo, { backgroundColor: colors.primary }]}>
      <AntDesign name="poweroff" size={128} color="white" />
      <Text style={{ color: "white" }}>BUSCAPC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
});

export { Logo };
