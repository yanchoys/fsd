"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

import { removeEmptyValues, toastNotifier } from "~/app/utils/helpers";
import { ActionButton } from "../authentication/common";
import type { IListingData } from "~/app/(application)/definitions";
import { SimpleInput } from "../common";
import { inquire } from "~/app/(application)/actions";
import type { IInquireArgs } from "~/app/(application)/definitions";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  phone: Yup.string()
    .min(8, "Enter a valid phone number")
    .required("This field is required"),
  message: Yup.string()
    .max(240, "Message is too long")
    .required("This field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
});

export default function InquireForm({
  listing,
  setOpen,
}: {
  listing?: IListingData;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );

  const formik = useFormik({
    initialValues: listing
      ? {
          propertyId: listing.id,
          propertySource: listing.source,
          name: "",
          email: "",
          phone: "",
          message: "",
        }
      : {
          name: "",
          email: "",
          phone: "",
          message: "",
        },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Submitting Message"),
  });
  return (
    <form
      action={async () => {
        const modifiedValues = removeEmptyValues(formik.values);
        const response = await inquire(modifiedValues as IInquireArgs);
        toastNotifier(response);
        setErrorMessage(typeof response === "string" ? response : undefined);
        formik.resetForm();
        if (setOpen && typeof response !== "string") {
          setOpen(false);
        }
      }}
    >
      <div className="flex flex-col gap-5">
        {listing ? (
          <div>
            <SimpleInput
              name="propertyId"
              disabled={true}
              defaultValue={`Property ID: ${listing.id}`}
            />
          </div>
        ) : null}
        <div>
          <SimpleInput
            name="name"
            placeholder="Name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && Boolean(formik.errors.name) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <SimpleInput
            name="email"
            placeholder="Email Address"
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          {formik.touched.email && Boolean(formik.errors.email) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <SimpleInput
            name="phone"
            placeholder="Phone number"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && Boolean(formik.errors.phone) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
          )}
        </div>
        <div>
          <textarea
            rows={4}
            name="message"
            placeholder="Message"
            onBlur={formik.handleBlur}
            value={formik.values.message}
            onChange={formik.handleChange}
            className="text block w-full rounded-lg bg-white p-2.5 text-[#676D73] focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73]"
          />
          {formik.touched.message && Boolean(formik.errors.message) && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.message}</p>
          )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {listing ? (
          <h1 className="text-justify text-sm font-normal	text-[#858C93]">
            By proceeding, you consent to receive calls and texts at the number
            you provided, including marketing by autodialer and prerecorded and
            artificial voice, and email, from realtor.com and about your inquiry
            and other home-related matters, but not as a condition of any
            purchase. You also agree to our Terms of Use, and to our Privacy
            Policy regarding the information relating to you. Msg/data rates may
            apply. This consent applies even if you are on a corporate, state or
            national Do Not Call list.
          </h1>
        ) : null}
        <ActionButton
          text={listing ? "Inquire now" : "Submit"}
          disabled={!formik.isValid || !formik.dirty}
          borderRadius={listing ? "rounded" : "rectangle"}
        />
      </div>
      <Toaster />
    </form>
  );
}
