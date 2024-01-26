import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../utils/Styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { useAppContext } from "../components/AppContext";

import { SERVER_URL } from "../utils/ServerAddress"

const OrgCreationScreen = () => {
  const { currOrganization, setCurrOrganization } = useAppContext();

  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const signUp = async () => {
    setLoading(true);
    try {
      // Generate a random alphanumeric code of 6 digits
      const generatedCode = Math.random()
        .toString(36)
        .substr(2, 6)
        .toUpperCase();

      console.log("TODO: Check if Organization has already been created");

      if (organizationName && generatedCode) {
        // Save organization information to be added to database after owner account is created.
        setCurrOrganization({
          code: generatedCode,
          name: organizationName,
        });

        const response = await axios.post(`${SERVER_URL}/organization/add`, {
          code: generatedCode,
          name: organizationName,
        });

        console.log("Response:", response.data);

        navigation.navigate('Registration', { userCreatedOrganization: true });
      } else {
        throw new Error("Organization name or code is undefined.");
      }
    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Enter Your Organization Information</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TextInput
          value={organizationName}
          style={styles.input}
          placeholder="Organization Name"
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="none"
          onChangeText={(text) => setOrganizationName(text)}
          enablesReturnKeyAutomatically
        />

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Continue Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={handleLogin}
            >
              <Text style={styles.text}>Already Have an account?</Text>
              <Text style={styles.link}>Login instead</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  linkContainer: {
    marginTop: 50,
    height: "auto",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  pageTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.primary,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  guestLoginButton: {
    backgroundColor: theme.colors.success,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrgCreationScreen;
