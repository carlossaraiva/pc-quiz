import { Spacer, RadioWrapper, LogoSmall } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { surveyStore } from "@store";
import { StackParamList } from "@types";
import React from "react";
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

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

function CustomOption({ title, description, value, isActive, onTouch }) {
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
        <Paragraph style={{ color: currentTextColor }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          tempore perferendis saepe autem distinctio error, nesciunt nemo! Quia,
          omnis voluptas quae ipsam, nobis sapiente earum ex, repellat quaerat
          quidem illo!
        </Paragraph>
      </View>
    </View>
  );
}

function DeviceScreen({ navigation: { navigate } }: DeviceScreenProps) {
  const { device, setDevice } = surveyStore(
    ({ device, setSurvey }) => ({
      device,
      setDevice: setSurvey("device"),
    }),
    shallow
  );
  const { colors, roundness } = useTheme();

  const defaultOrDeviceValue = device ?? "";
  const deviceIsEmpty = device === "";

  return (
    <View style={styles.container}>
      <View>
        <Spacer height={16} />
        <View
          style={{ borderRadius: roundness, backgroundColor: colors.primary }}
        >
          <Title style={{ marginLeft: 8, color: "white" }}>
            O que você está precisando?
          </Title>
        </View>
        <Spacer height={16} />
        <CustomOption
          title="PC"
          isActive={defaultOrDeviceValue === "pc"}
          onTouch={() => setDevice("pc")}
        />
        <Spacer height={16} />
        <Spacer height={16} />
        <CustomOption
          title="Notebook"
          onTouch={() => setDevice("laptop")}
          isActive={defaultOrDeviceValue === "laptop"}
        />
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

const styles = StyleSheet.create({
  container: { flex: 1, paddingRight: 16, paddingLeft: 16, paddingTop: 16 },
});

export { DeviceScreen };
