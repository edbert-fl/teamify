import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Card, Tab, TabView } from "@rneui/themed";
import { theme } from "../utils/Styles";
import ChartByWeek from "./ChartByWeek";
import ChartByMonth from "./ChartByMonth";
import ChartByYear from "./ChartByYear";

const WorkStatusCard = () => {
  const [index, setIndex] = useState(0);
  const payrollInfo = {
    totalToday: 302.24,
    totalThisWeek: 520.75,
    totalThisMonth: 2040.83,
    daysThisWeek: [150, 200.5, 180.75, 175.2, 187, 0, 0],
    WeeksThisMonth: [500, 524.25, 563.5, 520.75],
    MonthsThisYear: [
      1850, 1900.25, 2050.5, 1800.75, 2200, 2150.25, 1950.5, 2000.75, 1900,
      2100.25, 2200.5, 2500.75
    ],
  };

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cardTitle}>Payroll Info</Card.Title>
      {payrollInfo != null ? (
        <View>
          <Text style={[styles.labelCell, styles.dataHeader]}>
            Total today{" "}
            <Text style={styles.success}>${payrollInfo.totalToday}</Text>
          </Text>
          <Text style={[styles.labelCell, styles.dataHeader]}>
            Total this week{" "}
            <Text style={styles.success}>${payrollInfo.totalThisWeek}</Text>
          </Text>
          <Text style={[styles.labelCell, styles.dataHeader]}>
            Total this month{" "}
            <Text style={styles.success}>${payrollInfo.totalThisMonth}</Text>
          </Text>
          <View style={styles.tabContainer}>
            <Tab
              value={index}
              onChange={(i) => setIndex(i)}
              variant="primary"
              style={styles.tabBackground}
              containerStyle={styles.tab}
              indicatorStyle={{
                backgroundColor: theme.colors.primary,
                height: 3,
              }}
            >
              <Tab.Item title="Week" titleStyle={styles.tabLabel} />
              <Tab.Item title="Month" titleStyle={styles.tabLabel} />
              <Tab.Item title="Year" titleStyle={styles.tabLabel} />
            </Tab>
          </View>

          {index === 0 ? (
            <View style={styles.tabView}>
              <Text style={styles.dataHeader}>Payroll this week</Text>
              <ChartByWeek data={payrollInfo} />
            </View>
          ) : index === 1 ? (
            <View style={styles.tabView}>
              <Text style={styles.dataHeader}>Payroll this month</Text>
              <ChartByMonth data={payrollInfo} />
            </View>
          ) : index === 2 ? (
            <View style={styles.tabView}>
              <Text style={styles.dataHeader}>Payroll this year</Text>
              <ChartByYear data={payrollInfo} />
            </View>
          ) : null}

        </View>
      ) : (
        <Text style={styles.warningText}>
          Could not retrieve payroll information :{"("}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
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
  cardTitle: {
    color: theme.colors.primaryText,
    fontWeight: "700",
    textAlign: "left",
    fontSize: 26,
  },
  table: {
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  labelCell: {
    flex: 3,
    textAlign: "left",
    marginBottom: 3
  },
  cell: {
    flex: 2,
    textAlign: "right",
  },
  dataHeader: {
    fontSize: 16,
    color: theme.colors.primaryText,
  },
  data: {
    fontSize: 16,
    color: theme.colors.secondaryText,
  },
  tab: {
    backgroundColor: "transparent",
  },
  tabContainer: {
    paddingTop: 15,
  },
  tabBackground: {
    backgroundColor: "transparent",
  },
  tabLabel: {
    fontSize: 14,
  },
  tabView: { 
    marginTop: 20 
  },
  viewAllLink: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  viewAllLinkText: {
    fontSize: 16,
    textAlign: "right",
    color: theme.colors.primary,
  },
  viewAllLinkIcon: {
    marginLeft: 5,
  },
  success: {
    color: theme.colors.success,
  },
  warning: {
    color: theme.colors.warning,
  },
  warningText: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WorkStatusCard;
