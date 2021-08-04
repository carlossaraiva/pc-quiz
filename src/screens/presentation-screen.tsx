import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Title, Text, Button } from "react-native-paper";
import { StackParamList } from "../../App";
import { Spacer } from "../components/spacer";
import { surveyStore } from "../store";
import { styles } from "../styles";

type PresentationProps = StackScreenProps<StackParamList, "Presentation">;

function PresentationScreen({ navigation }: PresentationProps) {
  const clearStore = surveyStore((state) => state.clear);

  return (
    <View style={styles.container}>
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
