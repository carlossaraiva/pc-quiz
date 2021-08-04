import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import create from "zustand";
import shallow from "zustand/shallow";
import { configurePersist } from "zustand-persist";
import "react-native-url-polyfill/auto";
import { PresentationScreen } from "./src/screens/presentation-screen";
import { DeviceScreen } from "./src/screens/device-screen";
import { UsageScreen } from "./src/screens/usage-screen";
import { LoadingScreen } from "./src/screens/loading-screen";
import { ResultScreen } from "./src/screens/result-screen";
import { queryClient } from "./src/store";

export type StackParamList = {
  Presentation: undefined;
  DeviceScreen: undefined;
  UsageScreen: undefined;
  LoadingScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator();

export default function App() {
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
