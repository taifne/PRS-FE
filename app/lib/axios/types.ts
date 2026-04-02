// lib/axios/types.ts
import { InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _retryCount?: number;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        userName: string;
        role: Array<{ _id: string; name: string }>;
    };
}

export interface RefreshResponse {
    accessToken: string;
    expiresIn: number;
}

export interface FailedQueueItem {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}