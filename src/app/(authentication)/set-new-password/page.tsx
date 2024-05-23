"use client";

import Image from "next/image";
import React, { useState } from "react";
import PasswordInput from "../../ui/components/PasswordInput/PasswordInput";
import { Formik, Form, type FormikHelpers } from "formik";
import Loader from "../../ui/components/common/Loader/loader";
import * as Yup from "yup";
import { Button } from "@mui/base";

export type LoginValue = {
  confirmPassword: string;
  password: string;
};

const initialValues: LoginValue = {
  confirmPassword: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match",
  ),
  password: Yup.string().required("Password is required"),
});

function SetNewPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: LoginValue,
    { setSubmitting }: FormikHelpers<LoginValue>,
  ) => {
    setLoading(true);
    setSubmitting(true);
    try {
      const resp = await fetch("http://localhost:5076/api/auth/access-token", {
        method: "POST",
        body: JSON.stringify({
          confirmPassword: values.confirmPassword,
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
  //TODO:refactor login page
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
          <h1 className="mb-4 text-3xl">Set a new password</h1>
          <p className="text-[#9FA4AA]">
            Yor new password must be different to previously used passwords.
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
                      htmlFor="password"
                      className="mb-1 block text-lg font-medium"
                    >
                      New Password
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
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1 block text-lg font-medium"
                    >
                      Confirm Password
                    </label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      error={
                        !!touched.confirmPassword && !!errors.confirmPassword
                      }
                      value={values.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setError("");
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                  <Button
                    className={`h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white disabled:opacity-50`}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    Save New Password
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

export default SetNewPassword;
