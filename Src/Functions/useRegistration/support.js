import {API_URL} from '@env';

const postSupport = async (title, message) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      title: title,
      message: message,
      userId: global.user,
      status: '1',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(API_URL + 'addSupport', requestOptions);
    const json = await result.json();
    return json;
  } catch (error) {
    console.log('error', error);
    return {status: 'Fail', message: error};
  }
};

export default postSupport;
