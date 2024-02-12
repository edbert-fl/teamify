import { Platform } from "react-native";

export const SERVER_URL =
  Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_IOS_SERVER_URL
    : "http://10.0.2.2:3000";

export const numberToDayOfWeek = (dayNumber: number): string => {
  const shortDaysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (dayNumber >= 0 && dayNumber < shortDaysOfWeek.length) {
    return shortDaysOfWeek[dayNumber];
  } else {
    return "Invalid day number";
  }
};

export const numberToMonth = (monthNumber: number): string => {
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (monthNumber >= 0 && monthNumber < shortMonths.length) {
    return shortMonths[monthNumber];
  } else {
    return "Invalid month number";
  }
};

export const convertTimeStringToDate = (timeString: string): Date => {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Create a new Date object with the current date and the provided time
  const dateWithTime = new Date();
  dateWithTime.setHours(hours);
  dateWithTime.setMinutes(minutes);
  dateWithTime.setSeconds(seconds || 0);

  return dateWithTime;
};
export const formatTimeString = (timeString: string): string => {
  const date = convertTimeStringToDate(timeString);
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}${date.getHours() > 11 ? "pm" : "am"}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getDate()} ${numberToMonth(date.getMonth())}`;
};

export const getDayFromDate = (dateString: string): string => {
  const date = new Date(dateString);

  return numberToDayOfWeek(date.getDay());
};
