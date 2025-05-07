"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../validations/authValidation";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginWithCredentials,
    onSuccess: () => router.push("/dashboard"),
    onError: () => alert("Login failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Fly-Inn
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => loginMutation.mutate(values)}
        >
          <Form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Field name="email" type="email" className="input-style" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Field name="password" type="password" className="input-style" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
