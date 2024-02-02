import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "./AppContext";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import ManageShiftsScreen from "../screens/ManageShiftsScreen";
import RepeatDaysScreen from "../screens/RepeatDaysScreen";
import { useRoute } from "@react-navigation/native";
import { AdminContext } from "./AdminContext";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { currUser } = useAppContext();
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  return (
    <AdminContext.Provider
      value={{
        selectedDays,
        setSelectedDays,
      }}
    >
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
        <Stack.Screen
          name="RepeatDays"
          component={RepeatDaysScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AdminContext.Provider>
  );
};

export default AppNavigator;
