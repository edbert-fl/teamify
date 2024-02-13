import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../utils/Styles";
import WorkStatusCard from "../components/WorkStatusCard";
import PayrollStatusCard from "../components/PayrollStatusCard";
import AdminSpeedDial from "../components/AdminSpeedDial"

const AdminDashboardScreen = () => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Cards that show relevant information about the organization */}
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView> 
          <WorkStatusCard/>
          <PayrollStatusCard/>
          <View style={{ height: 100 }}/>
        </ScrollView>
      </SafeAreaView>

      {/* Speed dial for quick access to managing different aspects of the organization */}
      <AdminSpeedDial isSpeedDialOpen={isSpeedDialOpen} setIsSpeedDialOpen={setIsSpeedDialOpen}/>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: theme.colors.background,
  },
});

export default AdminDashboardScreen;
