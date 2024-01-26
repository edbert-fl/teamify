import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
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
});

export default HomeScreen;
