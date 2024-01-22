import { StackNavigationProp } from "@react-navigation/stack";

export interface Organization {
  organizationCode: string;
  organizationName: string;
  createdAt?: Date;
}

export interface User {
  id: number;
  uesrname: string;
  email: string;
  hashedPassword: string;
  salt: string;
  organizationCode: string;
  createdAt?: Date;
}

export type RootStackParamList = {
    'Login': undefined;
    'OrgSelection': undefined;
    'OrgRegistration': undefined;
    'OrgCreation': undefined;
    'SignUp': undefined;
    'Home': undefined;
    'Registration': undefined;
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };