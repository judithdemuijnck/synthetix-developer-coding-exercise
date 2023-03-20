import axios from 'axios';


// initialize a session -> get token
// instantiate axios with settings & token

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

// instance.post("/article", {
//   label: 'qed00199',
//   channel: 14,
//   userid: 123456
// })
//   .then(response => console.log(response.data))