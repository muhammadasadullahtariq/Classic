import {API_URL} from '@env';

async function getSpecificSubCategory(category) {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const result = await fetch(
      API_URL + 'productOfSubCategory/' + category,
      requestOptions,
    );
    const json = await result.json();
    return json;
  } catch (error) {
    return {status: 'Fail', message: error.message};
  }
}

export default getSpecificSubCategory;
