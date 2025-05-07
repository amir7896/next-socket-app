"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Providers } from "./providers";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Loader from "@/components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// Define public routes
const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register", "/services/blogs"];

function LayoutSwitcher({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // Redirect unauthenticated user if accessing private route
  useEffect(() => {
    if (!loading && !token && !isPublicRoute) {
      router.push("/auth/login");
    }
  }, [loading, token, pathname]);

  if (loading) return <Loader />;

  // Show dashboard layout for authenticated + private route
  if (token && !isPublicRoute) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Show auth layout for public routes or unauthenticated
  return <AuthLayout>{children}</AuthLayout>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <ToastContainer position="top-center" autoClose={3000} />
            <LayoutSwitcher>{children}</LayoutSwitcher>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
