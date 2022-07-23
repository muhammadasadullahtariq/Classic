import {API_URL} from '@env';
import messaging from '@react-native-firebase/messaging';

const updateDeviceId = async () => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: global.user,
      deviceId: messaging().getToken(),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'updatePublicUserDeviceId',
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error};
  }
};

export default updateDeviceId;
