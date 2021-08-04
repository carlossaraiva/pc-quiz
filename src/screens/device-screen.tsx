import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button, RadioButton, Title, Text } from "react-native-paper";
import shallow from "zustand/shallow";
import { StackParamList } from "../../App";
import { RadioWrapper } from "../components/radio";
import { Spacer } from "../components/spacer";
import { surveyStore } from "../store";
import { styles } from "../styles";

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

function DeviceScreen({ navigation }: DeviceScreenProps) {
  const { device, setDevice } = surveyStore(
    (state) => ({
      device: state.device,
      setDevice: state.setSurvey("device"),
    }),
    shallow
  );

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu estou precisando de um:</Title>
        <Spacer height={16} />
        <RadioButton.Group onValueChange={setDevice} value={device}>
          <RadioWrapper>
            <RadioButton value="pc" />
            <Text onPress={() => setDevice("pc")}>PC</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="laptop" />
            <Text onPress={() => setDevice("laptop")}>Laptop</Text>
          </RadioWrapper>
        </RadioButton.Group>
        <Spacer height={16} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("UsageScreen")}
          disabled={device === ""}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}

export { DeviceScreen };
