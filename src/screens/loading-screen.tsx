import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
  Dialog,
  Paragraph,
  Portal,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { API_BASE_URL, API_ENDPOINT_BASE } from "@env";
import { StackParamList } from "@types";
import { Spacer } from "@component";
import { surveyStore } from "@store";
import { styles } from "@styles";

type LoadingScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

function LoadingScreen({ navigation }: LoadingScreenProps) {
  const [visible, setVisible] = React.useState(false);
  const { result } = surveyStore(
    ({ getResult }) => ({
      result: getResult(),
    }),
    shallow
  );

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const { data, isSuccess, isError, error } = useQuery(
    ["results", result?.query],
    () => {
      if (!result) throw new Error("Query parameter is null or empty");

      return fetch(
        `${API_BASE_URL}/${API_ENDPOINT_BASE}?${new URLSearchParams({
          q: result.query,
        })}`
      ).then((res) => res.json());
    }
  );

  useEffect(() => {
    if (isSuccess) navigation.replace("ResultScreen", { result: data });
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{"error"}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ActivityIndicator size={128} />
      <Spacer height={32} />
      <Text>Processando seu perfil.</Text>
      <Text>Aguarde um momento...</Text>
    </View>
  );
}

export { LoadingScreen };
