import { Card } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/Styles";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const NoUpcomingShifts = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.textContainer}>
        <Icon name="event-busy" size={55} color={theme.colors.primary} />
        <Text style={styles.text}>You have no upcoming shifts</Text>
      </View>
    </Card>
  );
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    text: theme.colors.surface,
    borderWidth: 0,
    borderRadius: 10,
    fontWeight: "500",
    marginHorizontal: 0,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150
  },
  text: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NoUpcomingShifts;
