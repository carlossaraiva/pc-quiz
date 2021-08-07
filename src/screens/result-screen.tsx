import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "@types";
import React from "react";
import { View, FlatList } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

type ResultScreenProps = StackScreenProps<StackParamList, "ResultScreen">;

function ResultScreen({ navigation, route }: ResultScreenProps) {
  const result = route.params.result;

  const renderItem = ({ item }) => {
    return (
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
    );
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <FlatList
        data={result}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
      <Button onPress={() => navigation.popToTop()}>Recomeçar</Button>
    </View>
  );
}

export { ResultScreen };
