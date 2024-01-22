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
    'Registration': { createOrganization: boolean };
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };