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
      console.log('hellow');
    } else {
      imageResult = await imageUpload(image.responce);
      if (imageResult.status == 'Fail') {
        imageResult = '';
      }
      else{
        console.log('imageResult',imageResult);
imageResult = imageResult.data.filename;
      }
    }
    console.log(
      'registerUser',
      name,
      email,
      phone,
      longitude,
      latitude,
      address,
      deviceId,
      image,
      googleId,
    );
    var raw = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
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
    console.log('res', res);
    return res;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: 'Internal error occured'};
  }
};

export default registerUser;
