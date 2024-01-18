import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/RegistrationScreen";
import OrgRegistrationScreen from "../screens/OrgRegistrationScreen";

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
            name="OrgSignUp"
            component={OrgRegistrationScreen}
            options={{ headerShown: false }}
          />
        </>
    </Stack.Navigator>
  );
};

export default AppNavigator;