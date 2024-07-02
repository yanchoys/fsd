"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput } from "~/app/ui/components/common";
import Link from "next/link";
import { useState } from "react";
import BookingCompleted from "./BookingCompleted";
import { IconGenerator } from "~/app/ui/components/common";

const ValidationSchema = Yup.object({
  cardNumber: Yup.string().required("This field is required"),
  expiryDate: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-month",
      "The month must be between 01 and 12",
      function (value) {
        if (!value) return false;
        const month = value.substring(0, 2);
        const monthInt = parseInt(month, 10);
        return monthInt >= 1 && monthInt <= 12;
      },
    )
    .test("is-valid-year", "Enter a correct expiration date", function (value) {
      if (!value) return false;
      const currentYear = new Date().getFullYear() % 100;
      const year = value.substring(3, 5);
      const yearInt = parseInt(year, 10);
      return yearInt >= currentYear;
    }),
  cvv: Yup.string().required("This field is required"),
});

export default function PaymentForm({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => setPaymentCompleted(true),
  });
  //TODO: refactor
  return paymentCompleted ? (
    <BookingCompleted />
  ) : (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="street" className="mb-1 block text-lg font-medium">
            Card Number<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="1234-1234-1234-1234"
            name="cardNumber"
            required={true}
            onBlur={formik.handleBlur}
            maxLength={19}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              let formattedInput = "";
              for (let i = 0; i < input.length; i++) {
                if (i % 4 === 0 && i > 0) {
                  formattedInput += "-";
                }
                formattedInput += input[i];
              }
              return formik.setFieldValue("cardNumber", formattedInput);
            }}
            value={formik.values.cardNumber}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            variant="rounded"
          />
          <IconGenerator
            src="/credit-card.svg"
            width="24px"
            alt="Credit card icon"
            className="absolute right-8 top-[50px]"
          />
          {formik.touched.cardNumber && Boolean(formik.errors.cardNumber) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.touched.cardNumber && formik.errors.cardNumber}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="state" className="mb-1 block text-lg font-medium">
              Expiration Date<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="MM/YY"
              name="expiryDate"
              onBlur={formik.handleBlur}
              value={formik.values.expiryDate}
              maxLength={5}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                let formattedInput = "";
                // if (input.length >= 2) {
                //   const month = input.substring(0, 2);
                //   if (parseInt(month) < 1 || parseInt(month) > 12) {
                //     // If not a valid month, return early or set an error state
                //     return;
                //   }
                // }
                for (let i = 0; i < input.length; i++) {
                  if (i % 2 === 0 && i > 0) {
                    formattedInput += "/";
                  }
                  formattedInput += input[i];
                }
                return formik.setFieldValue("expiryDate", formattedInput);
              }}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              variant="rounded"
            />
            {formik.touched.expiryDate && Boolean(formik.errors.expiryDate) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.expiryDate && formik.errors.expiryDate}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="zip" className="mb-1 block text-lg font-medium">
              CVV<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="CVV"
              name="cvv"
              value={formik.values.cvv}
              onBlur={formik.handleBlur}
              maxLength={3}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                return formik.setFieldValue("cvv", input);
              }}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              variant="rounded"
            />
            {formik.touched.cvv && Boolean(formik.errors.cvv) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.cvv && formik.errors.cvv}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mx-28 flex gap-4">
        <Link
          href={`/book/${params.source}/${params.id}/billing-address`}
          className="flex h-12 w-full items-center justify-center rounded-[100px] border border-[#ADB5BD] bg-white p-4 text-black hover:bg-black hover:text-white"
        >
          Back
        </Link>
        {/* <Link
          href={
            paymentCompleted
              ? {}
              : `/book/${params.source}/${params.id}/payment`
          }
          className="h-12 w-full"
        > */}
        <ActionButton
          disabled={!formik.isValid || !formik.dirty}
          text="Book now"
          type="small"
        />
        {/* </Link> */}
      </div>
    </form>
  );
}
