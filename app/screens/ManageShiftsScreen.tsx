import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList } from "../utils/Types";

const ManageShiftsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  return (
    <View style={styles.container}>
      <AppHeader
        title="Manage Shifts"
        onBackIcon={
          <Icon
            name="arrow-back-ios"
            size={20}
            color={theme.colors.primaryText}
          />
        }
        onBackPress={() => navigation.goBack()}
      />
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
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
});

export default ManageShiftsScreen;
