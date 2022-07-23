import {API_URL} from '@env';

const updateLocation = async location => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: global.user,
      user: {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(API_URL + 'updateuser', requestOptions);
    const json = await result.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error.message};
  }
};

export default updateLocation;
