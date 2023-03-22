import axios from 'axios';

export default function configureAxios(token) {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: 'Bearer ' + token,
            APPLICATIONKEY: process.env.REACT_APP_APPLICATIONKEY,
            CONSUMERKEY: process.env.REACT_APP_CONSUMERKEY
        }
    })
    return instance
}
