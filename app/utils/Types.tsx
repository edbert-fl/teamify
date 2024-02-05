import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const userRoles: UserRoles = {
  1: "Admin",
  2: "Manager",
  3: "User"
};

interface UserRoles {
  [key: number]: string;
}

export interface Organization {
  organizationCode: string;
  organizationName: string;
  createdAt?: Date;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  salt: string;
  organizationCode: string;
  rate: number;
  role_id: number;
  createdAt?: Date;
}

export interface IconMap {
  [key: string]: IconInformation;
}

export interface IconInformation {
  name: string;
  color: string;
  size: number;
}

export interface PayrollInfo {
  totalToday: number,
  totalThisWeek: number,
  totalThisMonth: number,
  daysThisWeek: number[],
  WeeksThisMonth: number[],
  MonthsThisYear: number[]
};

export interface SelectedDaysOfTheWeek {
  "monday": boolean,
  "tuesday": boolean,
  "wednesday": boolean,
  "thursday": boolean,
  "friday": boolean,
  "saturday": boolean,
  "sunday": boolean
}

export type RootBottomTabParamList = {
  Home: undefined;
  ClockIn: undefined;
  Schedule: undefined;
}

export type RootStackParamList = {
  Login: undefined;
  OrgSelection: undefined;
  OrgRegistration: undefined;
  OrgCreation: undefined;
  SignUp: undefined;
  AuthApp: undefined;
  Registration: { userCreatedOrganization: boolean };
  navigation: StackNavigationProp<RootStackParamList, "AuthApp">;
};

export type AdminStackParamList = {
  AdminPanel: undefined,
  ManageShifts: undefined,
  ManageRoles: undefined,
  RepeatDays: undefined,
  SelectEmployees: undefined,
  navigation: StackNavigationProp<RootStackParamList, "AuthApp">;
};

export type RootStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  | "Login"
  | "OrgSelection"
  | "OrgRegistration"
  | "OrgCreation"
  | "SignUp"
  | "AuthApp"
  | "Registration"
>;

export type RootStackRouteProp<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;