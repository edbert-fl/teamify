import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { theme } from "../utils/Styles";
import { useAdminContext } from "./AdminContext";

const DateTimePicker = () => {
  const { selectedDate, setSelectedDate } = useAdminContext();
  const [openDateSelectorAndroid, setOpenDateSelectorAndroid] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      toggleDateSelector();
    }
  };

  const toggleDateSelector = () => {
    setOpenDateSelectorAndroid(!openDateSelectorAndroid);
  };

  return (
    <View>
      {Platform.OS === "android" ? (
        <View style={styles.dateTimePickerContainerAndroid}>
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={toggleDateSelector}
          >
            <Text style={styles.dateTimePickerButtonText}>
              {selectedDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </TouchableOpacity>
          {openDateSelectorAndroid ? (
            <RNDateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              mode="date"
              minimumDate={new Date()}
              display="default"
              themeVariant="dark"
              style={styles.dateTimePicker}
            />
          ) : null}
        </View>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dateTimePickerButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  dateTimePickerButtonText: {
    fontSize: 16,
    color: theme.colors.primaryText,
  },
});

export default DateTimePicker;
