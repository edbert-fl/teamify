import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/RegistrationScreen";
import OrgRegistrationScreen from "../screens/OrgRegistrationScreen";
import OrgCreationScreen from "../screens/OrgCreationScreen";
import OrgSelectionScreen from "../screens/OrgSelectionScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrgRegistration"
            component={OrgRegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrgSelection"
            component={OrgSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrgCreation"
            component={OrgCreationScreen}
            options={{ headerShown: false }}
          />
        </>
    </Stack.Navigator>
  );
};

export default AppNavigator;