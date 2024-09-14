import * as Yup from "yup";

export const authValidationSchema = Yup.object().shape({
  name: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  industry: Yup.string(),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
});
