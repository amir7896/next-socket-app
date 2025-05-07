"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../../validations/authValidation";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
  const router = useRouter();
  const { registerWithCredentials } = useAuth();

  const registerMutation = useMutation({
    mutationFn: registerWithCredentials,
    onSuccess: () => router.push("/auth/login"),
    onError: () => alert("Registration failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create a Fly-Inn Account
        </h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            role: "user",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => registerMutation.mutate(values)}
        >
          <Form className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <Field name="username" className="input-style" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
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
            <div>
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              <Field as="select" name="role" className="input-style">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
