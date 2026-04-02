import { axiosClient } from "../axios/axios-client";
import { tokenManager } from "../axios/token-manager";
import { LoginRequest, LoginResponse, ApiResponse, RefreshResponse } from "../axios/types";

export const authApi = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosClient.post<ApiResponse<LoginResponse>>(
            '/administration/auth/login',
            { email: credentials.email, password: credentials.password }
        );

        const { accessToken, refreshToken, user, expiresIn } = response.data;

        // Store tokens and user info
        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken, credentials.rememberMe || false);
        tokenManager.setUserInfo(user);
        tokenManager.setUserId(user.id, credentials.rememberMe || false);

        // Store role IDs if needed
        const roleIds = user.role.map(r => r._id);
        tokenManager.setUserRole(roleIds, credentials.rememberMe || false);

        return { accessToken, refreshToken, user, expiresIn };
    },

    refreshToken: async (refreshToken: string): Promise<string> => {
        const response = await axiosClient.post<ApiResponse<RefreshResponse>>(
            '/administration/auth/refresh',
            { refreshToken }
        );

        const { accessToken } = response.data;
        tokenManager.setAccessToken(accessToken);

        return accessToken;
    },

    // Add logout method
    logout: async (): Promise<void> => {
        try {
            const refreshToken = tokenManager.getRefreshToken();
            if (refreshToken) {
                await axiosClient.post('/administration/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error('Logout API error:', error);
            // Don't throw error - we still want to clear local tokens
        }
    },
};