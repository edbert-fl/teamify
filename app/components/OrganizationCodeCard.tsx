import { Card } from "@rneui/base";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../utils/Styles";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/MaterialIcons";

interface OrganizationCodeCardProps {
  organizationCode: string | undefined;
}
const OrganizationCodeCard: React.FC<OrganizationCodeCardProps> = ({ organizationCode }) => {
  const copyToClipboard = async () => {
    if (organizationCode) {
      await Clipboard.setStringAsync(organizationCode);
      console.log("Give alert that code has been copied to clipboard");
    } else {
      throw new Error("No organization code provided!");
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.organizationCodeLabel}>Your Organization Code</Text>
      {
        organizationCode ? (
          <Text style={styles.organizationCode}>{organizationCode}</Text>
        ) : (
          <Text style={styles.organizationCode}>ERROR!</Text>
        )
      }
      <TouchableOpacity style={styles.copyContainer} onPress={copyToClipboard}>
        <Icon name="content-copy" size={18} color={theme.colors.primaryText} />
        <Text style={styles.copyText}>Copy</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.accent,
    borderWidth: 0,
    borderRadius: 10,
    fontWeight: "500",
    marginHorizontal: 0,
    marginBottom: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  copyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 55,
  },
  organizationCodeLabel: {
    fontSize: 18,
    color: theme.colors.primaryText,
  },
  organizationCode: {
    fontSize: 66,
    fontWeight: "bold",
    color: theme.colors.primaryText,
  },
  copyText: {
    color: theme.colors.primaryText,
    fontSize: 16,
  },
})

export default OrganizationCodeCard;