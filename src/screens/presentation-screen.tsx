import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { AdMobBanner, PublisherBanner, AdMobRewarded } from "expo-ads-admob";
import { AD_REWARDED, AD_BANNER, AD_PUBLISHER } from "@env";
import { StackParamList } from "@types";
import { Spacer } from "@component";
import { surveyStore } from "@store";
import { styles } from "@styles";

type PresentationProps = StackScreenProps<StackParamList, "Presentation">;

function PresentationScreen({ navigation }: PresentationProps) {
  const clearStore = surveyStore((state) => state.clear);

  useEffect(() => {
    AdMobRewarded.setAdUnitID(AD_REWARDED)
      .then(() => AdMobRewarded.requestAdAsync({ servePersonalizedAds: true }))
      .then(AdMobRewarded.showAdAsync);
  }, []);

  return (
    <View style={styles.container}>
      <AdMobBanner bannerSize="largeBanner" adUnitID={AD_BANNER} />
      <View style={{ height: 40 }} />
      <PublisherBanner bannerSize="banner" adUnitID={AD_PUBLISHER} />
      <View style={{ padding: 32 }}>
        <Title>Bem vindo!!!</Title>
        <Text>Pressione "Começar" para iniciar o questionário.</Text>
        <Text>
          Selecione a resposta e pressione "Continuar" para confirmar. Na última
          questão pressionar "Processar perfil" para obter a recomendação.{" "}
        </Text>
        <Text>
          Os botões de respostas precisam de melhorias para aumentar a área de
          toque. Portanto, pressione sempre na região do botão ou do texto.
        </Text>
        <Spacer height={16} />
        <Button
          mode="contained"
          onPress={() => {
            clearStore();
            navigation.navigate("DeviceScreen");
          }}
        >
          Começar
        </Button>
      </View>
    </View>
  );
}

export { PresentationScreen };
