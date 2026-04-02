// app/token-refresh-test/page.tsx
'use client';

import { useState } from 'react';
import { axiosClient } from '../lib/axios/axios-client';
import { tokenManager } from '../lib/axios/token-manager';

export default function TokenRefreshTestPage() {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const addLog = (message: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
    };

    const testTokenRefresh = async () => {
        setLoading(true);
        addLog('Starting token refresh test...');

        try {
            // Get current token info
            const oldToken = tokenManager.getAccessToken();
            addLog(`Old token: ${oldToken ? oldToken.substring(0, 50) + '...' : 'None'}`);

            // Make request that will trigger refresh (if token expired)
            addLog('Making API call to /getme...');
            const response = await axiosClient.get('/administration/auth/getme');

            // Get new token
            const newToken = tokenManager.getAccessToken();
            addLog(`New token: ${newToken ? newToken.substring(0, 50) + '...' : 'None'}`);

            if (oldToken !== newToken) {
                addLog('✓ Token was refreshed successfully!');
            } else {
                addLog('ℹ Token unchanged (still valid)');
            }

            addLog(`✓ API Response: ${JSON.stringify(response.data).substring(0, 200)}`);

        } catch (error: any) {
            addLog(`✗ Error: ${error.message}`);
            if (error.response) {
                addLog(`  Status: ${error.response.status}`);
                addLog(`  Data: ${JSON.stringify(error.response.data)}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const simulateExpiredToken = () => {
        // Create an expired token (for testing)
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.2bC5pJqXQyQYqWpGqWpGqWpGqWpGqWpGqWpGqWpGqWp';
        tokenManager.setAccessToken(expiredToken);
        addLog('⚠ Set expired token for testing');
        addLog('Now try making an API call - it should automatically refresh');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold">Token Refresh Test</h1>
                    <p className="text-gray-600 mt-2">Test automatic token refresh on 401 responses</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Test Controls */}
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={testTokenRefresh}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Testing...' : 'Test Token Refresh'}
                        </button>
                        <button
                            onClick={simulateExpiredToken}
                            disabled={loading}
                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                        >
                            Simulate Expired Token
                        </button>
                    </div>

                    {/* Logs */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Test Logs</h2>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-auto font-mono text-sm">
                            {logs.length === 0 ? (
                                <div className="text-gray-500">Click a button to start testing...</div>
                            ) : (
                                logs.map((log, i) => (
                                    <div key={i} className="mb-1">{log}</div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Test Instructions:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                            <li>First, make sure you're logged in</li>
                            <li>Click "Test Token Refresh" - should work normally</li>
                            <li>Click "Simulate Expired Token" to manually set an expired token</li>
                            <li>Then click "Test Token Refresh" again - should automatically refresh</li>
                            <li>Check the logs to see the refresh process in action</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}