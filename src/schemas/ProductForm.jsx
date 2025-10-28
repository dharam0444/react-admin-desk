import * as yup from "yup";

export const ProductFormSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  image: yup.string().url("Enter a valid image URL").required("Image is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  brand: yup.string().required("Brand is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
});
