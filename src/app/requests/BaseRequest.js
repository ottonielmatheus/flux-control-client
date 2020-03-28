import base from '../../base-api';
import auth from '../protected-route/Auth';

const request = async (user = { api: "", body: {}, method: "POST" }) => {

    const url = `${base}/${user.api}`;

    const body = JSON.stringify(user.body);

    const main = {
        method: user.method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + auth.bearer,
        },
    };

    if(body) main.body = user.body;

    let resp = await fetch(url, main);

    return await resp.json();
}

export default request;
