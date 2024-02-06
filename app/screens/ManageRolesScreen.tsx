import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList, userRoles, User } from "../utils/Types";
import axios from "axios";
import { SERVER_URL } from "../utils/ServerAddress";
import { Card } from "@rneui/themed";

const ManageRolesScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { currOrganization, setCurrOrganization } = useAppContext();

  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const getUsersFromDatabase = async () => {
    const response = await axios.post(`${SERVER_URL}/users/get`, {
      currOrganization: currOrganization,
    });
    setUsers(response.data.users);
  };

  useEffect(() => {
    getUsersFromDatabase();
  }, []);

  function editUser(user: User): void {
    navigation.navigate("EditUser", { userToEdit: user })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Manage Roles"
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
              onPress={() => editUser(user)}
              key={user.user_id}
            >
              <View style={styles.selectUserContainer}>
                <View style={styles.userRoleContainer}>
                  {userRoles[user.role_id] === "Admin" ? (
                    <Icon name="star" size={32} color={theme.colors.primary} />
                  ) : userRoles[user.role_id] === "User" ? (
                    <Icon name="star-border" size={32} color={theme.colors.secondaryText} />
                  ) : null}
                </View>
                <View style={styles.username}>
                  <Text style={styles.text}>{user.username}</Text>
                  {/* <Text style={styles.secondaryText}>{user.email}</Text> */}
                  <Text style={styles.secondaryText}>${user.rate}/ hour</Text>
                </View>
                <View style={styles.editIcon}>
                  <Icon
                    name="edit"
                    size={16}
                    color={theme.colors.primaryText}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
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
    alignItems: "center",
  },
  selectUserButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    height: 80,
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    color: theme.colors.primaryText,
    fontSize: 16,
    fontWeight: "400",
  },
  secondaryText: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    fontWeight: "400",
  },
  editIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  userRoleContainer: {
    flex: 1,
  },
  userRoleText: {
    color: theme.colors.primaryText,
    fontSize: 16,
  },
  username: {
    flex: 3,
  },
});

export default ManageRolesScreen;
