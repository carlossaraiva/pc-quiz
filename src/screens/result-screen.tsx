import { Spacer } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "@types";
import React, { useState } from "react";
import { View, FlatList, StyleSheet, Linking, Share } from "react-native";
import {
  Button,
  Card,
  Title,
  FAB,
  Portal,
  Provider,
  useTheme,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { getNextQuestion } from "../data/survey-data";
import { setString } from "expo-clipboard";
import Toast from "react-native-root-toast";

type ResultScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

function ResultScreen({
  navigation: { replace, reset },
  route,
}: ResultScreenProps) {
  const result = route.params.result;
  const [state, setState] = useState({ open: false });
  const { colors, roundness } = useTheme();

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const renderItem = ({ item }) => {
    return (
      <>
        <Card>
          <Card.Content>
            <Title>{item.title}</Title>
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} />
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
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              <AntDesign name="sharealt" size={18} color={colors.accent} />
            </Button>
          </Card.Actions>
        </Card>
        <Spacer height={16} />
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={result}
        renderItem={renderItem}
        contentContainerStyle={{ paddingRight: 16, paddingLeft: 16 }}
        keyExtractor={(item) => item.title}
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
