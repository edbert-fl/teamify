import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/Styles";

const WorkStatusCard = () => {
  const users = [
    {
      name: "Brynn",
      avatar: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg",
      timeClockedIn: new Date("2024-01-15T09:00:00"),
      timeClockedOut: new Date("2024-01-15T17:00:00"),
    },
    {
      name: "Jessie",
      avatar: "https://uifaces.co/our-content/donated/bUkmHPKs.jpg",
      timeClockedIn: new Date("2024-01-15T08:30:00"),
      timeClockedOut: null,
    },
    {
      name: "Victoria",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      timeClockedIn: new Date("2024-01-15T09:15:00"),
      timeClockedOut: new Date("2024-01-15T17:30:00"),
    },
  ];

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cardTitle}>Clocked in today</Card.Title>
      {users.length === 0 ? (
        <Text style={styles.warningText}>Nobody has clocked in yet...</Text>
      ) : (
        users.map((u, i) => {
          return (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.dataHeader, styles.labelCell]}>
                {u.name}
              </Text>
              <Text style={[styles.data, styles.cell]}>Clocked in</Text>
              <Text style={[styles.data, styles.cell, styles.success]}>
                {u.timeClockedIn
                  ? u.timeClockedIn.getHours().toString().padStart(2, "0") +
                    ":" +
                    u.timeClockedIn.getMinutes().toString().padStart(2, "0") +
                    " " +
                    (u.timeClockedIn.getHours() > 11 ? "PM" : "AM")
                  : "Error"}
              </Text>
            </View>
          );
        })
      )}

      {/* View all staff that have clocked in today */}
      <TouchableOpacity style={styles.viewAllLink}>
        <Text style={styles.viewAllLinkText}>View all</Text>
        <Icon
          name="arrow-right-alt"
          style={styles.viewAllLinkIcon}
          size={18}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
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
        marginBottom: 10
      },
})

export default WorkStatusCard;
