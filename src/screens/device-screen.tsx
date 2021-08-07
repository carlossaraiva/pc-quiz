import { Spacer, RadioWrapper } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { surveyStore } from "@store";
import { styles } from "@styles";
import { StackParamList } from "@types";
import React from "react";
import { View } from "react-native";
import { Button, RadioButton, Title, Text } from "react-native-paper";
import shallow from "zustand/shallow";

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

function DeviceScreen({ navigation: { navigate } }: DeviceScreenProps) {
  const { device, setDevice } = surveyStore(
    ({ device, setSurvey }) => ({
      device,
      setDevice: setSurvey("device"),
    }),
    shallow
  );

  const defaultOrDeviceValue = device ?? "";
  const deviceIsEmpty = device === "";

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu estou precisando de um:</Title>
        <Spacer height={16} />
        <RadioButton.Group
          onValueChange={setDevice}
          value={defaultOrDeviceValue}
        >
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
          onPress={() => navigate("UsageScreen")}
          disabled={deviceIsEmpty}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}

export { DeviceScreen };
