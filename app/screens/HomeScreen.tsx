import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { theme } from "../utils/Styles";
import { useAppContext } from "../components/AppContext";
import Clock from "../components/Clock";
import axios from "axios";
import FormData from 'form-data';

import { SERVER_URL } from "../utils/ServerAddress";

const HomeScreen = () => {
  const { setCurrUser } = useAppContext();

  const cameraRef = useRef(null);

  const [type, setType] = useState(CameraType.front);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [clockedIn, setClockedIn] = useState(false);

  useEffect(() => {
    // Request permissions for using camera
    requestPermissions();
  }, []);

  const clockIn = async () => {
    const photoUri = await takePicture();
    const personPresent = await checkIfPersonPresent(photoUri);

    if (personPresent) {
      Alert.alert("Success!", "You've been clocked in.");
      setTimeout(() => {
        setCapturedPhoto(null);
        setClockedIn(true);
      }, 3000);
    } else {
      setCapturedPhoto(null);
      Alert.alert("Failed to clock in", "Nobody was detected in the photo. Please try again!");
    }
  };

  const clockOut = () => {
    setCapturedPhoto(null);
    setClockedIn(false);
  };

  const goOnBreak = () => {
    setCapturedPhoto(null);
    setClockedIn(false);
  };

  const checkIfPersonPresent = async (photoUri: string) => {
    try {
      const formData = new FormData();

      // Changes fileUri path based on platform.
      const fileUri = Platform.OS === 'android' ? photoUri : photoUri.replace('file://', '');

      // Uses file's name.
      const fileName = fileUri.split('/').pop();

      formData.append('image', {
        uri: fileUri,
        name: fileName,
        type: `image/jpeg`,
      });

      // Send the file to the server for analysis.
      const response = await axios.post(`${SERVER_URL}/verify/person`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Check if the request was successful
      if (response.status !== 200) {
        throw new Error('Failed to upload file to the server');
      }

      return response.data.isPersonPresent;

    } catch (error) {
      console.error("Error:", error.message);
      return false;
    }
  };

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync(options);
      setCapturedPhoto(photo.uri);
      return photo.uri;
    } else {
      console.error("Camera handle is null");
      return null;
    }
  };

  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Clock />

        {capturedPhoto ? (
          <Image style={styles.capturedPhoto} source={{ uri: capturedPhoto }} />
        ) : (
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            {clockedIn ? (
              <View style={styles.status}>
                <Text style={styles.buttonText}>Clocked in</Text>
              </View>
            ) : null}
          </Camera>
        )}

        {clockedIn ? (
          <View style={styles.clockOutOptions}>
            <TouchableOpacity
              style={styles.onBreak}
              onPress={() => goOnBreak()}
            >
              <Text style={styles.buttonText}>Break</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clockOut}
              onPress={() => clockOut()}
            >
              <Text style={styles.buttonText}>Clock out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.clockIn} onPress={() => clockIn()}>
            <Text style={styles.buttonText}>Clock in</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity
          style={styles.temporaryButton}
          onPress={() => setCurrUser(null)}
        >
          <Text style={styles.buttonText}>Temporary Logout</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
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
  clockIn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  clockOut: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    marginLeft: 5,
  },
  onBreak: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    marginRight: 5,
  },
  temporaryButton: {
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
  camera: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 30,
    alignItems: "flex-end",
  },
  capturedPhoto: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 30,
  },
  status: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  clockOutOptions: {
    display: "flex",
    flexDirection: "row",
  },
});

export default HomeScreen;
