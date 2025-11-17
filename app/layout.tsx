"use client";

import localFont from "next/font/local";
import "./globals.css";
import Sidebar, { SidebarItem } from "./components/SideBar";
import { MdAnnouncement, MdInput, MdInsertEmoticon } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { SlDrawer } from "react-icons/sl";
import { cookies } from "next/headers";

import {
  AutocompleteIcon,
  CustomTableIcon,
  PagnitionIcon,
  PopupIcon,
  StepperIcon,
  UserIcon,
} from "./components/Icons";
import {
  FaHeart,
  FaChartArea,
  FaRegIdCard,
} from "react-icons/fa";
import Breadcrumb, { BreadcrumbItem } from "./components/Breadcrumb";
import Navbar from "./components/NavBar";
import { Suspense, useEffect, useMemo, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import { ThemeProvider } from "next-themes";
import { PiTabsDuotone, PiTreeViewFill } from "react-icons/pi";
import { AiOutlineDash, AiOutlineLoading3Quarters } from "react-icons/ai";
import { QueryClient, QueryClientProvider } from "react-query";
import {  getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';


import {
  useOpenModalStore,
  useThemeStore,
  useUserRoleStore,
} from "./stores/layoutStore";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
const generateBreadcrumbItems = (path: string): BreadcrumbItem[] => {
  const segments = path.split("/").filter(Boolean); 
  let fullPath = "";
  
  return segments.map((segment, index) => {
    fullPath += `/${segment}`;
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1), 
      link: index !== segments.length - 1 ? fullPath : undefined, 
    };
  });
};

const commonUserItems: SidebarItem[] = [
  {
    label: "AutoComplete",
    icon: <AutocompleteIcon />,
    link: "/docs/autocomplete",
  },
  { label: "TreeView", icon: <PiTreeViewFill />, link: "/docs/treeview" },
  {
    label: "Button",
    icon: <FaHeart />,
    link: "/docs/button",
  },
  { label: "Card", icon: <FaRegIdCard />, link: "/docs/card" },
  { label: "Chart", icon: <FaChartArea />, link: "/docs/chart" },
  { label: "Drawer", icon: <SlDrawer />, link: "/docs/drawer" },
  { label: "Icons", icon: <MdInsertEmoticon />, link: "/docs/icons" },
  { label: "Input", icon: <MdInput />, link: "/docs/input" },
  { label: "Loading", icon: <LuLoaderCircle />, link: "/docs/loading" },
  { label: "Pagnition", icon: <PagnitionIcon />, link: "/docs/pagnition" },
  { label: "Popup", icon: <PopupIcon />, link: "/docs/popup" },
  { label: "Stepper", icon: <StepperIcon />, link: "/docs/stepper" },
  { label: "Table", icon: <CustomTableIcon />, link: "/docs/table" },
  { label: "Toast", icon: <MdAnnouncement />, link: "/docs/toast" },
  { label: "Breadcrumb", icon: <AiOutlineDash />, link: "/docs/breadcrumb" },
  {
    label: "Dropdown",
    icon: <IoIosArrowDropdownCircle />,
    link: "/docs/dropdown",
  },
  { label: "Tab", icon: <PiTabsDuotone />, link: "/docs/tabs" },
];
const adminItems: SidebarItem[] = [
  { label: "Users", icon: <SlDrawer />, link: "/admin/users" },
  { label: "Orders", icon: <MdInsertEmoticon />, link: "/admin/orders" },
];
const staffItems: SidebarItem[] = [
  { label: "Medicines", icon: <SlDrawer />, link: "/medicines" },
  { label: "Supliers", icon: <MdInsertEmoticon />, link: "/supliers" },
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const { refetchCookies, setRefetchCookies } = useOpenModalStore();
  const { theme, toggleTheme } = useThemeStore();
  const { role, setRole } = useUserRoleStore();
  // Get a cookie
  const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);
  const currentPage = usePathname();
  const breadcrumbItems = [{ label: "Home", link: "/" }, ...generateBreadcrumbItems(currentPage)];
  const { push } = useRouter();
  useEffect(() => {
    const userRoleCookie = getCookie("userRole")?.toString();
    const userRole =
      userRoleCookie === "admin"
        ? "admin"
        : userRoleCookie === "staff"
        ? "staff"
        : "common";
    setRole(userRole);
  }, [refetchCookies]);
  const userToken = useMemo(() => {
    const token = getCookie("token");

    return token?.toString() ?? "";
  }, [refetchCookies]);

  const sideBarItems = useMemo(() => {
    switch (role) {
      case "admin":
        return adminItems; // Corrected: Should return admin-specific items
      case "staff":
        return staffItems; // Corrected: Should return staff-specific items
      case "common":
      default:
        return commonUserItems; // Common user fallback
    }
  }, [role]);
  if (!isHydrated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <AiOutlineLoading3Quarters className="animate-spin text-indigo-600 dark:text-indigo-400 text-4xl" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            Preparing the app...
          </p>
        </div>
      </div>
    );
  return (
    <html lang="en">
      <head>
        <title>MbFibat</title>
          <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900`}
      >
        {/* ✅ Moved providers inside <body> to fix hydration error */}
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryClientProvider client={queryClient}>
            <div className="flex min-h-screen overflow-hidden fixed h-screen w-full">
              {userToken ? (
                <>
                  {/* Sidebar */}
                  <Sidebar
                    items={sideBarItems}
                    showLogo={true}
                    theme={theme}
                    expandedWidth="280px"
                    collapsedWidth="50px"
                    enableTouchGestures
                    customSubMenuIcon={<UserIcon />}
                  />
                  {/* Main Content */}
                  <div className="flex flex-col flex-grow h-full overflow-auto w-full">
                    <header className="mx-auto overflow-scroll no-scrollbar  w-full  sticky top-0 z-50">
                      <Navbar
                        theme={theme}
                        searchPlaceholder="Search..."
                        notificationCount={3}
                        onThemeChange={(isdark: boolean) => toggleTheme()}
                        userMenuItems={[
                          {
                            label: "Profile",
                            action: () => console.log("Profile clicked"),
                          },
                          {
                            label: "Settings",
                            action: () => console.log("Settings clicked"),
                          },
                          {
                            label: "Logout",
                            action: () => {
                              deleteCookie("token");
                              deleteCookie("userRole");
                              setRefetchCookies((prev) => prev + 1);
                              push("/login");
                            },
                          },
                        ]}
                      >
                        <Breadcrumb
                          items={breadcrumbItems}
                          separator=">"
                          linkClass="text-blue-600 hover:text-blue-800"
                          activeClass="text-gray-800 font-semibold"
                          separatorClass="mx-2 text-gray-500"
                        />
                      </Navbar>
                    </header>
                    <main className="mx-auto overflow-scroll no-scrollbar   w-full mt-[63px]">
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<LoadingSpinner />}>
                          {children}
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col flex-grow h-full overflow-auto w-full">
                    <main
                      className={`mx-auto overflow-scroll no-scrollbar px-1 w-full ${
                        userToken ? "mt-20" : "mt-0"
                      }`}
                    >
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<LoadingSpinner />}>
                          {children}
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                  </div>
                </>
              )}
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
