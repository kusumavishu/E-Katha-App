import * as yup from "yup";

export const ErrorSchema = yup.object().shape({
  Name: yup.string().required("Name is required"),
  PhoneNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  Address: yup.string().required("Address is required"),
});
