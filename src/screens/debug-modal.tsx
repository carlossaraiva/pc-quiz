import React from "react";
import { View, Text } from "react-native";

function DebugModal({ route }) {
  const { searchStrings = [] } = route.params;

  return (
    <View>
      {searchStrings.map((specification) => (
        <Text>{specification}</Text>
      ))}
    </View>
  );
}

export { DebugModal };
