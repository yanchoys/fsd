"use client";

import Image from "next/image";
import React, { useState } from "react";
import PasswordInput from "../../ui/components/PasswordInput/PasswordInput";
import { Formik, Form, type FormikHelpers } from "formik";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Loader from "../../ui/components/common/Loader/loader";
import * as Yup from "yup";
import { Button } from "@mui/base";
import Link from "next/link";
import { Divider } from "@mui/material";

export type LoginValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  areConditionsAccepted: boolean;
};

const initialValues: LoginValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  areConditionsAccepted: false,
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  areConditionsAccepted: Yup.boolean().oneOf([true], "Field must be checked"),
});

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useState<boolean>(false); //used only for backend response display

  // const displayError = (
  //   touched: FormikTouched<LoginValue>,
  //   error: FormikErrors<LoginValue>,
  // ) => {
  //   let message = "";

  //   if (touched.email && error.email) message = error.email;
  //   if (touched.password && error.password) message = error.password;
  //   if (touched.email && error.email && touched.password && error.password)
  //     message = "Please enter valid email and password";

  //   return message;
  // };

  const handleSubmit = async (
    values: LoginValue,
    { setSubmitting }: FormikHelpers<LoginValue>,
  ) => {
    setLoading(true);
    setSubmitting(true);
    try {
      const resp = await fetch("http://localhost:5076/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          firstName:
            values.firstName.charAt(0).toUpperCase() +
            values.firstName.slice(1).toLowerCase(),
          lastName:
            values.lastName.charAt(0).toUpperCase() +
            values.lastName.slice(1).toLowerCase(),
          email: values.email,
          password: values.password,
        }),
      });

      console.log(resp);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-20">
      <Image
        src="/cool_vacay_logo_blue.svg"
        alt="CoolVacay Logo"
        width={200}
        height={22}
        className="gap-10"
      />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Create an account</h1>
          <p className="text-[#9FA4AA]">
            {"Don't miss out on the benefits, sign up now!"}
          </p>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              isValid,
              isSubmitting,
            }) => {
              console.log([touched.password, errors.password]);
              return (
                <Form className="flex flex-col gap-8">
                  <div className="flex w-full justify-between">
                    <div className="w-[48%]">
                      <label
                        htmlFor="firstName"
                        className="mb-1 block text-lg font-medium"
                      >
                        First Name
                      </label>
                      <TextField
                        placeholder="First Name"
                        name="firstName"
                        className="w-full"
                        error={touched.firstName && !!errors.firstName}
                        value={values.firstName}
                        InputProps={{
                          style: {
                            borderRadius: "50px",
                          },
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setError("");
                        }}
                        id="outlined-start-adornment"
                        onBlur={handleBlur}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="text-red-600">{errors.firstName}</div>
                      ) : null}
                    </div>
                    <div className="w-[48%]">
                      <label
                        htmlFor="lastName"
                        className="mb-1 block text-lg font-medium"
                      >
                        Last Name
                      </label>
                      <TextField
                        placeholder="Last Name"
                        name="lastName"
                        className="w-full"
                        error={touched.lastName && !!errors.lastName}
                        value={values.lastName}
                        InputProps={{
                          style: {
                            borderRadius: "50px",
                          },
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setError("");
                        }}
                        id="outlined-start-adornment"
                        onBlur={handleBlur}
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="text-red-600">{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-lg font-medium"
                    >
                      Email Address
                    </label>
                    <TextField
                      fullWidth
                      name="email"
                      placeholder="Email Address"
                      error={touched.email && !!errors.email}
                      value={values.email}
                      InputProps={{
                        style: {
                          borderRadius: "50px",
                        },
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setError("");
                      }}
                      id="outlined-start-adornment"
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600">{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-lg font-medium"
                    >
                      Password
                    </label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      error={!!touched.password && !!errors.password}
                      value={values.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setError("");
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-600">{errors.password}</div>
                    ) : null}
                    <div className="flex items-center justify-start gap-2">
                      <Checkbox
                        name="areConditionsAccepted"
                        checked={values.areConditionsAccepted}
                        color={"primary"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setError("");
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <h1>I agree to the Terms & Privacy</h1>
                    </div>
                  </div>
                  <Button
                    className={`h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white disabled:opacity-50`}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    Sign Up
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Divider className="text-[#9FA4AA]">Or connect with</Divider>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Already have an account?
          <Link className="ml-2 text-primary" href={"/signin"}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
