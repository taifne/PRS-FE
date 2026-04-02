// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../lib/api/auth-api';
import { tokenManager } from '../lib/axios/token-manager';
import { LoginResponse, LoginRequest } from '../lib/axios/types';

interface AuthState {
    user: LoginResponse['user'] | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    const checkAuth = useCallback(async () => {
        try {
            const isAuthenticated = tokenManager.isAuthenticated();

            if (isAuthenticated) {
                // Get user info from token manager
                const user = tokenManager.getUserInfo();

                setState(prev => ({
                    ...prev,
                    user: user || null,
                    isAuthenticated: true,
                    isLoading: false,
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    isAuthenticated: false,
                    isLoading: false,
                }));
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setState(prev => ({
                ...prev,
                isAuthenticated: false,
                isLoading: false,
            }));
        }
    }, []);

    const login = useCallback(async (credentials: LoginRequest): Promise<{ success: boolean; data?: LoginResponse; error?: any }> => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));

            const response = await authApi.login(credentials);

            setState({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            return { success: true, data: response };
        } catch (error) {
            console.error('Login failed:', error);
            setState(prev => ({ ...prev, isLoading: false }));
            return { success: false, error };
        }
    }, []);

    // Update logout function
    const logout = useCallback(async (): Promise<void> => {
        try {
            // Call logout API
            await authApi.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            // Clear all tokens and user info
            tokenManager.clearAll();

            // Reset state
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    }, []);

    return {
        ...state,
        login,
        logout,
        checkAuth,
    };
};