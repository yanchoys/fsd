"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { registerFollower } from "~/app/(application)/actions";
import { ActionButton } from "../../authentication";
import { toastNotifier } from "~/app/utils/helpers";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const ValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function NewsletterForm({
  isTextBlack = false,
}: {
  isTextBlack: boolean;
}) {
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async () => {
      const resp = await registerFollower(formik.values);
      toastNotifier(resp);
      setErrorMessage(typeof resp === "string" ? resp : undefined);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[screen]">
      <div
        className={`w-full flex-col items-center justify-center ${isTextBlack ? "text-black" : "text-white"} gap-4"} lg:flex-row lg:justify-center`}
      >
        <div className="flex flex-col gap-2 text-center">
          <h1
            className={`text-2xl font-medium lg:text-[36px] lg:leading-[40px]`}
          >
            Stay up-to-date on our deals.
          </h1>
          <h5 className={`text-xs lg:text-base`}>
            Curated tips, inspiration, and discounts for your next vacation.
          </h5>
        </div>
        <div
          className={`flex w-full items-center justify-center gap-2 pt-4 lg:gap-6`}
        >
          <input
            id="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
            className={`focus:shadow-outline appearance-none rounded-lg border px-4 py-2 leading-tight text-gray-700 shadow focus:outline-none w-[150px] lg:w-[285px]`}
          />
          <ActionButton
            text={isTextBlack ? "Subscribe now" : "Go"}
            disabled={!formik.isValid || !formik.dirty}
            borderRadius="rounded"
            className={`w-[130px] sm:w-[150px] rounded-lg bg-primary py-2 text-center text-white ${
              !formik.isValid || !formik.dirty ? "disabled:bg-gray-500" : ""
            }`}
          />
        </div>
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
      <Toaster />
    </form>
  );
}
