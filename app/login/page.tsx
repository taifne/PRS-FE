// app/login/page.tsx
'use client';

import { MdOutlineMail, MdPassword } from "react-icons/md";
import { BiLogoBaidu } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { setCookie } from "cookies-next";
import { Toast } from "../components/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserRoleStore } from "../stores/layoutStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission separately

  const { login, isLoading: authLoading } = useAuth();
  const { setRole } = useUserRoleStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  // For login page, we don't want to show loading from auth check
  // Only show loading when actually submitting
  const isLoading = isSubmitting;

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({ email, password, rememberMe });

      if (result.success && result.data) {
        const { user, refreshToken } = result.data;

        // Map role from API response to UserRole type
        let userRole: "admin" | "staff" | "common" = "common";

        if (user.role && user.role.length > 0) {
          const roleName = user.role[0].name.toLowerCase();
          if (roleName === 'admin') {
            userRole = "admin";
          } else if (roleName === 'staff') {
            userRole = "staff";
          }
        }

        console.log('Login successful, setting cookies...');
        console.log('Refresh token exists:', !!refreshToken);
        console.log('User ID:', user.id);
        console.log('User role:', userRole);

        // Update role store
        setRole(userRole);

        // Set cookies with correct names
        setCookie("refresh_token", refreshToken, {
          path: '/',
          maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
          sameSite: 'lax',
        });

        setCookie("userId", user.id, {
          path: '/',
          maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
          sameSite: 'lax',
        });

        setCookie("userRole", userRole, {
          path: '/',
          maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
          sameSite: 'lax',
        });

        // Small delay to ensure cookies are written
        setTimeout(() => {
          console.log('=== VERIFYING COOKIES AFTER SET ===');
          console.log('All cookies:', document.cookie);
          console.log('Has refresh_token:', document.cookie.includes('refresh_token'));
          console.log('Has userId:', document.cookie.includes('userId'));
          console.log('Has userRole:', document.cookie.includes('userRole'));

          // Log individual cookie values
          const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
          };

          console.log('refresh_token value:', getCookie('refresh_token')?.substring(0, 50) + '...');
          console.log('userId value:', getCookie('userId'));
          console.log('userRole value:', getCookie('userRole'));
        }, 100);

        console.log('Redirecting to:', redirect);

        // Use window.location for full page reload
        window.location.href = redirect;

      } else {
        setErrorMessage("Invalid email or password. Please try again.");
        setError(true);
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 4000);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage("An error occurred. Please try again.");
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 4000);
      setIsSubmitting(false);
    }
  };

  // Don't show loading spinner from auth check on login page
  // Just show the form normally
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <Toast
          message={errorMessage || "Login Failed, please check your account!"}
          type="error"
          duration={4000}
          position="top-right"
        />
      )}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <div>
          <BiLogoBaidu className="text-4xl mx-auto text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="relative mb-4">
              <MdOutlineMail className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-20" />
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={isLoading}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <MdPassword className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 z-20" />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            disabled={isLoading}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
          >
            <img
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/506498/google.svg"
              alt="Google"
            />
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
          >
            <img
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
            />
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}