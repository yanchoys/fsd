"use client";

import React from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Button } from "@mui/base";
import Image from "next/image";

export type ForgottenPasswordValue = {
  email: string;
};

const initialValues: ForgottenPasswordValue = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

function ForgottenPassword() {
  const handleSubmit = async (
    values: ForgottenPasswordValue,
    { setSubmitting }: FormikHelpers<ForgottenPasswordValue>,
  ) => {
    setSubmitting(true);
    try {
      const resp = await fetch(
        "http://localhost:5076/api/users/forgot-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
          }),
        },
      );

      console.log(resp);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 className="mb-4 text-3xl">Forgot password?</h1>
          <p className="text-[#9FA4AA]">
            {
              "Enter your email address and we'll send you a code to set your password."
            }
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
              return (
                <Form className="flex flex-col gap-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-lg font-medium"
                    >
                      Email Address
                    </label>
                    <TextField
                      fullWidth
                      placeholder="Email"
                      name="email"
                      error={touched.email && !!errors.email}
                      value={values.email}
                      InputProps={{
                        style: {
                          borderRadius: "50px",
                        },
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      id="outlined-start-adornment"
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600">{errors.email}</div>
                    ) : null}
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
      </div>
    </div>
  );
}

export default ForgottenPassword;
