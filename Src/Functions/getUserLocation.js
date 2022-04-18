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
    console.log('permission', permission);
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
      console.log(permission);
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position.coords);
          updateUserLocation(position.coords);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Here 7');
      Geolocation.getCurrentPosition(
        position => {
          // console.log(
          //   getWeaterData(position.coords.longitude, position.coords.latitude),
          // );
          setLocation(position.coords);
          console.log(position);
          updateUserLocation(position.coords);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export default getLocation;
