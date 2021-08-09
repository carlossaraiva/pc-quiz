import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@store";
import {
  PresentationScreen,
  DeviceScreen,
  UsageScreen,
  LoadingScreen,
  ResultScreen,
} from "@screens";
import { View } from "react-native";
import { Logo, LogoHeader, LogoSmall } from "@component";
import StickyParallaxHeader from "react-native-sticky-parallax-header";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#F90040",
    accent: "#605770",
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "#ffffff",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitle: () => <LogoHeader />,
            }}
          >
            <Stack.Screen
              name="Presentation"
              component={PresentationScreen}
              options={{ headerShown: false }}
            />
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

export { App };
