import React from "react";
import { StyleSheet, View } from "react-native";
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
  DataTable,
  Surface,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import create from "zustand";
import { configurePersist } from "zustand-persist";
import * as WebBrowser from "expo-web-browser";

type SurveyState = {
  device: string;
  usage: string;
  setSurvey: (question: string) => (answer: string) => void;
  clear: () => void;
};

const { persist, purge } = configurePersist({
  storage: AsyncStorage, // use `AsyncStorage` in react native
  rootKey: "root", // optional, default value is `root`
});

const surveyStore = create<SurveyState>(
  persist(
    {
      key: "survey", // required, child key of storage
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
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk015nf1QkgIp2_1TaZM-kcplr00bHQ:1615675330800&q=PC&tbas=0&tbs=vw:g,mr:1,cat:325,pdtr0:1020653%7C3.9000000953674316%24,price:1,ppr_min:6000&sa=X&ved=0ahUKEwiSlKjRq67vAhUOIrkGHRIoBHkQvSsIvQcoAw&biw=1920&bih=937",
    },
    "software-development": {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03huVIYMtgjCYFlVTt0v9YYfw2eaQ:1615675272485&q=PC&tbs=vw:g,mr:1,pdtr0:1020655%7C64.0%24160.0,pdtr1:728839%7C728842,pdtr2:1020654%7C16.0%2416.0,cat:325,pdtr3:950630%7C950631&sa=X&ved=0ahUKEwjF9cC1q67vAhXOJrkGHXF-D8oQsysIoQMoAA&biw=1920&bih=937",
    },
    "office-tools": {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
    internet: {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
  },
  laptop: {
    "video-editor": {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03gpAbfSpaQLakXJSL02CrJDvZ0YA:1615675425548&q=Notebook&tbs=vw:g,mr:1,pdtr0:1020720%7C64.0%2464.0,cat:328,pdtr1:1020484%7C4000.0%244000.0&sa=X&ved=0ahUKEwjSlL_-q67vAhXjH7kGHVH_BsEQvSsI9wgoBg&biw=1920&bih=937",
    },
    "software-development": {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01iIYzi0fbTYoHg20ztnucm29HZRA:1615675484079&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:976847%7C976848,price:1,ppr_min:6000,ppr_max:10000,pdtr1:703981%7C764396,pdtr2:1020484%7C1000.0%24,cat:328,pdtr3:1337889%7C4192014&sa=X&ved=0ahUKEwiVwbOarK7vAhVZHLkGHU61DyAQsysI5wgoAA&biw=1920&bih=937",
    },
    "office-tools": {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
    },
    internet: {
      url:
        "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
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
      <Title>Bem vindo!</Title>
      <Text>Lorem ipsum dolor sit am </Text>
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
  );
}

type DeviceScreenProps = StackScreenProps<StackParamList, "DeviceScreen">;

function DeviceScreen({ navigation }: DeviceScreenProps) {
  const { device, setDevice } = surveyStore((state) => ({
    device: state.device,
    setDevice: state.setSurvey("device"),
  }));

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu estou precisando de um:</Title>
        <Spacer height={16} />
        <RadioButton.Group onValueChange={setDevice} value={device}>
          <RadioWrapper>
            <RadioButton value="pc" />
            <Text>PC</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="laptop" />
            <Text>Laptop</Text>
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
  const { usage, setUsage } = surveyStore((state) => ({
    usage: state.usage,
    setUsage: state.setSurvey("usage"),
  }));

  return (
    <View style={styles.container}>
      <View>
        <Title style={{ marginLeft: 8 }}>Eu vou usar o PC para:</Title>
        <Spacer height={16} />
        <RadioButton.Group value={usage} onValueChange={setUsage}>
          <RadioWrapper>
            <RadioButton value="video-editor"></RadioButton>
            <Text>Edição de video</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="software-development"></RadioButton>
            <Text>Desenvolvimento de software</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="office-tools"></RadioButton>
            <Text>Ferramentas de escritório e pacote office</Text>
          </RadioWrapper>
          <RadioWrapper>
            <RadioButton value="internet"></RadioButton>
            <Text>Navegar na internet e redes sociais</Text>
          </RadioWrapper>
        </RadioButton.Group>
        <Spacer height={16} />
        <Button
          mode="contained"
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
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("ResultScreen");
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
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

function ResultScreen({ navigation }: ResultScreenProps) {
  const { device, usage } = surveyStore((state) => ({
    device: state.device,
    usage: state.usage,
  }));

  return (
    <View style={{ padding: 32, backgroundColor: "white", flex: 1 }}>
      <Title>Resultado</Title>
      <Paragraph>
        Você esta em busca de um {DEVICE_ANSWERS[device]} a ser usado{" "}
        {USAGE_ANSWERS[usage]}.
      </Paragraph>
      <Paragraph>
        Abaixo temos o resultado da configuração recomendada e links para
        ajuda-los a encontrar seu {DEVICE_ANSWERS[device]} pela internet.
      </Paragraph>
      <Paragraph>
        Obs: Os valores abaixo estão atualmente mockados. Os links são
        dinâmicos, mas não refletem uma recomendação real.
      </Paragraph>
      <Spacer height={32} />
      <Card elevation={4}>
        <Card.Title title="Especificações" />
        <Card.Content>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Memoria</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>HD</DataTable.Cell>
              <DataTable.Cell numeric>237</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Processador</DataTable.Cell>
              <DataTable.Cell numeric>Intel</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Vel. do Processador</DataTable.Cell>
              <DataTable.Cell numeric>3.3 GHz</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
        <Card.Actions>
          <View style={{ flexDirection: "column" }}>
            <Button
              onPress={async () => {
                let result = await WebBrowser.openBrowserAsync(
                  RESPONSES[device][usage].url
                );
                console.log(result);
              }}
            >
              Buscar no Google
            </Button>
            <Button>Buscar na Amazon</Button>
          </View>
        </Card.Actions>
      </Card>
      <Spacer height={32} />
      <Button onPress={() => navigation.popToTop()}>Recomeçar</Button>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
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
