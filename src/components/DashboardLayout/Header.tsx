"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSidebar } from "@/context/SidebarContext";
import { listMenuItems } from "@/constants/index";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const { logout, token, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    toast.success("Logout successfully.");
    setTimeout(() => {
      logout();
    }, 1000);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <header className="w-full h-16 bg-white text-gray-700 shadow-md px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Show sidebar toggle if logged in */}
        {isAuthenticated && (
          <button
            className="lg:hidden p-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        )}
        <span className="text-lg font-bold uppercase text-gray-800">App</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none"
              aria-label="User Menu"
            >
              <Image
                src="/images/user.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full cursor-pointer"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {listMenuItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.link}
                        className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 text-sm"
                        onClick={handleLinkClick}
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={20}
                          height={20}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="px-4 py-2">
                    <button
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 text-sm w-full cursor-pointer"
                      onClick={handleLogout}
                    >
                      <Image
                        src="/svgs/logout.svg"
                        alt="Logout Icon"
                        width={20}
                        height={20}
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
