import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@store";
import {
  PresentationScreen,
  DeviceScreen,
  UsageScreen,
  LoadingScreen,
  ResultScreen,
} from "@screens";

const Stack = createStackNavigator();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Presentation" component={PresentationScreen} />
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
