"use client"
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { BiLogoBaidu } from "react-icons/bi";
import { useState } from "react";
import { useLogin } from "../hooks/useAuthMutations";
import { setCookie } from "cookies-next";
import { Toast } from "../components/Toast";
import { useRouter } from "next/navigation";
import { useOpenModalStore } from "../stores/layoutStore";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const loginMutation = useLogin();
  const { push } = useRouter();
    const { refetchCookies, setRefetchCookies } = useOpenModalStore();
  
  // Handle form submission
  const handleLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setCookie("token", data.accessToken, {
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
          });
          setCookie("userId", data.userId, {
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
          });
          setCookie("userRole", data?.userRole ?? "", {
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
          });
          setRefetchCookies((prev) => prev + 1);
          push('/');
        },
        onError: (error) => {
          console.log("Login failed:", error);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 4000);
        },
      }
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
         {error && (
            <Toast
              message="Login Fail , please recheck you account !"
              type="error"
              duration={4000}
              position="top-right"
            />
          )}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <div>
          <BiLogoBaidu className="text-4xl" />
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
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                onChange={(e) => {
                  setRememberMe(e.target.value === "true");
                }}
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
                href="#"
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
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
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
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              <img
                className="h-6 w-6"
                src="https://www.svgrepo.com/show/506498/google.svg"
                alt="Google"
              />
            </button>
            <button
              type="button"
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
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
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
      
      </div>
    </div>
  );
}
