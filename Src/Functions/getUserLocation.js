import RNLocation from 'react-native-location';
import Geolocation from 'react-native-geolocation-service';
import updateUserLocation from './useRegistration/updateUserLocation';

async function getLocation(setLocation) {
  try {
    permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords);
          updateUserLocation(position.coords);
        },
        error => {
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Geolocation.getCurrentPosition(
        position => {
         
          setLocation(position.coords);
          updateUserLocation(position.coords);
        },
        error => {
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  } catch (err) {
  }
}

export default getLocation;
