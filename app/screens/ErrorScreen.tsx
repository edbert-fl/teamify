import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList } from "../utils/Types";

interface ErrorScreenProps {
  errorMessage: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ errorMessage }) => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  return (
    <View style={styles.container}>
      <AppHeader
        title="Error"
        onBackIcon={
          <Icon
            name="arrow-back-ios"
            size={20}
            color={theme.colors.primaryText}
          />
        }
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageTitle}>
        Oops! Something went wrong...
      </Text>
      <Text style={styles.errorMessage}>
        {errorMessage}
      </Text>
      </View>
      <SafeAreaView style={styles.safeAreaView}></SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  errorMessageTitle: {
    color: theme.colors.primaryText,
    fontSize: 32,
    textAlign: "center",
    paddingBottom: 20
  },
  errorMessage: {
    color: theme.colors.secondaryText,
    fontSize: 28,
    fontWeight: "300",
    textAlign: "center"
  },
  errorMessageContainer: {
    paddingTop: "20%",
    paddingHorizontal: "10%",
  }
});

export default ErrorScreen;
