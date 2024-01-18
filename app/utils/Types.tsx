import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    'Login': undefined;
    'OrgSignUp': undefined;
    'SignUp': undefined;
    'Home': undefined;
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };