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
    minute: "2-digit",
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
        paddingVertical: 20,
      },
      clockText: {
        fontSize: 36,
        color: theme.colors.buttonText,
      },
  });

export default Clock;
