import { Spacer } from "@component";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "@types";
import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Paragraph,
  Title,
  FAB,
  Portal,
  Provider,
  useTheme,
} from "react-native-paper";

type ResultScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

function ResultScreen({ navigation, route }: ResultScreenProps) {
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
            <Paragraph>{item.link}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
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
            icon={open ? "calendar-today" : "plus"}
            fabStyle={{ backgroundColor: colors.accentLight }}
            actions={[
              { icon: "plus", onPress: () => console.log("Pressed add") },
              {
                icon: "star",
                label: "Star",
                onPress: () => console.log("Pressed star"),
              },
              {
                icon: "email",
                label: "Email",
                onPress: () => console.log("Pressed email"),
              },
              {
                icon: "bell",
                label: "Remind",
                onPress: () => console.log("Pressed notifications"),
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
