import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import React from "react";
import AppNavigator from "./app/components/AppNavigator";

export default function App() {
  const [signingOut, setSigningOut] = useState(false);


  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <NavigationContainer>
        <AppNavigator/>
    </NavigationContainer>
  );
}