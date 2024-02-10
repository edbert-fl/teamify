import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AdminStackParamList, AdminStackRouteProp, User } from "../utils/Types";
import { Card } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppHeader from "../components/AppHeader";
import { theme } from "../utils/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { userRoles } from "../utils/Types";
import { useAppContext } from "../components/AppContext";
import { useAdminContext } from "../components/AdminContext";

interface SelectRolesProps {
  route: AdminStackRouteProp<"SelectRole">;
}

const SelectRoleScreen: React.FC<SelectRolesProps> = ({ route }) => {
  const { currUser } = useAppContext();
  const { userToEdit, setUserToEdit } = route.params;
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const toggleRole = (roleIndex: number) => {
    if ((currUser as User).role_id < roleIndex) {
      setUserToEdit({ ...userToEdit, role_id: roleIndex });
    } else {
      Alert.alert(
        "Oops!",
        "That role has the same or higher access than you! You can't assign it to someone else."
      );
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Select Role"
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
          {Object.keys(userRoles).map((roleIndex) => (
            <TouchableOpacity
              style={styles.selectRoleButton}
              onPress={() => toggleRole(Number.parseInt(roleIndex))}
              key={roleIndex}
            >
              <View style={styles.selectUserContainer}>
                {(currUser as User).role_id < Number.parseInt(roleIndex) ? (
                  <Text style={styles.text}>
                    {userRoles[Number.parseInt(roleIndex)]}
                  </Text>
                ) : (
                  <Text style={styles.disabledText}>
                    {userRoles[Number.parseInt(roleIndex)]}
                  </Text>
                )}
                {userToEdit.role_id === Number.parseInt(roleIndex) ? (
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
  selectRoleButton: {
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
  disabledText: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default SelectRoleScreen;
