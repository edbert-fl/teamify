import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import React from "react";
import AppNavigator from "./app/components/AppNavigator";
import { AppContext } from "./app/components/AppContext";

export default function App() {
  const [currUser, setCurrUser] = useState(null);
  const [currOrganization, setCurrOrganization] = useState(null);

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          currUser: currUser,
          setCurrUser: setCurrUser,
          currOrganization: currOrganization,
          setCurrOrganization: setCurrOrganization,
        }}
      >
        <AppNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
