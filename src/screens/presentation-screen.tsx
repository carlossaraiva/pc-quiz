import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import {
  Title,
  Text,
  Button,
  useTheme,
  Avatar,
  Card,
  Paragraph,
} from "react-native-paper";
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner,
} from "expo-ads-admob";
import { StackParamList } from "@types";
import { Logo, LogoSmall, Spacer } from "@component";
import { surveyStore } from "@store";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { surveyData } from "@data";

type PresentationProps = StackScreenProps<StackParamList, "Presentation">;

function PresentationScreen({ navigation }: PresentationProps) {
  const clearStore = surveyStore((state) => state.clear);
  const { colors } = useTheme();

  const start = () => {
    clearStore();
    navigation.navigate("DeviceScreen", { survey: surveyData["DEVICE"] });
  };

  useEffect(() => {
    // AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712")
    //   .then(() =>
    //     AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
    //   )
    //   .then(AdMobInterstitial.showAdAsync);
    // AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917")
    //   .then(AdMobRewarded.requestAdAsync)
    //   .then(AdMobRewarded.showAdAsync);
  }, []);

  return (
    <>
      <ParallaxScrollView
        backgroundColor={colors.primary}
        stickyHeaderHeight={60}
        renderStickyHeader={() => <LogoSmall />}
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <View
            style={{
              height: 300,
              flex: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <Logo />
          </View>
        )}
      >
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View
            style={{
              paddingRight: 16,
              paddingLeft: 16,
            }}
          >
            <Spacer height={16} />
            <Card onPress={start}>
              <Card.Content>
                <Paragraph>
                  Seja bem vindo ao BUSCAPC! Aqui ajudaremos você a escolher o
                  computador ideal, seja para uso pessoal ou profissional. Basta
                  pressionar aqui e responder as perguntas nas próximas telas.
                  Boa jornada!
                </Paragraph>
              </Card.Content>
              <Spacer height={8} />
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button>Iniciar!</Button>
              </Card.Actions>
            </Card>
            <Spacer height={16} />
            <AdMobBanner
              style={{ alignSelf: "center" }}
              bannerSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              servePersonalizedAds
              onDidFailToReceiveAdWithError={console.log}
            />
            <Spacer height={16} />
            <Card onPress={start}>
              <Card.Content>
                <Paragraph>
                  Visite nossa seção de dicas para conhecer melhor como funciona
                  o computador e seus componentes.
                </Paragraph>
              </Card.Content>
              <Spacer height={8} />
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button>Seção de dicas</Button>
              </Card.Actions>
            </Card>
            <Spacer height={16} />
            <PublisherBanner
              style={{ alignSelf: "center" }}
              bannerSize="largeBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              onDidFailToReceiveAdWithError={console.log}
              onAdMobDispatchAppEvent={console.log}
            />
            <Spacer height={16} />
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  buttonsWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 32,
  },
});

export { PresentationScreen };
