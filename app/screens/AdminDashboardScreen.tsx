import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../utils/Styles";
import { SpeedDial } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";
import WorkStatusCard from "../components/WorkStatusCard";
import PayrollStatusCard from "../components/PayrollStatusCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AdminStackParamList } from "../utils/Types";

const AdminDashboardScreen = () => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  function navigateToManageShifts(): void {
    navigation.navigate("ManageShifts");
  }

  return (
    <View style={styles.container}>
      {/* Cards that show relevant information about the organization */}
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView> 
          <WorkStatusCard/>
          <PayrollStatusCard/>
        </ScrollView>
      </SafeAreaView>

      {/* Speed dial for quick access to managing different aspects of the organization */}
      <SpeedDial
        isOpen={isSpeedDialOpen}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        style={styles.speedDial}
        onOpen={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
        onClose={() => setIsSpeedDialOpen(!isSpeedDialOpen)}
        color={theme.colors.primary}
      >
        <SpeedDial.Action
          icon={
            <Icon name="group-add" size={22} color={theme.colors.primaryText} />
          }
          title="Manage Roles"
          onPress={() => alert("Pressed")}
          color={theme.colors.accent}
          titleStyle={{
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: theme.colors.faded,
            color: theme.colors.primaryText,
          }}
        />
        <SpeedDial.Action
          icon={
            <Icon
              name="calendar-today"
              size={22}
              color={theme.colors.primaryText}
            />
          }
          title="Manage Shifts"
          onPress={() => navigateToManageShifts()}
          color={theme.colors.accent}
          titleStyle={{
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: theme.colors.faded,
            color: theme.colors.primaryText,
          }}
        />
      </SpeedDial>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  cardTitle: {
    color: theme.colors.primaryText,
    fontWeight: "700",
    textAlign: "left",
    fontSize: 26,
  },
  table: {
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  labelCell: {
    flex: 3,
    textAlign: "left",
  },
  cell: {
    flex: 2,
    textAlign: "right",
  },
  dataHeader: {
    fontSize: 16,
    color: theme.colors.primaryText,
  },
  data: {
    fontSize: 16,
    color: theme.colors.secondaryText,
  },
  viewAllLink: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  viewAllLinkText: {
    fontSize: 16,
    textAlign: "right",
    color: theme.colors.primary,
  },
  viewAllLinkIcon: {
    marginLeft: 5,
  },
  success: {
    color: theme.colors.success,
  },
  warning: {
    color: theme.colors.warning,
  },
  warningText: {
    color: theme.colors.secondaryText,
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  primaryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  speedDial: {
    paddingBottom: 110,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
});

export default AdminDashboardScreen;
