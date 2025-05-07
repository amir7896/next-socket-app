// components/DashboardLayout.tsx
"use client";

import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar (fixed) */}
        <Sidebar />
        {/* Main content container */}
        <div className="flex-1 flex flex-col h-full">
          {/* Header  */}
          <div className="fixed top-0 right-0 z-10 w-full lg:left-64 lg:w-[calc(100%-16rem)]">
            <Header />
          </div>

          {/* Scrollable content below header */}
          <main className="mt-[64px] p-6  h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
