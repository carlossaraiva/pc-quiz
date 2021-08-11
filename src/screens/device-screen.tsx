import { Spacer, RadioWrapper, LogoSmall } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { surveyStore } from "@store";
import { StackParamList } from "@types";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  RadioButton,
  Title,
  Text,
  useTheme,
  Paragraph,
} from "react-native-paper";
import shallow from "zustand/shallow";
import { AntDesign } from "@expo/vector-icons";
import { SurveyData } from "../domain/SurveyData";
import { surveyData } from "@data";
import { Answer } from "../domain/Answer";

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;
function CustomOption({
  title,
  description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
  tempore perferendis saepe autem distinctio error, nesciunt nemo! Quia,
  omnis voluptas quae ipsam, nobis sapiente earum ex, repellat quaerat
  quidem illo!`,
  value,
  isActive,
  onTouch,
}) {
  const { colors, roundness } = useTheme();
  const currentActiveColor = isActive ? colors.primary : colors.disabled;
  const currentTextColor = isActive ? colors.text : colors.disabled;

  return (
    <View
      onTouchStart={onTouch}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: currentActiveColor,
        borderWidth: 1,
        borderRadius: roundness,
        padding: 8,
      }}
    >
      <View style={{ flex: 0.2 }}>
        <AntDesign name="poweroff" size={32} color={currentActiveColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Title>{title}</Title>
        <Paragraph style={{ color: currentTextColor }}>{description}</Paragraph>
      </View>
    </View>
  );
}

function DeviceScreen({
  navigation: { navigate, push },
  route: {
    params: { survey },
  },
}: DeviceScreenProps) {
  const { device, setDevice } = surveyStore(
    ({ device, setSurvey }) => ({
      device,
      setDevice: setSurvey("device"),
    }),
    shallow
  );
  const { colors, roundness } = useTheme();
  const [answer, setAnswer] = useState<Answer>();

  const defaultOrDeviceValue = device ?? "";
  const deviceIsEmpty = !answer;

  return (
    <View style={styles.container}>
      <View>
        <Spacer height={16} />
        <View
          style={{ borderRadius: roundness, backgroundColor: colors.primary }}
        >
          <Title style={{ marginLeft: 8, color: "white" }}>
            {survey.question}
          </Title>
        </View>
        <Spacer height={16} />
        {survey.answers.map((answerData) => (
          <>
            <CustomOption
              key={answerData.label}
              title={answerData.label}
              description={answerData.description}
              isActive={answerData.value === answer?.value}
              onTouch={() => setAnswer((prev) => ({ ...prev, ...answerData }))}
            />
            <Spacer height={16} />
          </>
        ))}
        <Button
          mode="contained"
          onPress={() => {
            if (!answer?.nextQuestion) return;

            push("DeviceScreen", {
              survey: surveyData[answer?.nextQuestion],
            });
          }}
          disabled={deviceIsEmpty}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingRight: 16, paddingLeft: 16, paddingTop: 16 },
});

export { DeviceScreen };
