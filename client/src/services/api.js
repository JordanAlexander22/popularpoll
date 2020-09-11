//logic stored here to be used throughout components

import axios from 'axios';


export const setToken = token => {
    if (token) {
        axios.defaults.headers.common
    }
}



export const call = async (method, path, data) => {
    const response = await axios[method](`${host}/${path}`, data);
    return response.data;
}

export default {setToken, call};
