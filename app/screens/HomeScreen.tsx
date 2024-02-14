import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";
import axios from "axios";
import { SERVER_URL } from "../utils/Helpers";
import { ShiftData } from "../utils/Types";
import ShiftInfoCard from "../components/ShiftInfoCard";
import OrganizationCodeCard from "../components/OrganizationCodeCard";
import ShiftCardPlaceholder from "../components/ShiftCardPlaceholder";
import NoUpcomingShifts from "../components/NoUpcomingShifts";

const HomeScreen = () => {
  const { currUser, setCurrUser } = useAppContext();

  const [shifts, setShifts] = useState<ShiftData[] | null>(null);

  useEffect(() => {
    console.log(currUser);
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
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <OrganizationCodeCard organizationCode={currUser?.organizationCode} />
        <View style={styles.shiftsContainer}>
          <Text style={styles.upcomingShiftsLabel}>Upcoming Shifts</Text>
          {shifts ? (
            shifts.length !== 0 ? (
              shifts.map((shift: ShiftData) => {
                return <ShiftInfoCard key={shift.shift_id} shift={shift} />;
              })
            ) : (
              <NoUpcomingShifts />
            )
          ) : (
            <>
              <ShiftCardPlaceholder />
              <ShiftCardPlaceholder />
              <ShiftCardPlaceholder />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={() => setCurrUser(null)}>
            <Text style={styles.buttonText}>
            Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.accent,
    marginTop: 30,
    height: 50,
    borderRadius: 10
  },
  buttonText: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "bold"
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
