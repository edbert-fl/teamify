import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppContext } from "./AppContext";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import ManageShiftsScreen from "../screens/ManageShiftsScreen";
import RepeatDaysScreen from "../screens/RepeatDaysScreen";
import { useRoute } from "@react-navigation/native";
import { AdminContext } from "./AdminContext";
import { User } from "../utils/Types";
import SelectEmployeesScreen from "../screens/SelectEmployeesScreen";
import ManageUsersScreen from "../screens/ManageUsersScreen";
import EditUserScreen from "../screens/EditUserScreen";
import SelectRoleScreen from "../screens/SelectRoleScreen";

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
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  const SelectRoleScreenFC = () => {
    return <SelectRoleScreen route={useRoute()}/>
  }

  return (
    <AdminContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedDays,
        setSelectedDays,
        selectedUsers,
        setSelectedUsers,
        userToEdit,
        setUserToEdit
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
          name="ManageUsers"
          component={ManageUsersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RepeatDays"
          component={RepeatDaysScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectEmployees"
          component={SelectEmployeesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectRole"
          component={SelectRoleScreenFC}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUserScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </AdminContext.Provider>
  );
};

export default AppNavigator;
