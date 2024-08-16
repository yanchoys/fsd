"use client";

import { useFormState } from "react-dom";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { authenticateCR } from "~/app/(authentication)/actions";
import { FormikCheckBox, ActionButton } from "./common";
import { FormikTextField } from "../common";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email field is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password field is required"),
});

export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticateCR, undefined);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Validating credentials"),
  });

  if (typeof window !== "undefined") {
    localStorage.removeItem("regEmail");
    localStorage.removeItem("otpCode");
  }

  return (
    <>
      <form action={dispatch} className="flex flex-col gap-8">
        <div>
          <label htmlFor="email" className="mb-1 block text-lg font-medium">
            Email Address
          </label>
          <FormikTextField
            placeholder="Email Address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-lg font-medium">
            Password
          </label>
          <FormikTextField
            name="password"
            type="password"
            placeholder="Password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex items-center justify-between py-[14px]">
            {/* TODO:remember me functionality? */}
            <FormikCheckBox
              error={
                formik.touched.rememberMe && Boolean(formik.errors.rememberMe)
              }
              name="rememberMe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.rememberMe}
              label="Remember me"
            />
            <Link
              href="/forgotten-password"
              className="text-xs text-primary-grey300 hover:opacity-80 sm:text-sm sm:font-medium sm:tracking-wider"
            >
              Forgot your password?
            </Link>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
        <ActionButton
          disabled={!formik.isValid || !formik.dirty}
          text="Sign In"
        />
      </form>
    </>
  );
}
