import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface Organization {
  code: string;
  name: string;
  createdAt?: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  salt: string;
  organizationCode: string;
  createdAt?: Date;
}

export interface PayrollInfo {
  totalToday: number,
  totalThisWeek: number,
  totalThisMonth: number,
  daysThisWeek: number[],
  WeeksThisMonth: number[],
  MonthsThisYear: number[]
};

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
