//logic stored here to be used throughout components

import axios from 'axios';

const host = 'http://localhost:9000/users';

export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['access_token'] = token
    } else {
        delete axios.defaults.headers.common['access_token']
    }
}



export const call = async (method, path, data) => {
    const response = await axios[method](`${host}/${path}`, data);
    return response.data;
}

export default {setToken, call};
