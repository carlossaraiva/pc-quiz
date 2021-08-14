import { Spacer } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "@types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import {
  Title,
  useTheme,
  Paragraph,
  TouchableRipple,
  Card,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Answer } from "../domain/Answer";
import { ScrollView } from "react-native-gesture-handler";
import { getNextQuestion } from "../data/survey-data";

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

type CustomOptionsProps = {
  title: string;
  description: string;
  isActive: boolean;
  onTouch: () => void;
};

function CustomOption({
  title,
  description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisicing elit amet consectetur amet consectetur amet consectetur`,
  isActive,
  onTouch,
}: CustomOptionsProps) {
  const { colors, roundness } = useTheme();
  const currentActiveColor = isActive ? colors.primary : colors.disabled;
  const currentTextColor = isActive ? colors.text : colors.disabled;

  return (
    <TouchableRipple onPress={onTouch}>
      <View
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
          <Paragraph style={{ color: currentTextColor, textAlign: "left" }}>
            {description}
          </Paragraph>
        </View>
      </View>
    </TouchableRipple>
  );
}

function DeviceScreen({
  navigation: { navigate, push },
  route: {
    params: { survey, query = [] },
  },
}: DeviceScreenProps) {
  const { colors, roundness } = useTheme();
  const [answer, setAnswer] = useState<Answer>();
  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (answer) {
      Animated.timing(position, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [answer]);

  return (
    <View style={{ flex: 1 }}>
      <Card
        style={[
          styles.container,
          {
            marginTop: 16,
            marginRight: 8,
            marginLeft: 8,
          },
        ]}
      >
        <Spacer height={16} />
        <View
          style={{
            paddingRight: 16,
            paddingLeft: 16,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <Title style={{ textAlign: "center" }}>{survey.question}</Title>
        </View>
        <Spacer height={8} />
        <ScrollView
          style={{ flex: 1, zIndex: 1 }}
          stickyHeaderIndices={[1]}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View style={{ paddingRight: 16, paddingLeft: 16 }}>
            {survey.answers.map((answerData) => (
              <Fragment key={answerData.value}>
                <CustomOption
                  title={answerData.label}
                  description={answerData.description}
                  isActive={answerData.value === answer?.value}
                  onTouch={() =>
                    setAnswer((prev) => ({ ...prev, ...answerData }))
                  }
                />
                <Spacer height={32} />
              </Fragment>
            ))}
          </View>
          <Spacer height={16} />
        </ScrollView>
        <Animated.View
          style={{
            position: "absolute",
            height: position.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 39],
            }),
            bottom: 0,
            backgroundColor: colors.primary,
            width: "100%",
            overflow: "hidden",
            zIndex: 1,
            borderBottomRightRadius: roundness,
            borderBottomLeftRadius: roundness,
          }}
        >
          <TouchableRipple
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              if (!answer?.nextQuestion)
                return navigate("LoadingScreen", { query });

              push("DeviceScreen", {
                survey: getNextQuestion(answer?.nextQuestion),
                query: [...query, ...(answer.keywords ?? [])],
              });
            }}
          >
            <Paragraph style={{ color: "white" }}>CONTINUAR</Paragraph>
          </TouchableRipple>
        </Animated.View>
      </Card>
      <Spacer height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
});

export { DeviceScreen };
