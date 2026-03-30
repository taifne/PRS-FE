import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getAccessToken, setAccessToken } from './token';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor
axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/administration/auth/refresh')
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers.Authorization = 'Bearer ' + token;
                            resolve(axiosClient(originalRequest));
                        },
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = getCookie('refreshToken')?.toString();
                const res = await axios.post('http://localhost:3000/administration/auth/refresh', { refreshToken });

                const newAccessToken = res.data.data.accessToken;
                setAccessToken(newAccessToken);
                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
                return axiosClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                //     deleteCookie('refreshToken');
                // window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;