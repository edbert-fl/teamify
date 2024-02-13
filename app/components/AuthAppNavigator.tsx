import React, { useContext } from "react";

import {Alert, Text } from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../utils/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import ClockInScreen from "../screens/ClockInScreen";
import HomeScreen from "../screens/HomeScreen";
import AdminNavigator from "./AdminNavigator";
import { RouteProp, ParamListBase,  } from "@react-navigation/native";
import { IconMap } from "../utils/Types";
import { useAppContext } from "./AppContext";

const AuthAppNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { currUser } = useAppContext();

  const tabBarIcon = (focused: boolean, route: RouteProp<ParamListBase, string>) => {
    const iconMappings: IconMap= {
      Home: {
        name: "home",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Calendar: {
        name: "calendar-today",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 28,
      },
      ClockIn: {
        name: "access-time",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 32,
      },
      Admin: {
        name: "work",
        color: focused ? theme.colors.primary : theme.colors.placeholderText,
        size: 28,
      },
    };

    const { name, color: iconColor, size } = iconMappings[route.name] || {};

    return <Icon name={name} color={iconColor} size={size} />;
  };

  const tabBarLabel = (focused: boolean, route: RouteProp<ParamListBase, string>) => {
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
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calendar"
        component={HomeScreen}
        options={{ headerShown: false }}
        listeners={{
          tabPress: e => {
            Alert.alert("Error!", "This feature has not yet been implemented!")
          },
        }}
      /> 
      <Tab.Screen
        name="ClockIn"
        component={ClockInScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AuthAppNavigator;
