import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  ActivityIndicator,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { theme } from "../utils/Styles";

const WINDOW_INNER_WIDTH = Dimensions.get("window").width;

interface FormEditPopupInterface {
  loading: boolean;
}

const FormEditPopup: React.FC<FormEditPopupInterface> = ({ loading }) => {
  const [loadingOpen, setLoadingOpen] = useState<Boolean>(false);
  const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
  const ANIMATION_DURATION = 100;

  useEffect(() => {
    setLoadingOpen(true);
    if (loading) {
      Animated.parallel([
        Animated.timing(backgroundFadeAnim, {
          toValue: 0.7,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backgroundFadeAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          setLoadingOpen(false);
        }, ANIMATION_DURATION);
      });
    }
  }, [loading]);

  return (
    <>
      {loadingOpen ? (
        <View style={styles.container}>
          <Animated.View
            style={{
              ...styles.overlay,
              opacity: backgroundFadeAnim,
            }}
          >
            <ActivityIndicator size={48} color={theme.colors.primary} />
          </Animated.View>
        </View>
      ) : null}
    </>
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
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "40%",
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
