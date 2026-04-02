// app/providers/AuthProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { axiosClient } from '../lib/axios/axios-client';

interface AuthProviderProps {
    children: React.ReactNode;
}

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password'];

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, checkAuth } = useAuth();
    const [isInitialized, setIsInitialized] = useState(false);

    // Check if current route is public
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route));

    // Check if it's the root path (should be accessible to everyone)
    const isRootPath = pathname === '/';

    // Check if it's a dashboard or protected route
    const isProtectedRoute = !isPublicRoute && !isRootPath;

    // Initialize axios client with logout callback
    useEffect(() => {
        axiosClient.initialize(() => {
            router.push('/login');
        });
    }, [router]);

    // Check authentication status on mount
    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
            setIsInitialized(true);
        };

        initAuth();
    }, [checkAuth]);

    // Handle route protection
    useEffect(() => {
        // Don't redirect while still loading or not initialized
        if (!isInitialized || isLoading) return;

        // Redirect unauthenticated users away from protected routes
        if (!isAuthenticated && isProtectedRoute) {
            router.push(`/login?redirect=${encodeURIComponent(pathname || '/')}`);
            return;
        }

        // Redirect authenticated users away from public routes (login, register, etc.)
        if (isAuthenticated && isPublicRoute) {
            const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
            router.push(redirectTo);
            return;
        }

        // Optional: If you want authenticated users on root to be redirected to dashboard
        // Uncomment this if you want root to redirect to dashboard for logged-in users
        // if (isAuthenticated && isRootPath) {
        //     router.push('/dashboard');
        //     return;
        // }

        // For all other cases (root path, or authenticated on protected routes), allow access
    }, [isAuthenticated, isLoading, isInitialized, pathname, router, isPublicRoute, isRootPath, isProtectedRoute]);

    // Only show loading spinner on protected routes while checking auth
    // For public routes and root, render children immediately
    if (!isInitialized && isProtectedRoute) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}