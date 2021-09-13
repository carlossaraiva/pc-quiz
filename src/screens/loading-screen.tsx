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
import { API_BASE_URL, API_ENDPOINT_BASE } from "@env";
import { StackParamList } from "@types";
import { Spacer } from "@component";
import { styles } from "@styles";
import { AdMobInterstitial } from "expo-ads-admob";

type LoadingScreenProps = StackScreenProps<StackParamList, "LoadingScreen">;

function LoadingScreen({
  navigation,
  route: {
    params: { hardwareSpecification },
  },
}: LoadingScreenProps) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const { data, isSuccess, isError, error } = useQuery(
    ["results", hardwareSpecification],
    () => {
      if (!hardwareSpecification)
        throw new Error("Query parameter is null or empty");

      return fetch(
        `${API_BASE_URL}/${API_ENDPOINT_BASE}?${new URLSearchParams(
          hardwareSpecification
        )}`
      ).then((res) => res.json());
    }
  );

  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      AdMobInterstitial.addEventListener("interstitialDidClose", () => {
        navigation.replace("ResultScreen", { result: data });
      });

      AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
        navigation.replace("ResultScreen", { result: data });
      });

      AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/8691691433")
        .then(() =>
          AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        )
        .then(AdMobInterstitial.showAdAsync);
    }
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
