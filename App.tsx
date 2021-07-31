import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Provider as PaperProvider,
  Title,
  Text,
  Button,
  RadioButton,
  ActivityIndicator,
  Card,
  Paragraph,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import create from "zustand";
import shallow from "zustand/shallow";
import { configurePersist } from "zustand-persist";
import "react-native-url-polyfill/auto";

type SurveyState = {
  device: string;
  usage: string;
  setSurvey: (question: string) => (answer: string) => void;
  clear: () => void;
};

const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root",
});

const queryClient = new QueryClient();

const surveyStore = create<SurveyState>(
  persist(
    {
      key: "survey",
    },
    (set) => ({
      device: "",
      usage: "",
      setSurvey: (question: string) => (answer: string) =>
        set((state) => ({ ...state, [question]: answer })),
      clear: () => set(() => ({ device: "", usage: "" })),
    })
  )
);

type StringMap = {
  [key: string]: string;
};

const DEVICE_ANSWERS: StringMap = {
  pc: "PC",
  laptop: "Laptop",
};

const USAGE_ANSWERS: StringMap = {
  "video-editor": "para edição de video",
  "software-development": "para desenvolvimento de software",
  "office-tools": "com ferramentas de escritório e pacote office",
  internet: "em navegação na internet e redes sociais",
};

const RESPONSES = {
  pc: {
    "video-editor": {
      query: "PC+intel+i9+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk015nf1QkgIp2_1TaZM-kcplr00bHQ:1615675330800&q=PC&tbas=0&tbs=vw:g,mr:1,cat:325,pdtr0:1020653%7C3.9000000953674316%24,price:1,ppr_min:6000&sa=X&ved=0ahUKEwiSlKjRq67vAhUOIrkGHRIoBHkQvSsIvQcoAw&biw=1920&bih=937",
    },
    "software-development": {
      query: "PC+intel+i7+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03huVIYMtgjCYFlVTt0v9YYfw2eaQ:1615675272485&q=PC&tbs=vw:g,mr:1,pdtr0:1020655%7C64.0%24160.0,pdtr1:728839%7C728842,pdtr2:1020654%7C16.0%2416.0,cat:325,pdtr3:950630%7C950631&sa=X&ved=0ahUKEwjF9cC1q67vAhXOJrkGHXF-D8oQsysIoQMoAA&biw=1920&bih=937",
    },
    "office-tools": {
      query: "PC+intel+i3+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
    internet: {
      query: "PC+intel+i5+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
  },
  laptop: {
    "video-editor": {
      query: "notebook+intel+i9+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03gpAbfSpaQLakXJSL02CrJDvZ0YA:1615675425548&q=Notebook&tbs=vw:g,mr:1,pdtr0:1020720%7C64.0%2464.0,cat:328,pdtr1:1020484%7C4000.0%244000.0&sa=X&ved=0ahUKEwjSlL_-q67vAhXjH7kGHVH_BsEQvSsI9wgoBg&biw=1920&bih=937",
    },
    "software-development": {
      query: "notebook+intel+i7+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01iIYzi0fbTYoHg20ztnucm29HZRA:1615675484079&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:976847%7C976848,price:1,ppr_min:6000,ppr_max:10000,pdtr1:703981%7C764396,pdtr2:1020484%7C1000.0%24,cat:328,pdtr3:1337889%7C4192014&sa=X&ved=0ahUKEwiVwbOarK7vAhVZHLkGHU61DyAQsysI5wgoAA&biw=1920&bih=937",
    },
    "office-tools": {
      query: "notebook+intel+i3+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
    },
    internet: {
      query: "notebook+intel+i5+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
    },
  },
};

type SpacerProps = {
  height: string | number | undefined;
};

function Spacer({ height }: SpacerProps) {
  return <View style={{ height }} />;
}

type RadioWrapperProps = {
  children: React.ReactNode;
};

function RadioWrapper({ children }: RadioWrapperProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}

type StackParamList = {
  Presentation: undefined;
  DeviceScreen: undefined;
  UsageScreen: undefined;
  LoadingScreen: undefined;
  ResultScreen: undefined;
};

type PresentationProps = StackScreenProps<StackParamList, "Presentation">;

function Presentation({ navigation }: PresentationProps) {
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

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

function DeviceScreen({ navigation }: DeviceScreenProps) {
  const { device, setDevice } = surveyStore(
    (state) => ({
      device: state.device,
      setDevice: state.setSurvey("device"),
    }),
    shallow
  );

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu estou precisando de um:</Title>
        <Spacer height={16} />
        <RadioButton.Group onValueChange={setDevice} value={device}>
          <RadioWrapper>
            <RadioButton value="pc" />
            <Text onPress={() => setDevice("pc")}>PC</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="laptop" />
            <Text onPress={() => setDevice("laptop")}>Laptop</Text>
          </RadioWrapper>
        </RadioButton.Group>
        <Spacer height={16} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("UsageScreen")}
          disabled={device === ""}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
}

type UsageScreenProps = StackScreenProps<StackParamList, "UsageScreen">;

function UsageScreen({ navigation }: UsageScreenProps) {
  const { usage, setUsage } = surveyStore(
    (state) => ({
      usage: state.usage,
      setUsage: state.setSurvey("usage"),
    }),
    shallow
  );

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu vou usar o PC para:</Title>
        <Spacer height={16} />
        <RadioButton.Group value={usage} onValueChange={setUsage}>
          <RadioWrapper>
            <RadioButton value="video-editor"></RadioButton>
            <Text onPress={() => setUsage("video-editor")}>
              Edição de video
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="software-development"></RadioButton>
            <Text onPress={() => setUsage("software-development")}>
              Desenvolvimento de software
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="office-tools"></RadioButton>
            <Text onPress={() => setUsage("office-tools")}>
              Ferramentas de escritório e pacote office
            </Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="internet"></RadioButton>
            <Text onPress={() => setUsage("internet")}>
              Navegar na internet e redes sociais
            </Text>
          </RadioWrapper>
        </RadioButton.Group>
        <Spacer height={16} />
        <Button
          mode="contained"
          disabled={usage === ""}
          onPress={() => navigation.navigate("LoadingScreen")}
        >
          Processar perfil
        </Button>
      </View>
    </View>
  );
}

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
      `https://afternoon-bayou-13013.herokuapp.com/test?${new URLSearchParams({
        q: query,
      })}`
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
        paddingLeft: 32,
        paddingRight: 32,
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Presentation" component={Presentation} />
            <Stack.Screen name="DeviceScreen" component={DeviceScreen} />
            <Stack.Screen name="UsageScreen" component={UsageScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="ResultScreen" component={ResultScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
