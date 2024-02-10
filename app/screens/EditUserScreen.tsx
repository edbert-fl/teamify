import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Importing an icon library
import { theme } from "../utils/Styles";
import {
  AdminStackParamList,
  AdminStackRouteProp,
  userRoles,
} from "../utils/Types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import FormEditPopup from "../components/FormEditPopup";

interface EditUserScreenProps {
  route: AdminStackRouteProp<"EditUser">;
}

const EditUserScreen: React.FC<EditUserScreenProps> = ({ route }) => {
  const { userToEdit } = route.params;
  const [rateFormOpen, setRateFormOpen] = useState(false);
  const [rate, setRate] = useState<number>(0);
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const toggleRateFormOpen = () => {
    setRateFormOpen(!rateFormOpen);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={userToEdit.username}
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
        <View style={styles.userInfoContainer}>
          <View style={styles.fieldContainer}>
            <View>
              <Text style={styles.label}>EMAIL</Text>
              <Text style={styles.value}>{userToEdit.email}</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <View>
              <Text style={styles.label}>RATE</Text>
              <Text style={styles.value}>${rate}/hr</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={toggleRateFormOpen}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <View>
              <Text style={styles.label}>ROLE</Text>
              <Text style={styles.value}>{userRoles[userToEdit.role_id]}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                /* Add your edit functionality for Role */
              }}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Add your edit functionality for the entire form */
          }}
        >
          <Text style={styles.buttonText}>Edit User</Text>
        </TouchableOpacity>

        {rateFormOpen ? (
          <>
            <FormEditPopup
              value={rate}
              setValue={setRate}
              valueLabel="Rate"
              toggleFormEdit={toggleRateFormOpen}
            />
          </>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
  userInfoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: theme.colors.text,
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
    color: theme.colors.secondaryText,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default EditUserScreen;
