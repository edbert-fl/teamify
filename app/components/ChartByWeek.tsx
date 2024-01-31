import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { PayrollInfo } from "../utils/Types";
import { theme } from "../utils/Styles";

interface ChartByWeekProps {
  data: PayrollInfo;
}

const ChartByWeek: React.FC<ChartByWeekProps> = (data) => {
  const daysOfTheWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const payrollInfo = data.data; // Not sure exactly why it needs to be done this way...
  return (
    <LineChart
      data={{
        labels: daysOfTheWeek,
        datasets: [
          {
            data: payrollInfo.daysThisWeek,
          },
        ],
      }}
      width={Dimensions.get("window").width * 0.75}
      height={250}
      yAxisLabel="$"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: theme.colors.surface,
        backgroundGradientFrom: theme.colors.surface,
        backgroundGradientTo: theme.colors.surface,
        color: (opacity = 1) => theme.colors.primary,
        labelColor: (opacity = 1) => theme.colors.primaryText,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: theme.colors.primary,
        },
      }}
      bezier
      style={styles.chart}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    marginTop: 25,
    borderRadius: 16,
  },
});

export default ChartByWeek;
