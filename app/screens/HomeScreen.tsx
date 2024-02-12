import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";
import { Card } from "@rneui/themed";
import axios from "axios";
import {
  SERVER_URL,
  convertTimeStringToDate,
  formatDate,
  formatTimeString,
  getDayFromDate,
} from "../utils/Helpers";
import { ShiftData } from "../utils/Types";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const { currUser, setCurrUser } = useAppContext();
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  useEffect(() => {
    getShifts();
  }, []);

  const getShifts = async () => {
    const response = await axios.post(`${SERVER_URL}/shifts/get`, {
      currUser: currUser,
    });

    if (response.data.shifts.length >= 3) {
      setShifts(response.data.shifts.slice(0, 3));
    } else {
      setShifts(response.data.shifts);
    }
  };

  const getNumberOfHours = (shiftStart: Date, shiftEnd: Date): number => {
    // Get the difference in milliseconds between the end and start dates
    const differenceInMilliseconds = shiftEnd.getTime() - shiftStart.getTime();

    // Convert milliseconds to hours
    const hours = differenceInMilliseconds / (1000 * 60 * 60);

    return hours;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.card}>
          <Text style={styles.organizationCodeLabel}>
            Your Organization Code
          </Text>
          <Text style={styles.organizationCode}>
            {currUser?.organizationCode}
          </Text>
          <TouchableOpacity style={styles.copyContainer}>
            <Icon
              name="content-copy"
              size={18}
              color={theme.colors.primaryText}
            />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.shiftsContainer}>
          {shifts.map((shift: ShiftData) => {
            return (
              <>
                {shift.shift_date ? (
                  <Card containerStyle={styles.shiftCard}>
                    <Text style={styles.shiftCardText}>
                      {formatDate(shift.shift_date.toString())}
                    </Text>
                    <Text style={styles.dayText}>
                      {getDayFromDate(shift.shift_date.toString())}
                    </Text>
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
                                convertTimeStringToDate(
                                  shift.start_time.toString()
                                ),
                                convertTimeStringToDate(
                                  shift.end_time.toString()
                                )
                              ) *
                                currUser.rate}
                          </Text>
                        </Text>
                      )}
                    </View>
                  </Card>
                ) : null}
              </>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.accent,
    borderWidth: 0,
    borderRadius: 10,
    fontWeight: "500",
    marginHorizontal: 0,
    marginBottom: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  copyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 55
  },
  copyText: {
    color: theme.colors.primaryText,
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shiftsContainer: {
    borderRadius: 10,
    marginBottom: 30,
  },
  shiftCard: {
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
  organizationCodeLabel: {
    fontSize: 18,
    color: theme.colors.primaryText,
  },
  organizationCode: {
    fontSize: 66,
    fontWeight: "bold",
    color: theme.colors.primaryText,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
