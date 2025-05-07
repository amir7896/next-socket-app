"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Providers } from "./providers";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import Loader from "@/components/Loader/Loader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { useRouter } from "next/navigation";
import React from "react";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }

    // Redirect to home page if user log in
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  if (loading) {
    return <Loader />;
  }

  return token ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <AppLayout>
              <ToastContainer position="top-center" autoClose={3000} />
              {children}
            </AppLayout>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
