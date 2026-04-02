// lib/axios/token-manager.ts
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'userId';
const USER_ROLE_KEY = 'userRole';

let accessToken: string | null = null;
let userInfo: any = null; // Add this line to store user info in memory

export const tokenManager = {
    // Access token methods
    setAccessToken: (token: string) => {
        accessToken = token;
    },

    getAccessToken: (): string | null => {
        return accessToken;
    },

    clearAccessToken: () => {
        accessToken = null;
    },

    // Refresh token methods
    setRefreshToken: (token: string, rememberMe: boolean = false) => {
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
        setCookie(REFRESH_TOKEN_KEY, token, {
            path: '/',
            maxAge,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
    },

    getRefreshToken: (): string | null => {
        const token = getCookie(REFRESH_TOKEN_KEY);
        return token?.toString() || null;
    },

    clearRefreshToken: () => {
        deleteCookie(REFRESH_TOKEN_KEY);
    },

    // User info methods - Add these
    setUserInfo: (user: any) => {
        userInfo = user;
    },

    getUserInfo: (): any => {
        return userInfo;
    },

    // User ID methods
    setUserId: (userId: string, rememberMe: boolean = false) => {
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
        setCookie(USER_ID_KEY, userId, {
            path: '/',
            maxAge,
            sameSite: 'lax',
        });
    },

    getUserId: (): string | null => {
        const userId = getCookie(USER_ID_KEY);
        return userId?.toString() || null;
    },

    // User Role methods
    setUserRole: (roles: string[], rememberMe: boolean = false) => {
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
        setCookie(USER_ROLE_KEY, JSON.stringify(roles), {
            path: '/',
            maxAge,
            sameSite: 'lax',
        });
    },

    getUserRole: (): string[] | null => {
        const roles = getCookie(USER_ROLE_KEY);
        if (roles) {
            try {
                return JSON.parse(roles.toString());
            } catch {
                return null;
            }
        }
        return null;
    },

    // Clear all tokens and user info

    clearAll: () => {
        // Clear memory
        accessToken = null;
        userInfo = null;

        // Clear cookies
        deleteCookie(REFRESH_TOKEN_KEY);
        deleteCookie(USER_ID_KEY);
        deleteCookie(USER_ROLE_KEY);

        // Clear any other stored data
        localStorage?.removeItem('persist:root'); // If you use persist
    },

    isAuthenticated: (): boolean => {
        return !!accessToken && !!tokenManager.getRefreshToken();
    },
};