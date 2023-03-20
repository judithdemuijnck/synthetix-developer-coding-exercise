import axios from "axios";
import { useState } from "react";

export default function useToken() {
    const url = `${process.env.REACT_APP_BASE_URL}/session`
    const apiKeys = {
        APPLICATIONKEY: process.env.REACT_APP_APPLICATIONKEY,
        CONSUMERKEY: process.env.REACT_APP_CONSUMERKEY
    }

    const [token, setToken] = useState(localStorage.getItem("token"))

    const initializeSession = async () => {
        try {
            const response = await axios.post(url, {}, {
                headers: { ...apiKeys }
            })
            localStorage.setItem("token", response.data.token)
            setToken(response.data.token)
        } catch (err) { console.error(err) }
    }

    const deleteSession = async () => {
        try {
            await axios.delete(url, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    ...apiKeys
                }
            })
            localStorage.removeItem("token")
            setToken(null)
        } catch (err) { console.error(err) }
    }

    const verifySession = async () => {
        try {
            await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    ...apiKeys
                }
            })
        } catch (err) {
            await deleteSession()
            await initializeSession()
        }
    }

    return {
        token,
        initializeSession,
        deleteSession,
        verifySession
    }
}

