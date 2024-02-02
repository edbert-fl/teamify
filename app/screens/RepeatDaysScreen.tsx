import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { AdminStackParamList, SelectedDaysOfTheWeek } from "../utils/Types";
import { theme } from "../utils/Styles";
import AppHeader from "../components/AppHeader";
import { useAdminContext } from "../components/AdminContext";
import { Card } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const RepeatDaysScreen = () => {
  const { selectedDays, setSelectedDays } = useAdminContext();
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const toggleDay = (day: string) => {
    if (day in selectedDays) {
      setSelectedDays((prevDays: SelectedDaysOfTheWeek) => ({
        ...prevDays,
        [day]: !prevDays[day as keyof SelectedDaysOfTheWeek],
      }));
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Repeat Shift"
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
        <Card containerStyle={styles.card}>
          {Object.keys(selectedDays).map((day: string) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton]}
              onPress={() => toggleDay(day)}
            >
              <View style={styles.dayContainer}>
                <Text style={styles.text}>
                  Every {day.charAt(0).toUpperCase() + day.slice(1)}
                </Text>
                {selectedDays[day as keyof SelectedDaysOfTheWeek] ? (
                  <Icon name="check" size={26} color={theme.colors.primary} />
                ) : (
                  <Icon name="check" size={26} color="transparent" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginHorizontal: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.surface,
    text: theme.colors.surface,
    borderWidth: 0,
    borderRadius: 10,
    fontWeight: "500",
    marginHorizontal: 0,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    height: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
  selectedDay: {
    backgroundColor: theme.colors.primary,
  },
  notSelectedDay: {
    backgroundColor: "transparent",
  },
  text: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default RepeatDaysScreen;
