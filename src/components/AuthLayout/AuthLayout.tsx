// components/AuthLayout.tsx
"use client";
import React from "react";
import Header from "../DashboardLayout/Header";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <div>{children}</div>
    </div>
  );
}
