import { Card } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../utils/Styles";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShiftCardPlaceholder = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <Card containerStyle={styles.card}>
      <ShimmerPlaceholder style={styles.datePlaceholder} />
      <ShimmerPlaceholder style={styles.dayPlaceholder} />
      <Card.Divider
        width={1}
        style={{
          marginTop: 5,
        }}
        color={theme.colors.faded}
      />
      <View style={styles.timeContainer}>
        <ShimmerPlaceholder style={styles.timePlaceholder} />
        <ShimmerPlaceholder style={styles.hoursPlaceholder} />
      </View>

      <ShimmerPlaceholder style={styles.wagePlaceholder} />
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
  datePlaceholder: {
    width: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  dayPlaceholder: {
    width: 100,
    height: 30,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timePlaceholder: {
    width: 170,
    marginBottom: 10,
  },
  hoursPlaceholder: {
    width: 40,
    marginBottom: 10,
  },
  wagePlaceholder: {
    width: 90,
    height: 24,
    marginTop: 10,
  }
});

export default ShiftCardPlaceholder;
