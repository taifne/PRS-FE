"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaBars, FaTimes, FaChevronRight, FaCircle, FaChartArea, FaHeart, FaRegIdCard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "../../hooks/useRoleMutation";
import { getCookie } from "cookies-next";
import { useOpenModalStore } from "../../stores/layoutStore";
import { useAllMenus } from "../../hooks/useMenuMutation";
import { PiTabsDuotone, PiTreeViewFill } from "react-icons/pi";
import { AiOutlineDash } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { MdInsertEmoticon, MdInput, MdAnnouncement } from "react-icons/md";
import { SlDrawer } from "react-icons/sl";
import { AutocompleteIcon, PagnitionIcon, PopupIcon, StepperIcon, CustomTableIcon } from "../Icons";

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  badge?: number;
  subItems?: SidebarItem[];
}

interface SidebarTheme {
  background: string;
  text: string;
  activeBackground: string;
  activeText: string;
  hoverBackground: string;
  border?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  theme?: "light" | "dark" | SidebarTheme;
  collapsedWidth?: string;
  expandedWidth?: string;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onToggleCollapse?: (isCollapsed: boolean) => void;
  enableTouchGestures?: boolean;
  subMenuOpenDelay?: number;
  customSubMenuIcon?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  theme = "dark",
  collapsedWidth = "80px",
  expandedWidth = "260px",
  logo,
  showLogo = true,
  onToggleCollapse,
  enableTouchGestures = true,
  subMenuOpenDelay = 300,
  customSubMenuIcon,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [roleId, setRoleId] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  //const { refetchCookies, setRefetchCookies } = useOpenModalStore();
  const icons = [
    <AutocompleteIcon />,
    <PiTreeViewFill />,
    <FaHeart />,
    <FaRegIdCard />,
    <FaChartArea />,
    <SlDrawer />,
    <MdInsertEmoticon />,
    <MdInput />,
    <LuLoaderCircle />,
    <PagnitionIcon />,
    <PopupIcon />,
    <StepperIcon />,
    <CustomTableIcon />,
    <MdAnnouncement />,
    <AiOutlineDash />,
    <IoIosArrowDropdownCircle />,
    <PiTabsDuotone />,
  ];
  function getRandomIcon(icons: JSX.Element[]): JSX.Element {
    const index = Math.floor(Math.random() * icons.length);
    return icons[index];
  }

  const pathname = usePathname();
  const { data: role, isLoading, isError } = useRole(roleId);
  const { data: menus, isLoading: loadingMenus } = useAllMenus();
  // useEffect(() => {
  //   const userRoleCookie = getCookie("userRole")?.toString()??"";

  //   setRoleId(userRoleCookie);
  // }, [refetchCookies]);

  const filteredMenus = useMemo(() => {
    if (!role?.menus) return [];

    const roleMenuIds = role.menus.map((m) =>
      typeof m === 'string' ? m : m._id // handles both populated and non-populated
    );

    return menus?.filter((menu) => roleMenuIds.includes(menu._id)).map((menu) => ({
      label: menu.label,
      icon: getRandomIcon(icons),
      link: `http://localhost:8080/${menu.path}`,
      subItems: []
      // Optional: include subItems if you have hierarchical menus
    }));;
  }, [menus, role?.menus]);
  const themeConfig: SidebarTheme =
    typeof theme === "string"
      ? {
        light: {
          background: "bg-white dark:bg-gray-800",
          text: "text-gray-800 dark:text-gray-200",
          activeBackground: "bg-blue-100 dark:bg-blue-800",
          activeText: "text-blue-600 dark:text-blue-200",
          hoverBackground: "hover:bg-gray-100 dark:hover:bg-gray-700",
          border: "border-gray-200 dark:border-gray-700",
        },
        dark: {
          background: "bg-gray-900 dark:bg-gray-800",
          text: "text-gray-200 dark:text-gray-200",
          activeBackground: "bg-blue-800 dark:bg-blue-800",
          activeText: "text-blue-200 dark:text-blue-200",
          hoverBackground: "hover:bg-gray-800 dark:hover:bg-gray-700",
          border: "border-gray-700 dark:border-gray-700",
        },
      }[theme]
      : theme;

  // Add dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handler);
    return () => darkModeMediaQuery.removeEventListener("change", handler);
  }, []);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse?.(!isCollapsed);
    setOpenSubMenu(null);
  };

  const handleSubMenu = (link: string) => {
    if (openSubMenu === link) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(link);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!enableTouchGestures || !sidebarRef.current) return;

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) > 50) {
        setIsCollapsed(deltaX > 0 ? false : true);
      }
    };

    sidebarRef.current.addEventListener("touchstart", handleTouchStart);
    sidebarRef.current.addEventListener("touchend", handleTouchEnd);

    return () => {
      sidebarRef.current?.removeEventListener("touchstart", handleTouchStart);
      sidebarRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enableTouchGestures]);

  const isActiveLink = (link: string) => pathname === link;

  return (
    <motion.div
      ref={sidebarRef}
      className={`flex flex-col h-full shadow-xl transition-colors duration-300 
        ${themeConfig.background} ${themeConfig.text} 
        ${themeConfig.border ? `border-r ${themeConfig.border}` : ""}`}
      style={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
        minWidth: isCollapsed ? collapsedWidth : expandedWidth,
      }}
      initial={false}
      animate={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Enhanced Header */}
      {showLogo && (
        <motion.div
          className={`flex items-center p-4 border-none ${isCollapsed ? "justify-center" : "justify-between"
            }`}
        >
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold"
            >
              {logo || (
                <span className={`${themeConfig.activeText} tracking-wide`}>
                  MB-FIBAT
                </span>
              )}
            </motion.div>
          )}
          <button
            onClick={toggleCollapse}
            className={`p-2 rounded-lg transition-all ${isDarkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-600"
              }`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </motion.div>
      )}

      {/* Enhanced Menu Items */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-1 pb-4">
        <ul className="space-y-1">
          {filteredMenus?.map((item) => (
            <li key={item.link} className="relative">
              <Link href={item.link} passHref>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center rounded-lg p-3 cursor-pointer transition-all ${isActiveLink(item.link)
                      ? `${themeConfig.activeBackground} ${themeConfig.activeText}`
                      : themeConfig.hoverBackground
                    }`}
                  onClick={() => item.subItems && handleSubMenu(item.link)}
                >
                  <div className="flex items-center w-full space-x-3">
                    <span
                      className={`text-lg ${isActiveLink(item.link) ? "opacity-100" : "opacity-75"
                        }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 truncate text-sm font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}

                    {item.subItems && !isCollapsed && (
                      <motion.div
                        className="ml-auto"
                        animate={{ rotate: openSubMenu === item.link ? 90 : 0 }}
                      >
                        {customSubMenuIcon || (
                          <FaChevronRight className="text-sm opacity-75" />
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </Link>

              {/* Enhanced Subitems */}
              {item.subItems && (
                <AnimatePresence>
                  {openSubMenu === item.link && !isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-11 pt-1"
                    >
                      <ul className="space-y-1">
                        {/* {item.subItems.map((subItem) => (
                          <li key={subItem.link}>
                            <Link href={subItem.link} passHref>
                              <motion.div
                                className={`flex items-center rounded-lg p-2 text-sm ${
                                  isActiveLink(subItem.link)
                                    ? `${themeConfig.activeBackground} ${themeConfig.activeText}`
                                    : themeConfig.hoverBackground
                                }`}
                              >
                                <FaCircle className="w-2 h-2 mr-2 opacity-50" />
                                <span className="truncate">
                                  {subItem.label}
                                </span>
                              </motion.div>
                            </Link>
                          </li>
                        ))} */}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Enhanced Tooltips */}
      {isCollapsed && (
        <div className="absolute left-full ml-2">
          {items.map((item) => (
            <motion.div
              key={item.link}
              className="px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {item.label}
              {item.badge && (
                <span className="ml-2 px-2 py-1 bg-blue-500 rounded-full text-xs">
                  {item.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
