import axios from 'axios';
import { getCookie } from 'cookies-next';
import { setAccessToken } from './token';

let isInitialized = false;

export const initAuth = async () => {
    if (isInitialized) return;
    isInitialized = true;

    try {
        const refreshToken = getCookie('refreshToken')?.toString();
        if (!refreshToken) return;

        const res = await axios.post('http://localhost:3000/administration/auth/refresh', { refreshToken });
        setAccessToken(res.data.data.accessToken);
    } catch (err) {
        console.log('Init auth failed');
    }
};