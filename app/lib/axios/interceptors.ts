// lib/axios/interceptors.ts
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from './token-manager';
import { FailedQueueItem } from './types';

// Queue for handling concurrent requests
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

// Skip token attachment for these endpoints
const AUTH_ENDPOINTS = [
    '/administration/auth/login',
    '/administration/auth/refresh',
    '/administration/auth/logout',
];

export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Skip token attachment for auth endpoints
            const shouldSkipToken = AUTH_ENDPOINTS.some((endpoint) =>
                config.url?.includes(endpoint)
            );

            if (!shouldSkipToken) {
                const token = tokenManager.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const setupResponseInterceptor = (
    axiosInstance: AxiosInstance,
    onLogout: () => void
) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
                _retryCount?: number;
            };

            // Handle 401 errors (Unauthorized)
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !AUTH_ENDPOINTS.some((endpoint) => originalRequest.url?.includes(endpoint))
            ) {
                // If already refreshing, queue this request
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token: string) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                resolve(axiosInstance(originalRequest));
                            },
                            reject,
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const refreshToken = tokenManager.getRefreshToken();

                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    // Call refresh endpoint
                    const response = await axiosInstance.post('/administration/auth/refresh', {
                        refreshToken,
                    });

                    const { accessToken } = response.data.data;

                    // Update access token
                    tokenManager.setAccessToken(accessToken);

                    // Process queued requests
                    processQueue(null, accessToken);

                    // Retry original request
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    // Refresh failed - clear tokens and logout
                    processQueue(refreshError, null);
                    tokenManager.clearAll();
                    onLogout();
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            // Handle network errors (optional retry logic)
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
                if (!originalRequest._retryCount) {
                    originalRequest._retryCount = 0;
                }

                if (originalRequest._retryCount < 2) {
                    originalRequest._retryCount += 1;
                    const delay = Math.pow(2, originalRequest._retryCount) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return axiosInstance(originalRequest);
                }
            }

            return Promise.reject(error);
        }
    );
};