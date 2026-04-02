// app/auth-test/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { axiosClient } from '../lib/axios/axios-client';
import { tokenManager } from '../lib/axios/token-manager';

export default function AuthTestPage() {
    const { user, isAuthenticated, logout } = useAuth();
    const [apiResponse, setApiResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [tokenInfo, setTokenInfo] = useState({
        hasAccessToken: false,
        hasRefreshToken: false,
        accessTokenPreview: '',
    });

    useEffect(() => {
        // Check token status
        const accessToken = tokenManager.getAccessToken();
        const refreshToken = tokenManager.getRefreshToken();

        setTokenInfo({
            hasAccessToken: !!accessToken,
            hasRefreshToken: !!refreshToken,
            accessTokenPreview: accessToken ? `${accessToken.substring(0, 50)}...` : '',
        });
    }, [isAuthenticated]);

    const testApiCall = async () => {
        setLoading(true);
        try {
            // Replace with an actual protected API endpoint
            const response = await axiosClient.get('/administration/auth/getme');
            setApiResponse({ success: true, data: response.data });
        } catch (error: any) {
            setApiResponse({ success: false, error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testTokenInfo = () => {
        const accessToken = tokenManager.getAccessToken();
        const refreshToken = tokenManager.getRefreshToken();

        if (accessToken) {
            try {
                // Decode JWT to see expiration
                const payload = JSON.parse(atob(accessToken.split('.')[1]));
                const expiresIn = new Date(payload.exp * 1000);
                const now = new Date();
                const timeLeft = Math.floor((expiresIn.getTime() - now.getTime()) / 1000 / 60);

                alert(`
          Access Token:
          - Expires: ${expiresIn.toLocaleString()}
          - Time left: ${timeLeft} minutes
          - User: ${payload.email}
          - Role: ${JSON.stringify(payload.role)}
          
          Refresh Token: ${refreshToken ? 'Present' : 'Missing'}
        `);
            } catch (e) {
                alert('Invalid token format');
            }
        } else {
            alert('No access token found');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Not Authenticated</h1>
                    <p className="text-gray-600">Please login to access this page.</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-4">Authentication Test Page</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={testApiCall}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Calling API...' : 'Test API Call'}
                        </button>
                        <button
                            onClick={testTokenInfo}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Show Token Info
                        </button>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    <pre className="bg-gray-50 p-4 rounded overflow-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>

                {/* Token Status */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Token Status</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Access Token:</span>
                            <span className={tokenInfo.hasAccessToken ? 'text-green-600' : 'text-red-600'}>
                                {tokenInfo.hasAccessToken ? '✓ Present' : '✗ Missing'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Refresh Token:</span>
                            <span className={tokenInfo.hasRefreshToken ? 'text-green-600' : 'text-red-600'}>
                                {tokenInfo.hasRefreshToken ? '✓ Present' : '✗ Missing'}
                            </span>
                        </div>
                        {tokenInfo.accessTokenPreview && (
                            <div className="mt-2">
                                <span className="font-medium">Token Preview:</span>
                                <code className="block mt-1 text-xs bg-gray-100 p-2 rounded break-all">
                                    {tokenInfo.accessTokenPreview}
                                </code>
                            </div>
                        )}
                    </div>
                </div>

                {/* API Response */}
                {apiResponse && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">API Response</h2>
                        <div className={apiResponse.success ? 'bg-green-50' : 'bg-red-50'}>
                            <pre className="p-4 rounded overflow-auto">
                                {JSON.stringify(apiResponse, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}