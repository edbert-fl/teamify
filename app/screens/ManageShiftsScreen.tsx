import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { theme } from "../utils/Styles";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AdminStackParamList,
  SelectedDaysOfTheWeek,
  User,
} from "../utils/Types";
import { useAdminContext } from "../components/AdminContext";
import axios from "axios";
import { SERVER_URL } from "../utils/Helpers";
import { useAppContext } from "../components/AppContext";
import DateTimePicker from "../components/DateTimePicker";
import TimePicker from "../components/TimePicker";

interface ManageShiftsScreenProps {}

// Define the form input type
interface Shift {
  selectedDate?: Date;
  selectedDays?: SelectedDaysOfTheWeek;
  startTime: Date;
  endTime: Date;
  repeating: boolean;
  selectedUsers: User[];
}

const ManageShiftsScreen: React.FC<ManageShiftsScreenProps> = () => {
  const { selectedDays, selectedUsers, selectedDate } = useAdminContext();
  const { currOrganization, currUser } = useAppContext();
  const [selectedShiftStart, setSelectedShiftStart] = useState<Date>(
    new Date()
  );
  const [isRepeatingShift, setIsRepeatingShift] = useState(false);
  const [selectedShiftEnd, setSelectedShiftEnd] = useState<Date>(new Date());

  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const generateDaysDescription = (selectedDays: SelectedDaysOfTheWeek) => {
    let selectedDaysArray: string[] = [];

    if (selectedDays.monday) selectedDaysArray.push("Mon");
    if (selectedDays.tuesday) selectedDaysArray.push("Tue");
    if (selectedDays.wednesday) selectedDaysArray.push("Wed");
    if (selectedDays.thursday) selectedDaysArray.push("Thu");
    if (selectedDays.friday) selectedDaysArray.push("Fri");
    if (selectedDays.saturday) selectedDaysArray.push("Sat");
    if (selectedDays.sunday) selectedDaysArray.push("Sun");

    if (selectedDaysArray.length === 7) {
      return "Everyday";
    } else if (
      selectedDaysArray.length === 5 &&
      !selectedDaysArray.includes("Sat") &&
      !selectedDaysArray.includes("Sun")
    ) {
      return "Every Weekday";
    } else if (
      selectedDaysArray.length === 2 &&
      selectedDays.saturday &&
      selectedDays.sunday
    ) {
      return "Every Weekend";
    } else if (selectedDaysArray.length === 0) {
      return "Never";
    }

    let result: string = selectedDaysArray.join(", ");
    return result;
  };

  const generateUsersDescription = (selectedUsers: User[]) => {
    if (selectedUsers === null || selectedUsers.length === 0) {
      return `Nobody`;
    } else if (selectedUsers.length > 2) {
      return `${selectedUsers.length} Employees`;
    } else {
      let usernames: string[] = [];

      selectedUsers.map((user) => {
        usernames.push(user.username);
      });

      return `${usernames.join(" and ")}`;
    }
  };

  const handleSubmit = async () => {
    if (
      isRepeatingShift &&
      Object.values(selectedDays).every((day) => day === false)
    ) {
      Alert.alert(
        "Incomplete Shift Configuration",
        "Please make sure to specify at least one day for the shift.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }

    let newShift: Shift;
    if (isRepeatingShift) {
      newShift = {
        selectedDate: undefined,
        selectedDays: selectedDays,
        startTime: selectedShiftStart,
        endTime: selectedShiftEnd,
        repeating: isRepeatingShift,
        selectedUsers: selectedUsers,
      };
    } else {
      newShift = {
        selectedDate: selectedDate,
        selectedDays: undefined,
        startTime: selectedShiftStart,
        endTime: selectedShiftEnd,
        repeating: isRepeatingShift,
        selectedUsers: selectedUsers,
      };
    }

    const response = await axios.post(`${SERVER_URL}/shift/add`, {
      newShift: newShift,
      currOrganization: currOrganization,
      currUser: currUser,
    });
    console.log(newShift);
  };

  const navigateToDaysPicker = () => {
    navigation.navigate("RepeatDays");
  };

  const navigateToSelectEmployees = () => {
    navigation.navigate("SelectEmployees");
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Manage Shifts"
        onBackIcon={
          <Icon
            name="arrow-back-ios"
            size={20}
            color={theme.colors.primaryText}
          />
        }
        onBackPress={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.formContainer}>
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Repeating Shift</Text>
            <Switch
              trackColor={{
                false: theme.colors.surface,
                true: theme.colors.primary,
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsRepeatingShift}
              value={isRepeatingShift}
            />
          </View>

          {/* Dates */}
          {isRepeatingShift ? (
            <View style={styles.formInputContainer}>
              <Text style={styles.formLabel}>Repeats</Text>
              <TouchableOpacity
                style={styles.editDaysButton}
                onPress={navigateToDaysPicker}
              >
                <Text style={styles.editDaysText}>
                  {generateDaysDescription(selectedDays)}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formInputContainer}>
              <Text style={styles.formLabel}>Shift Date</Text>
              <DateTimePicker />
            </View>
          )}

          {/* Shift Start*/}
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Shift Start</Text>
            <TimePicker
              time={selectedShiftStart}
              setTime={setSelectedShiftStart}
            />
          </View>

          {/* Shift End*/}
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Shift End</Text>
            <TimePicker time={selectedShiftEnd} setTime={setSelectedShiftEnd} />
          </View>

          {/* Assign shift to */}
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Assigned To</Text>
            <TouchableOpacity
              style={styles.editDaysButton}
              onPress={navigateToSelectEmployees}
            >
              <Text style={styles.editDaysText}>
                {generateUsersDescription(selectedUsers)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  formInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    height: 40,
  },
  dateTimePickerContainer: {
    width: 150,
    flexDirection: "row",
  },
  dateTimePickerContainerAndroid: {
    flexDirection: "row",
  },
  dateTimePicker: {
    flex: 1,
  },
  formLabel: {
    color: theme.colors.primaryText,
    fontSize: 18,
  },
  editDaysButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  editDaysText: {
    fontSize: 16,
    color: theme.colors.primaryText,
  },
});

export default ManageShiftsScreen;
