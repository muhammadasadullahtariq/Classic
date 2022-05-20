import {API_URL} from '@env';
import imageUpload from '../Media/uploadImage';

const updateUser = async (
  name,
  phone,
  address,
  image,
  changedImageFlag,
  oldImage,
) => {
  try {
    let imageResult = '';
    if (changedImageFlag) {
      if (oldImage != '') {
        console.log('delete image is called');
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
        };

        const reult = oldImage.split(API_URL);
        console.log(API_URL + 'removeImage/' + reult[1]);

        const res = await fetch(
          API_URL + 'removeImage/' + reult[1],
          requestOptions,
        );
        console.log(res);
      }
      if (image == undefined) {
        imageResult = '';
        console.log('hellow');
      } else {
        imageResult = await imageUpload(image.responce);
        if (imageResult.status == 'Fail') {
          imageResult = '';
        } else {
          console.log('imageResult', imageResult);
          imageResult = API_URL + imageResult.data.filename;
        }
      }
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: global.user,
      user: {
        name: name,
        phone: phone,
        address: address,
        image: imageResult,
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
    console.log('error', error);
    return {status: 'Fail', message: error};
  }
};

export default updateUser;
