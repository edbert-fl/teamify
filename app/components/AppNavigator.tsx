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
import { useNavigation, useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { currUser } = useAppContext();

  const RegistrationScreenFC = () => <RegistrationScreen route={useRoute()} navigation={useNavigation()}/>

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
            name="Registration"
            component={RegistrationScreenFC}
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
