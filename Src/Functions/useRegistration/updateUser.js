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
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
        };

        const reult = oldImage.split(API_URL);

        const res = await fetch(
          API_URL + 'removeImage/' + reult[1],
          requestOptions,
        );
      }
      if (image == undefined) {
        imageResult = '';
      } else {
        imageResult = await imageUpload(image.responce);
        if (imageResult.status == 'Fail') {
          imageResult = '';
        } else {
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
    return {status: 'Fail', message: error};
  }
};

export default updateUser;
