import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@store";
import {
  PresentationScreen,
  DeviceScreen,
  LoadingScreen,
  ResultScreen,
} from "@screens";
import { LogoHeader } from "@component";
import { LogBox, Text } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Ionicons } from "@expo/vector-icons";
import { DebugModal } from "./screens/debug-modal";

const Stack = createStackNavigator();

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#be001a",
    primaryLight: "#f84c43",
    primaryDark: "#860000",
    accent: "#32373b",
    accentLight: "#5b6165",
    accentDark: "#0b1115",
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootSiblingParent>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: theme.colors.primary,
                headerTitle: () => <LogoHeader color={theme.colors.primary} />,
              }}
            >
              <Stack.Screen
                name="Presentation"
                component={PresentationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="DeviceScreen" component={DeviceScreen} />
              <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ResultScreen"
                component={ResultScreen}
                options={({ route, navigation }) => ({
                  headerTintColor: theme.colors.primary,
                  headerTitleAlign: "center",
                  headerTitle: () => (
                    <LogoHeader color={theme.colors.primary} />
                  ),
                  headerRight: () => (
                    <Button
                      onTouchEndCapture={() => {
                        navigation.push("DebugModal", {
                          searchStrings: route.params.data.searchStrings,
                        });
                      }}
                    >
                      Debug
                    </Button>
                  ),
                })}
              />
              <Stack.Screen
                options={{ presentation: "modal" }}
                name="DebugModal"
                component={DebugModal}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </RootSiblingParent>
    </QueryClientProvider>
  );
}

export { App };
