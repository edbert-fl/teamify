import { Card } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../utils/Styles";
import { ShiftData } from "../utils/Types";
import { formatDate, getDayFromDate, formatTimeString, convertTimeStringToDate } from "../utils/Helpers";
import { useAppContext } from "./AppContext";

interface ShiftInfoCardProps {
    shift: ShiftData
}
const ShiftInfoCard: React.FC<ShiftInfoCardProps> = ({ shift }) => {
    const { currUser } = useAppContext();
    
    const getNumberOfHours = (shiftStart: Date, shiftEnd: Date): number => {
        // Get the difference in milliseconds between the end and start dates
        const differenceInMilliseconds = shiftEnd.getTime() - shiftStart.getTime();
    
        // Convert milliseconds to hours
        const hours = differenceInMilliseconds / (1000 * 60 * 60);
    
        return hours;
      };
  
    return (
    <View key={shift.shift_id}>
      {shift.shift_date ? (
        <Card containerStyle={styles.card}>
          <Text style={styles.shiftCardText}>
            {formatDate(shift.shift_date.toString())}
          </Text>
          <Text style={styles.dayText}>
            {getDayFromDate(shift.shift_date.toString())}
          </Text>
          <Card.Divider
            width={1}
            style={{
              marginTop: 5,
            }}
            color={theme.colors.faded}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.shiftCardText}>
              {formatTimeString(shift.start_time.toString()) +
                " - " +
                formatTimeString(shift.end_time.toString())}
            </Text>
            <Text style={styles.shiftCardText}>
              {getNumberOfHours(
                convertTimeStringToDate(shift.start_time.toString()),
                convertTimeStringToDate(shift.end_time.toString())
              ) + " hrs"}
            </Text>
          </View>

          <View style={styles.wageContainer}>
            {currUser && (
              <Text style={styles.shiftCardText}>
                Est.{" "}
                <Text style={styles.wageText}>
                  {"$" +
                    getNumberOfHours(
                      convertTimeStringToDate(shift.start_time.toString()),
                      convertTimeStringToDate(shift.end_time.toString())
                    ) *
                      currUser.rate}
                </Text>
              </Text>
            )}
          </View>
        </Card>
      ) : null}
    </View>
  );
}

export const styles = StyleSheet.create({
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    shiftsContainer: {
      borderRadius: 10,
      marginBottom: 30,
    },
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
    dayText: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.colors.primaryText,
      marginBottom: 5,
    },
    wageContainer: {
      paddingTop: 16,
    },
    wageText: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    shiftCardText: {
      fontSize: 18,
      color: theme.colors.primaryText,
    },
});

export default ShiftInfoCard;
