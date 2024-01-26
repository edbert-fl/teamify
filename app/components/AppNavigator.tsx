import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/RegistrationScreen";
import OrgRegistrationScreen from "../screens/OrgRegistrationScreen";
import OrgCreationScreen from "../screens/OrgCreationScreen";
import OrgSelectionScreen from "../screens/OrgSelectionScreen";
import { useAppContext } from "./AppContext";
import ClockInScreen from "../screens/ClockInScreen";
import AuthAppNavigator from "./AuthAppNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { currUser } = useAppContext();

  return (
    <Stack.Navigator initialRouteName="AuthApp">
      {currUser ? (
        <Stack.Screen
          name="AuthApp"
          component={AuthAppNavigator}
          options={{ headerShown: false }}
        />
      ) : (
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
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
