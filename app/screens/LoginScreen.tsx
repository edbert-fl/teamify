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

const LoginScreen = () => {
  const { setCurrUser, setCurrOrganization } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignUp = () => {
    navigation.navigate("OrgSelection");
  };

  const signIn = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/user/login`,{
        email: email,
        password: password,
      })

      const userData = response.data.user;
      // Sets the user to be the currently logged in user.
      setCurrUser({
        user_id: userData.id,
        username: userData.username,
        email: userData.email,
        salt: userData.salt,
        organizationCode: userData.organizationCode,
        createdAt: new Date(userData.created_at),
      });

      // Sets the organization to be the user's organization.
      const organizationData = response.data.organization;
      setCurrOrganization({
        organizationName: organizationData.organization_name,
        organizationCode: organizationData.organization_code,
        createdAt: organizationData.created_at
      })

    } catch (error) {
      alert(`Error signing in: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Teamify</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          enablesReturnKeyAutomatically
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          enablesReturnKeyAutomatically
        />

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={handleSignUp}
            >
              <Text style={styles.text}>Don't have an account?</Text>
              <Text style={styles.link}>Sign up instead</Text>
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
  logo: {
    fontSize: 48,
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

export default LoginScreen;
