import { Platform } from 'react-native';

// Default URL for Android
export const SERVER_URL_ANDROID = 'http://10.0.2.2:3000';

// Default URL for iOS
export const SERVER_URL_IOS = process.env.REACT_APP_SERVER_URL;

// Determine the appropriate URL based on the platform
export const SERVER_URL = Platform.OS === 'ios' ? SERVER_URL_IOS : SERVER_URL_ANDROID;
