// lib/axios/axios-client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupRequestInterceptor, setupResponseInterceptor } from './interceptors';
import { tokenManager } from './token-manager';

class AxiosClient {
    private static instance: AxiosClient;
    private axiosInstance: AxiosInstance;
    private onLogoutCallback: (() => void) | null = null;
    private isInitialized = false;

    private constructor() {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        this.axiosInstance = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Setup request interceptor immediately
        setupRequestInterceptor(this.axiosInstance);
    }

    public static getInstance(): AxiosClient {
        if (!AxiosClient.instance) {
            AxiosClient.instance = new AxiosClient();
        }
        return AxiosClient.instance;
    }

    // Initialize response interceptor with logout callback (call this once)
    public initialize(onLogout: () => void) {
        if (this.isInitialized) {
            console.warn('AxiosClient already initialized');
            return;
        }

        this.onLogoutCallback = onLogout;
        setupResponseInterceptor(this.axiosInstance, () => {
            tokenManager.clearAll();
            if (this.onLogoutCallback) {
                this.onLogoutCallback();
            }
        });

        this.isInitialized = true;
    }

    // Get the axios instance
    public getClient(): AxiosInstance {
        return this.axiosInstance;
    }

    // Generic request method with typing
    public async request<T = any>(config: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.request<T>(config);
        return response.data;
    }

    // Convenience methods
    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }
}

// Export singleton instance
export const axiosClient = AxiosClient.getInstance();

// Export token manager for external use
export { tokenManager };