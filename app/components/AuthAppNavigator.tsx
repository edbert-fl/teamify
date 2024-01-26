import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClockInScreen from "../screens/ClockInScreen";
import HomeScreen from "../screens/HomeScreen";

const Root = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ClockIn"
        component={ClockInScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Root;
