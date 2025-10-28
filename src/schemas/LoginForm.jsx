import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  