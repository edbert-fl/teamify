import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Dispatch, SetStateAction } from "react";
import { AdminStackParamList } from "../utils/Types";
import { SpeedDial } from "@rneui/themed";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { theme } from "../utils/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AdminSpeedDialProps {
  isSpeedDialOpen: boolean;
  setIsSpeedDialOpen: Dispatch<SetStateAction<boolean>>;
}

const AdminSpeedDial: React.FC<AdminSpeedDialProps> = ({
  isSpeedDialOpen,
  setIsSpeedDialOpen,
}) => {
  const navigation = useNavigation<StackNavigationProp<AdminStackParamList>>();

  const navigateToManageShifts = () => {
    navigation.navigate("ManageShifts");
  };

  const navigateToManageRoles = () => {
    navigation.navigate("ManageUsers");
  };
  return (
    <SpeedDial
      isOpen={isSpeedDialOpen}
      icon={{
        name: "add",
        color: "#fff",
      }}
      openIcon={{
        name: "close",
        color: "#fff",
      }}
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
        onPress={navigateToManageRoles}
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
        onPress={navigateToManageShifts}
        color={theme.colors.accent}
        titleStyle={{
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: theme.colors.faded,
          color: theme.colors.primaryText,
        }}
      />
    </SpeedDial>
  );
};

export const styles = StyleSheet.create({
  speedDial: {
    paddingBottom: 110,
  },
});

export default AdminSpeedDial;
