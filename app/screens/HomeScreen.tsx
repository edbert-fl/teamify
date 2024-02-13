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
  upcomingShiftsLabel: {
    color: theme.colors.primaryText,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  shiftsContainer: {
    borderRadius: 10,
    marginBottom: 30,
  },
});

export default HomeScreen;
