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

type UsageScreenProps = StackScreenProps<StackParamList, "UsageScreen">;

function UsageScreen({ navigation }: UsageScreenProps) {
  const { usage, setUsage } = surveyStore(
    (state) => ({
      usage: state.usage,
      setUsage: state.setSurvey("usage"),
    }),
    shallow
  );

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu vou usar o PC para:</Title>
        <Spacer height={16} />
        <RadioButton.Group value={usage} onValueChange={setUsage}>
          <RadioWrapper>
            <RadioButton value="video-editor"></RadioButton>
            <Text onPress={() => setUsage("video-editor")}>
              Edição de video
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="software-development"></RadioButton>
            <Text onPress={() => setUsage("software-development")}>
              Desenvolvimento de software
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="office-tools"></RadioButton>
            <Text onPress={() => setUsage("office-tools")}>
              Ferramentas de escritório e pacote office
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="internet"></RadioButton>
            <Text onPress={() => setUsage("internet")}>
              Navegar na internet e redes sociais
            </Text>
          </RadioWrapper>
        </RadioButton.Group>
        <Spacer height={16} />
        <Button
          mode="contained"
          disabled={usage === ""}
          onPress={() => navigation.navigate("LoadingScreen")}
        >
          Processar perfil
        </Button>
      </View>
    </View>
  );
}

export { UsageScreen };
