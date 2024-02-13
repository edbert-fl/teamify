import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";
import axios from "axios";
import {
  SERVER_URL,
} from "../utils/Helpers";
import { ShiftData } from "../utils/Types";
import ShiftInfoCard from "../components/ShiftInfoCard";
import OrganizationCodeCard from "../components/OrganizationCodeCard";

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <OrganizationCodeCard organizationCode={currUser?.organizationCode} />
        <View style={styles.shiftsContainer}>
          <Text style={styles.upcomingShiftsLabel}>Upcoming Shifts</Text>
          {shifts.map((shift: ShiftData) => {
            return <ShiftInfoCard key={shift.shift_id} shift={shift} />;
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
    width: 55,
  },
  upcomingShiftsLabel: {
    color: theme.colors.primaryText,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
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
