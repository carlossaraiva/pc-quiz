import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { StackParamList } from "../../App";
import { Spacer } from "../components/spacer";
import { RESPONSES, surveyStore } from "../store";
import { styles } from "../styles";

type LoadingScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

function LoadingScreen({ navigation }: LoadingScreenProps) {
  const { usage, device } = surveyStore(
    (state) => ({
      usage: state.usage,
      device: state.device,
      setUsage: state.setSurvey("usage"),
    }),
    shallow
  );

  const query = RESPONSES[device][usage].query;

  const { data, isSuccess } = useQuery(["results", query], () => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://afternoon-bayou-13013.herokuapp.com/test?${new URLSearchParams(
        {
          q: query,
        }
      )}`
    ).then((res) => res.json());
  });

  useEffect(() => {
    if (isSuccess) navigation.replace("ResultScreen", { result: data });
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={128} />
      <Spacer height={32} />
      <Text>Processando seu perfil.</Text>
      <Text>Aguarde um momento...</Text>
    </View>
  );
}

export { LoadingScreen };
