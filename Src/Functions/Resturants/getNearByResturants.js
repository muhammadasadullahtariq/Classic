import {env} from '@env';

async function getNearByResturants(id) {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        const result = await fetch(
          env.API_URL + 'getUserNearByResturants/' + id,
          requestOptions,
        );
        const json = await result.json();
        return json;
    }
    catch (error) {
        console.log(error);
        return {status: 'Fail', message: error.message};
    }
}

export default getNearByResturants;