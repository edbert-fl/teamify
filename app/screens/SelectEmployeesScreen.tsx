import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AdminStackParamList, User } from "../utils/Types";
import { Card } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppHeader from "../components/AppHeader";
import { theme } from "../utils/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAdminContext } from "../components/AdminContext";

const SelectEmployeesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();
  const [users, setUsers] = useState<User[]>([]);

  const { selectedUsers, setSelectedUsers } = useAdminContext();

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

  const findSelectedUser = (userToCheck: User) => {
    return selectedUsers.findIndex((user) => user.id === userToCheck.id);
  };

  useEffect(() => {
    getUsersFromDatabase();
  }, []);

  const toggleUser = (userToToggle: User) => {
    const index = findSelectedUser(userToToggle);

    if (index !== -1) {
      // If user is found, remove from selectedUsers array
      const newSelectedUsers = [...selectedUsers];
      newSelectedUsers.splice(index, 1);
      setSelectedUsers(newSelectedUsers);
    } else {
      // If user is not found, add to selectedUsers array
      setSelectedUsers([...selectedUsers, userToToggle]);
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
          {users.map((user: User) => (
            <TouchableOpacity
              style={styles.selectUserButton}
              onPress={() => toggleUser(user)}
              key={user.id}
            >
              <View style={styles.selectUserContainer}>
                <Text style={styles.text}>{user.username}</Text>
                {findSelectedUser(user) != -1 ? (
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
  selectUserContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectUserButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    height: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default SelectEmployeesScreen;
