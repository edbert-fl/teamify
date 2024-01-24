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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import axios from "axios";
import { useAppContext } from "../components/AppContext";

import { SERVER_URL } from "../utils/ServerAddress"

const OrgRegistrationScreen = () => {

  const { currOrganization, setCurrOrganization } = useAppContext();

  const [organizationCode, setOrganizationCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    setCurrOrganization(null);
    navigation.navigate("Login");
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/organization/login`, {
        organizationCode: organizationCode,
      });

      const apiResponse = response.data.organization;

      setCurrOrganization({
        code: apiResponse.organization_code,
        name: apiResponse.organization_name,
        createdAt: new Date(apiResponse.created_at),
      });
      
      navigation.navigate("Registration", { createOrganization: false })

    } catch (error: any) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Enter your organization code</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TextInput
          value={organizationCode}
          style={styles.input}
          placeholder="Organisation Code"
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="none"
          onChangeText={(text) => setOrganizationCode(text)}
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

export default OrgRegistrationScreen;
