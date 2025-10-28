import * as yup from "yup";

export const RegistrationFormSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    username: yup.string().required("Username is required"),
    address1: yup.string().required("Address 1 is required"),
    address2: yup.string(),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    zipcode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Zip code must be 6 digits")
      .required("Zip code is required"),
  });
  