import { Spacer } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "@types";
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Linking, Share } from "react-native";
import {
  Button,
  Card,
  Title,
  FAB,
  Portal,
  Provider,
  useTheme,
  Paragraph,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { getNextQuestion } from "../data/survey-data";
import { setString } from "expo-clipboard";
import Toast from "react-native-root-toast";
import { NavigationRouteContext } from "@react-navigation/core";

type ResultScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

const ResultCard = ({ item }) => {
  const { colors, roundness } = useTheme();

  return (
    <Card
      style={{ paddingHorizontal: 16 }}
      onPress={() => {
        Linking.openURL(item.link);
      }}
    >
      <Card.Content>
        <Title
          style={{ fontSize: 16, lineHeight: 16 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Title>
        <Spacer height={16} />
        <View style={{ flexDirection: "row" }}>
          <View style={{}}>
            <Card.Cover
              style={{
                flex: 1,
                width: 50,
                height: 50,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
              resizeMode="contain"
            />
          </View>
          <Spacer width={12} />
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Paragraph style={{ fontSize: 12 }}>
              Preço: {item.price_raw}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              Vendedor: {item.merchant}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "flex-end" }}>
        <Button
          onPress={() => {
            setString(item.link);

            Toast.show("Copiado pesquisa", {
              duration: Toast.durations.LONG,
            });
          }}
        >
          <AntDesign name="copy1" size={18} color={colors.accent} />
        </Button>
        <View style={{ width: 8 }} />
        <Button
          onPress={async () => {
            try {
              const result = await Share.share({
                message: item.link,
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {}
          }}
        >
          <AntDesign name="sharealt" size={18} color={colors.accent} />
        </Button>
      </Card.Actions>
    </Card>
  );
};

const MemoizedResultCard = React.memo(ResultCard);

function ResultScreen({
  navigation: { replace, reset, setParams },
  route,
}: ResultScreenProps) {
  const { result, searchStrings } = route.params.data;
  const [state, setState] = useState({ open: false });
  const { colors, roundness } = useTheme();

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={result}
        renderItem={({ item }) => <MemoizedResultCard item={item} />}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <Spacer height={16} />}
        keyExtractor={(item) => `${item.offer_id}-${item.position}`}
      />
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={"help"}
            fabStyle={{ backgroundColor: colors.accentLight }}
            actions={[
              {
                icon: "home",
                label: "Início",
                onPress: () => replace("Presentation"),
              },
              {
                icon: "restart",
                label: "Novo questionário",
                onPress: () =>
                  reset({
                    index: 0,
                    routes: [
                      { name: "Presentation" },
                      {
                        name: "DeviceScreen",
                        params: {
                          survey: getNextQuestion("DEVICE"),
                        },
                      },
                    ],
                  }),
              },
              {
                icon: "whatsapp",
                label: "Falar com especialista",
                onPress: () => {
                  Linking.openURL("https://wa.me/message/LLKG3HQJW7WUP1");
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export { ResultScreen };
