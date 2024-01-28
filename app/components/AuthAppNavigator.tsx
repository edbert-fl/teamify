import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClockInScreen from "../screens/ClockInScreen";
import HomeScreen from "../screens/HomeScreen";
import { theme } from "../utils/Styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../utils/Types";

const Root = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootBottomTabParamList>>();
  const Tab = createBottomTabNavigator();

  const tabBarIcon = (focused, route) => {
    const iconMappings = {
      Home: {
        name: "home",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      ClockIn: {
        name: "access-time",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Calendar: {
        name: "calendar-today",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 28,
      },
      // Add more route name to icon mappings as needed
    };

    const { name, color: iconColor, size } = iconMappings[route.name] || {};

    return <Icon name={name} color={iconColor} size={size} />;
  };

  const tabBarLabel = (focused, route) => {
    const textColor = focused ? theme.colors.primary : theme.colors.placeholderText;

    return <Text style={{
      color: textColor,
      fontSize: 12,
      fontWeight: "500"
    }}>{route.name}</Text>
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => tabBarIcon(focused, route),
        tabBarStyle: {
          backgroundColor: theme.colors.tabBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 100,
          paddingTop: 5,
          borderTopWidth: 0
        },
        tabBarLabel: ({ focused }) => tabBarLabel(focused, route)
      })}
    >
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
      <Tab.Screen
        name="Calendar"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Root;
