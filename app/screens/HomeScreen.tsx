import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";

const HomeScreen = () => {
  const { setCurrUser } = useAppContext();
  
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrUser(null)}
        >
          <Text style={styles.buttonText}>Temporary Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
