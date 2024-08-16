"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput, IconGenerator } from "~/app/ui/components/common";
import BookingCompleted from "./BookingCompleted";
import { removeEmptyValues, toastNotifier } from "~/app/utils/helpers";
import { bookingPayment } from "~/app/(application)/actions";
import type { IBookingPaymentArgs } from "~/app/(application)/definitions";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { useFormContext } from "../FormContext";
import { userIdSchema, missingUserIdSchema } from "./validationSchemas";

export default function PaymentForm({
  userId,
  params,
}: {
  userId?: string;
  params: {
    source: string;
    id: string;
  };
}) {
  const { searchParamsValues } = useAppSearchParams();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );
  const { formData } = useFormContext();

  const formik = useFormik({
    initialValues: userId
      ? {
          userId: Number(userId),
          listingId: params.id,
          source: params.source,
          fromDate: searchParamsValues.fromDate?.format("YYYY-MM-DD"),
          toDate: searchParamsValues.toDate?.format("YYYY-MM-DD"),
          adults: Number(searchParamsValues.numberOfGuests),
          children: 0,
          infants: 0,
          pets: 0,
          cardDetails: {
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            cardHolderName: "",
          },
        }
      : {
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address1: formData.street,
          address2: "",
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          listingId: params.id,
          source: params.source,
          fromDate: searchParamsValues.fromDate?.format("YYYY-MM-DD"),
          toDate: searchParamsValues.toDate?.format("YYYY-MM-DD"),
          adults: Number(searchParamsValues.numberOfGuests),
          children: 0,
          infants: 0,
          pets: 0,
          cardDetails: {
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            cardHolderName: "",
          },
        },
    validationSchema: userId ? userIdSchema : missingUserIdSchema,
    onSubmit: () => console.log("Submitting"),
  });

  //TODO: refactor
  return paymentCompleted ? (
    <BookingCompleted />
  ) : (
    <form
      action={async () => {
        const allValues = {
          ...formik.values,
          cardDetails: {
            ...formik.values.cardDetails,
            cardNumber: formik.values.cardDetails.cardNumber.replace(/-/g, ""),
            expiryDate: formik.values.cardDetails.expiryDate.replace(
              /(\d{2})\/(\d{2})/,
              "$1/20$2",
            ),
          },
        };
        const { cardDetails, ...initialValuesWithoutCardDetails } = allValues;
        const modifiedValues = removeEmptyValues(
          initialValuesWithoutCardDetails,
        );

        const response = await bookingPayment({
          ...modifiedValues,
          cardDetails,
        } as IBookingPaymentArgs);

        const errorResponse = typeof response === "string";
        toastNotifier(response);
        setErrorMessage(errorResponse ? response : undefined);
        setPaymentCompleted(errorResponse ? false : true);
      }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-6">
        {!userId ? (
          <>
            <div className="flex gap-4">
              <div className="relative w-full">
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-lg font-medium"
                >
                  First Name<span className="absolute">*</span>
                </label>
                <SimpleInput
                  placeholder="First Name"
                  name="firstName"
                  required={true}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  variant="rounded"
                />
                {formik.touched.firstName &&
                  Boolean(formik.errors.firstName) && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.touched.firstName && formik.errors.firstName}
                    </p>
                  )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-lg font-medium"
                >
                  Last Name<span className="absolute">*</span>
                </label>
                <SimpleInput
                  placeholder="Last Name"
                  name="lastName"
                  required={true}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  variant="rounded"
                />
                {formik.touched.lastName && Boolean(formik.errors.lastName) && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.touched.lastName && formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="mb-1 block text-lg font-medium"
                >
                  Email<span className="absolute">*</span>
                </label>
                <SimpleInput
                  placeholder="Email"
                  name="email"
                  required={true}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  variant="rounded"
                />
                {formik.touched.email && Boolean(formik.errors.email) && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.touched.email && formik.errors.email}
                  </p>
                )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="phone"
                  className="mb-1 block text-lg font-medium"
                >
                  Phone<span className="absolute">*</span>
                </label>
                <SimpleInput
                  placeholder="Phone"
                  name="phone"
                  required={true}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  variant="rounded"
                />
                {formik.touched.phone && Boolean(formik.errors.phone) && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.touched.phone && formik.errors.phone}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : null}
        <div className="relative">
          <label
            htmlFor="cardDetails.cardNumber"
            className="mb-1 block text-lg font-medium"
          >
            Card Number<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="1234-1234-1234-1234"
            name="cardDetails.cardNumber"
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
              return formik.setFieldValue(
                "cardDetails.cardNumber",
                formattedInput,
              );
            }}
            value={formik.values.cardDetails.cardNumber}
            error={
              formik.touched.cardDetails?.cardNumber &&
              Boolean(formik.errors.cardDetails?.cardNumber)
            }
            variant="rounded"
          />
          <IconGenerator
            src="/credit-card.svg"
            width="24px"
            alt="Credit card icon"
            className="absolute right-8 top-[50px]"
          />
          {formik.touched.cardDetails?.cardNumber &&
            Boolean(formik.errors.cardDetails?.cardNumber) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.cardDetails?.cardNumber &&
                  formik.errors.cardDetails?.cardNumber}
              </p>
            )}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="cardDetails.expiryDate"
              className="mb-1 block text-lg font-medium"
            >
              Expiration Date<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="MM/YY"
              name="cardDetails.expiryDate"
              onBlur={formik.handleBlur}
              value={formik.values.cardDetails.expiryDate}
              maxLength={5}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                let formattedInput = "";
                if (input.length >= 2) {
                  const month = input.substring(0, 2);
                  if (parseInt(month) < 1 || parseInt(month) > 12) {
                    // If not a valid month, return early or set an error state
                    return;
                  }
                }
                for (let i = 0; i < input.length; i++) {
                  if (i % 2 === 0 && i > 0 && i < 3) {
                    formattedInput += "/";
                  }
                  formattedInput += input[i];
                }
                return formik.setFieldValue(
                  "cardDetails.expiryDate",
                  formattedInput,
                );
              }}
              error={
                formik.touched.cardDetails?.expiryDate &&
                Boolean(formik.errors.cardDetails?.expiryDate)
              }
              variant="rounded"
            />
            {formik.touched.cardDetails?.expiryDate &&
              Boolean(formik.errors.cardDetails?.expiryDate) && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.touched.cardDetails?.expiryDate &&
                    formik.errors.cardDetails?.expiryDate}
                </p>
              )}
          </div>
          <div className="w-full">
            <label
              htmlFor="cardDetails.cvc"
              className="mb-1 block text-lg font-medium"
            >
              CVV<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="CVV"
              name="cardDetails.cvc"
              value={formik.values.cardDetails.cvc}
              onBlur={formik.handleBlur}
              maxLength={3}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, "");
                return formik.setFieldValue("cardDetails.cvc", input);
              }}
              error={
                formik.touched.cardDetails?.cvc &&
                Boolean(formik.errors.cardDetails?.cvc)
              }
              variant="rounded"
            />
            {formik.touched.cardDetails?.cvc &&
              Boolean(formik.errors.cardDetails?.cvc) && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.touched.cardDetails?.cvc &&
                    formik.errors.cardDetails?.cvc}
                </p>
              )}
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="cardDetails.cardHolderName"
            className="mb-1 block text-lg font-medium"
          >
            Card Holder Name<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="Card Holder Name"
            name="cardDetails.cardHolderName"
            required={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cardDetails.cardHolderName}
            error={
              formik.touched.cardDetails?.cardHolderName &&
              Boolean(formik.errors.cardDetails?.cardHolderName)
            }
            variant="rounded"
          />
          {formik.touched.cardDetails?.cardHolderName &&
            Boolean(formik.errors.cardDetails?.cardHolderName) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.cardDetails?.cardHolderName &&
                  formik.errors.cardDetails?.cardHolderName}
              </p>
            )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
      <div className="mx-28 flex gap-4">
        <Link
          href={`/book/${params.source}/${params.id}/billing-address`}
          className="flex h-12 w-full items-center justify-center rounded-[100px] border border-[#ADB5BD] bg-white p-4 text-black hover:bg-black hover:text-white"
        >
          Back
        </Link>
        <ActionButton
          disabled={!formik.isValid || !formik.dirty}
          text="Book"
          type="small"
        />
      </div>
      <Toaster />
    </form>
  );
}
