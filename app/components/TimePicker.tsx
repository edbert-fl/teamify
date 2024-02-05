import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { theme } from "../utils/Styles";

interface TimePickerProps {
  time: Date;
  setTime: Dispatch<SetStateAction<Date>>;
}

const TimePicker: React.FC<TimePickerProps> = ({ time, setTime }) => {
  const [openTimeSelectorAndroid, setOpenTimeSelectorAndroid] = useState(false);

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    if (time) {
      setTime(time);
      toggleTimeSelector();
    }
  };

  const toggleTimeSelector = () => {
    setOpenTimeSelectorAndroid(!openTimeSelectorAndroid);
  };

  return (
    <View>
      {Platform.OS === "android" ? (
        <View style={styles.dateTimePickerContainerAndroid}>
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={toggleTimeSelector}
          >
            <Text style={styles.dateTimePickerButtonText}>
              {time.toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
          </TouchableOpacity>
          {openTimeSelectorAndroid ? (
            <RNDateTimePicker
              value={time}
              onChange={handleTimeChange}
              mode="time"
              display="default"
              themeVariant="dark"
              style={styles.dateTimePicker}
            />
          ) : null}
        </View>
      ) : (
        <View style={styles.dateTimePickerContainer}>
          <RNDateTimePicker
            value={time}
            onChange={handleTimeChange}
            mode="time"
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

export default TimePicker;
