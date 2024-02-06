import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Platform, StatusBar} from 'react-native'
import React from 'react'
import { theme } from '../utils/Styles';
import { AdminStackRouteProp } from '../utils/Types';

interface EditUserScreenProps {
    route: AdminStackRouteProp<'EditUser'>;
}

const EditUserScreen: React.FC<EditUserScreenProps> = ({ route }) => {
    const { userToEdit } = route.params
    
    return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text>{userToEdit.username}</Text>
          </View>
        </SafeAreaView>
      );
    };
    
    export const styles = StyleSheet.create({
      safeAreaView: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight as number) : 0
      },
      container: {
        flex: 1,
        paddingHorizontal: 20,
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
    });
    
    export default EditUserScreen;
    