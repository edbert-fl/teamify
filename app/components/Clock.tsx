import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/Styles";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time for clock
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <View style={styles.clockContainer}>
      <Text style={styles.clockText}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    clockContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
      },
      clockText: {
        fontSize: 42,
        fontWeight: "300",
        color: theme.colors.primaryText,
      },
  });

export default Clock;
