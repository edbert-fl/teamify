import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "./AppContext";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import ManageShiftsScreen from "../screens/ManageShiftsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { currUser } = useAppContext();

  return (
    <Stack.Navigator initialRouteName="AdminPanel">
        <Stack.Screen
          name="AdminPanel"
          component={AdminDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageShifts"
          component={ManageShiftsScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};

export default AppNavigator;
