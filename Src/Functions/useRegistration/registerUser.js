import {API_URL} from '@env';
import imageUpload from '../Media/uploadImage';

const registerUser = async (
  name,
  email,
  phone,
  longitude,
  latitude,
  address,
  deviceId,
  image,
  googleId,
) => {
  try {
    var imageIssue;
    var imageResult;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (image == undefined) {
      imageResult = '';
    } else {
      //imageResult = await imageUpload(image);
      imageResult = await imageUpload(image.responce);
      if (imageResult.status == 'Fail') {
        imageResult = '';
      } else {
        imageResult = API_URL + imageResult.data.filename;
      }
    }
    
    var raw = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      location: {
        longitude,
        latitude,
      },
      address: address,
      reviews: [],
      status: 1,
      favourties: [],
      role: 1,
      deviceId: deviceId,
      image: imageResult,
      googleId: googleId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(API_URL + 'addUser', requestOptions);
    const res = await result.json();
    return res;
  } catch (error) {
    return {status: 'Fail', message: 'Internal error occured'};
  }
};

export default registerUser;
