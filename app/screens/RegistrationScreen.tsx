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
import { polyfill } from "react-native/Libraries/Utilities/PolyfillFunctions";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { SERVER_URL } from "../../backend/serverconfig";
import { useAppContext } from "../components/AppContext";

interface RegistrationScreenProps {
  createOrganization: boolean;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ createOrganization }) => {
  const { currOrganization, setCurrUser } = useAppContext();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const signUp = async () => {
    setLoading(true);

    console.log(currOrganization);

    try {
      const response = await axios.post(`${SERVER_URL}/user/register`,{
        displayName: displayName,
        email: email,
        password: password,
        currOrganization: currOrganization,
      })

      const apiResponseData = response.data.user;
      // Sets the user to be the currently logged in user.
      setCurrUser({
        id: apiResponseData.id,
        username: apiResponseData.username,
        email: apiResponseData.email,
        salt: apiResponseData.salt,
        organizationCode: apiResponseData.organizationCode,
        createdAt: new Date(apiResponseData.created_at),
      });

    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
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
          value={displayName}
          style={styles.input}
          placeholder="Display Name"
          placeholderTextColor={theme.colors.primary}
          autoCapitalize="none"
          onChangeText={(text) => setDisplayName(text)}
          enablesReturnKeyAutomatically
        />
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
          enablesReturnKeyAutomatically={true}
        />

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View style={{ marginTop: 50 }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>Create Account</Text>
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

export default RegistrationScreen;
