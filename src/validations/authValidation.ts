import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Min 3 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["user", "admin"], "Invalid role")
    .required("Role is required"),
});
