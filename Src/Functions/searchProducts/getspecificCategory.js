import {API_URL} from '@env';

async function getSpecificCategory(category) {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'productOfCategory/' + category,
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
    return {status: 'Fail', message: error.message};
  }
}

export default getSpecificCategory;