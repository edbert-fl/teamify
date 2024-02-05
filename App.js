import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

import React from "react";
import AppNavigator from "./app/components/AppNavigator";
import { AppContext } from "./app/components/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [currUser, setCurrUser] = useState(null);
  const [currOrganization, setCurrOrganization] = useState(null);

  // Everytime app is loaded attempt to retrieve the userSession.
  useEffect(() => {
    if (currUser === null || currOrganization === null) {
      retrieveUserSession();
    }
  }, []);

  useEffect(() => {
    storeUserSession();
  }, [currUser]);

  useEffect(() => {
    storeOrganizationSession();
  }, [currOrganization]);

  async function storeUserSession() {
    try {
      await AsyncStorage.setItem(
        "sessionUserInformation",
        JSON.stringify(currUser)
      );
    } catch (error) {
      console.log("Error storing user information: ", error);
    }
  }

  async function storeOrganizationSession() {
    try {
      await AsyncStorage.setItem(
        "sessionOrganizationInformation",
        JSON.stringify(currOrganization)
      );
    } catch (error) {
      console.log("Error storing user information: ", error);
    }
  }

  async function retrieveUserSession() {
    try {
      console.log(
        "Retrieving user session information..."
      )
      const userJSON = await AsyncStorage.getItem(
        "sessionUserInformation"
      );
      const organizationJSON = await AsyncStorage.getItem(
        "sessionOrganizationInformation"
      );

      if (userJSON !== null) {
        const sessionUserInformation = JSON.parse(userJSON);
        console.log("Session User Info:", sessionUserInformation);
        setCurrUser(sessionUserInformation);
      }

      if (organizationJSON !== null) {
        const sessionOrganizationInformation = JSON.parse(organizationJSON);
        console.log("Session Org Info: ", sessionOrganizationInformation);
        setCurrOrganization(sessionOrganizationInformation);
      }
    } catch (error) {
      console.log("Error retrieving user information: ", error);
    }
  }

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
