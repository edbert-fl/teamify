import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "@rneui/themed";
import { theme } from "../utils/Styles";
import { User } from "../utils/Types";

const WINDOW_INNER_WIDTH = Dimensions.get("window").width;

interface FormEditPopupProps {
  userToEdit: User;
  setUserToEdit: Dispatch<SetStateAction<User>>;
  valueLabel: string;
  toggleFormEdit: () => void;
}

const FormEditPopup: React.FC<FormEditPopupProps> = ({
  userToEdit,
  setUserToEdit,
  valueLabel,
  toggleFormEdit,
}) => {
  const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
  const formFadeAnim = useRef(new Animated.Value(0)).current;
  const formZoomAnim = useRef(new Animated.Value(0.8)).current;
  const [tempValue, setTempValue] = useState<string>(userToEdit.rate.toString());
  const ANIMATION_DURATION = 100;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(backgroundFadeAnim, {
        toValue: 0.8,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(formFadeAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION * 2,
        useNativeDriver: true,
      }),
      Animated.timing(formZoomAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const saveValue = () => {
    exitScreen();
    setUserToEdit({
      ...userToEdit,
      rate: Number.parseFloat(tempValue)
    });
  }

  const exitScreen = () => {
    Animated.parallel([
      Animated.timing(backgroundFadeAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(formFadeAnim, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(formZoomAnim, {
        toValue: 0.8,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        toggleFormEdit();
      }, ANIMATION_DURATION);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.overlay,
          opacity: backgroundFadeAnim,
        }}
      ></Animated.View>
      <Animated.View
        style={{
          width: "100%",
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
          top: "20%",
          opacity: formFadeAnim,
          transform: [{ scale: formZoomAnim }],
        }}
      >
        <Card containerStyle={styles.card}>
          <View style={{ width: 300 }}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>Edit {valueLabel}</Text>
            </View>
            <View>
              <Text style={styles.inputLabel}>{valueLabel.toUpperCase()}</Text>
              <TextInput
                value={tempValue}
                style={styles.input}
                placeholder="Enter your new rate here"
                placeholderTextColor={theme.colors.secondaryText}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(text) => setTempValue(text)}
                enablesReturnKeyAutomatically
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={exitScreen}
                >
                  <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={saveValue}
                >
                  <Text style={styles.buttonText}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: WINDOW_INNER_WIDTH,
  },
  overlay: {
    backgroundColor: "black",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    width: 80,
  },
  doneButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: 80,
  },
  buttonText: {
    color: theme.colors.primaryText,
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: theme.colors.surface,
    text: theme.colors.surface,
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 0,
    width: "90%",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: "20%",
  },
  cardTitle: {
    color: theme.colors.primaryText,
    fontWeight: "700",
    textAlign: "center",
    fontSize: 24,
  },
  cardTitleContainer: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  labelCell: {
    flex: 3,
    textAlign: "left",
    marginBottom: 3,
  },
  inputLabel: {
    color: theme.colors.primaryText,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 6,
  },
  input: {
    color: theme.colors.primaryText,
    fontSize: 16,
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: "100%",
  },
});

export default FormEditPopup;
