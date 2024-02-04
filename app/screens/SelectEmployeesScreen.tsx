import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { Dispatch, useEffect, useState } from "react";
import { AdminStackParamList, SelectedDaysOfTheWeek, User } from "../utils/Types";
import { Card } from "@rneui/base";
import { Icon } from "react-native-vector-icons/Icon";
import AppHeader from "../components/AppHeader";
import { theme } from "../utils/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAdminContext } from "../components/AdminContext";


const SelectEmployeesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();
  const [users, setUsers] = useState<User[] | null>(null);

  const {selectedUsers, setSelectedUsers} = useAdminContext();

  const getUsersFromDatabase = async () => {
    const mockData: User[] = [
      {
        id: 1,
        username: "Alice",
        email: "alice@gmail.com",
        salt: "abcdefg",
        organizationCode: "AAAAAA",
      },
      {
        id: 2,
        username: "Bob",
        email: "bob@gmail.com",
        salt: "hijklmnop",
        organizationCode: "AAAAAA",
      },
      {
        id: 3,
        username: "Charlie",
        email: "charlie@gmail.com",
        salt: "qrstuvwxyz",
        organizationCode: "AAAAAA",
      },
    ];

    setUsers(mockData);
  };

  useEffect(() => {
    getUsersFromDatabase();
  }, []);

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
          {Object(users).map((user: User) => (
              <View style={styles.dayContainer}>
                <Text style={styles.text}>
                  {user.username}
                </Text>
              </View>
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

export default SelectEmployeesScreen;
