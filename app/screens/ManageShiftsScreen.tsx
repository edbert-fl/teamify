import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
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
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAdminContext } from "../components/AdminContext";
import SelectEmployeesScreen from "./SelectEmployeesScreen";

interface ManageShiftsScreenProps {}

// Define the form input type
interface ShiftsFormInput {
  dates: string;
  days: string;
  startTime: string;
  endTime: string;
  repeating: boolean;
  assignedTo: string;
}

const ManageShiftsScreen: React.FC<ManageShiftsScreenProps> = () => {
  const { selectedDays, selectedUsers } = useAdminContext();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedShiftStart, setSelectedShiftStart] = useState<Date>(
    new Date()
  );
  const [isRepeatingShift, setIsRepeatingShift] = useState(false);
  const [selectedShiftEnd, setSelectedShiftEnd] = useState<Date>(new Date());

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<ShiftsFormInput>();
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleStartTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedShiftStart(date);
    }
  };

  const handleEndTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedShiftEnd(date);
    }
  };

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

  const onSubmit = (data: ShiftsFormInput) => {
    console.log(selectedDate);
    console.log(selectedShiftStart);
    console.log(selectedShiftEnd);
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
              <View style={styles.dateTimePickerContainer}>
                <RNDateTimePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  mode="date"
                  minimumDate={new Date()}
                  display="default"
                  themeVariant="dark"
                  style={styles.dateTimePicker}
                />
              </View>
            </View>
          )}

          {/* Shift Start*/}
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Shift Start</Text>
            <View style={styles.dateTimePickerContainer}>
              <RNDateTimePicker
                value={selectedShiftStart}
                onChange={handleStartTimeChange}
                mode="time"
                display="default"
                themeVariant="dark"
                style={styles.dateTimePicker}
              />
            </View>
          </View>

          {/* Shift End*/}
          <View style={styles.formInputContainer}>
            <Text style={styles.formLabel}>Shift End</Text>
            <View style={styles.dateTimePickerContainer}>
              <RNDateTimePicker
                value={selectedShiftEnd}
                onChange={handleEndTimeChange}
                mode="time"
                display="default"
                themeVariant="dark"
                style={styles.dateTimePicker}
              />
            </View>
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
            onPress={handleSubmit(onSubmit)}
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
