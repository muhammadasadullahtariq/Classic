import {API_URL} from '@env';
import {Platform} from 'react-native';

const imageUpload = async imageSur => {
  //var bearer = 'Bearer ' + localStorage.getItem('accessToken');
  //console.log('i called with', imageSur);
  var uri = Platform.OS == 'ios' ? imageSur.sourceURL : imageSur.path;
  var image = {};
  image.uri = uri;
  image.name = imageSur.path.substring(imageSur.path.lastIndexOf('/') + 1);
  image.type = imageSur.mime;
  image.dateModified = new Date();
  var formdata = new FormData();
  formdata.append('photo', image, uri);
  try {
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const response = await fetch(API_URL + 'uploadImage', requestOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error.message};
  }
};

export default imageUpload;
