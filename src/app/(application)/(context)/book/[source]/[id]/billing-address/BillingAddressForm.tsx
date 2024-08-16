"use client";

import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { MenuItem } from "@mui/material";

import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput, SimpleSelectInput } from "~/app/ui/components/common";
import { useFormContext } from "../FormContext";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import type { ICountries } from "~/app/(application)/definitions";

const ValidationSchema = Yup.object({
  street: Yup.string().required("Street field is required"),
  city: Yup.string().required("City field is required"),
  state: Yup.string().required("State field is required"),
  zip: Yup.string().required("Zip field is required"),
  country: Yup.string().required("Country field is required"),
});

export default function BillingAddressForm({
  params,
  allCountries,
}: {
  params: {
    source: string;
    id: string;
  };
  allCountries: ICountries[];
}) {
  const { formData, setFormData } = useFormContext();
  const { searchParams } = useAppSearchParams();
  const router = useRouter();

  const countries = useMemo(() => {
    return allCountries.map((country) => (
      <MenuItem key={country.name} value={country.name} dense>
        {country.name}
      </MenuItem>
    ));
  }, [allCountries]);

  const states = useMemo(() => {
    const usaCountry = allCountries.filter((country) => country.name === "USA");
    return usaCountry[0]?.states.map((state) => (
      <MenuItem key={state.id} value={state.name} dense>
        {state.name}
      </MenuItem>
    ));
  }, [allCountries]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      setFormData(values);
      router.push(
        `/book/${params.source}/${params.id}/payment?${searchParams.toString()}`,
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="street" className="mb-1 block text-lg font-medium sm:text-base">
            Street Address<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="Street Address"
            name="street"
            required={true}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.street}
            error={formik.touched.street && Boolean(formik.errors.street)}
            variant="rounded"
          />
          {formik.touched.street && Boolean(formik.errors.street) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.touched.street && formik.errors.street}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="aptNr" className="mb-1 block text-lg font-medium sm:text-base">
              Apt or Suite Number
            </label>
            <SimpleInput
              name="aptNr"
              placeholder="Apt or Suite Number"
              onChange={formik.handleChange}
              value={formik.values.aptNr}
              variant="rounded"
            />
          </div>
          <div className="w-full">
            <label htmlFor="city" className="mb-1 block text-lg font-medium sm:text-base">
              City<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="City"
              name="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              variant="rounded"
            />
            {formik.touched.city && Boolean(formik.errors.city) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.city && formik.errors.city}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="country" className="mb-1 block text-lg font-medium sm:text-base">
              Country<span className="absolute">*</span>
            </label>
            <SimpleSelectInput
              listOptions={countries}
              name="country"
              value={formik.values.country}
              onChange={(e) => formik.setFieldValue("country", e.target.value)}
              size="medium"
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
            />
            {formik.touched.country && Boolean(formik.errors.country) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.country && formik.errors.country}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="zip" className="mb-1 block text-lg font-medium sm:text-base">
              ZIP Code<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="ZIP Code"
              name="zip"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.zip}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              variant="rounded"
            />
            {formik.touched.zip && Boolean(formik.errors.zip) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.zip && formik.errors.zip}
              </p>
            )}
          </div>
        </div>
        {formik.values.country === "USA" && (
          <div className="w-full">
            <label htmlFor="state" className="mb-1 block text-lg font-medium sm:text-base">
              State<span className="absolute">*</span>
            </label>
            <SimpleSelectInput
              placeholder="Select State"
              name="state"
              listOptions={states}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("state", e.target.value)}
              value={formik.values.state}
              error={formik.touched.state && Boolean(formik.errors.state)}
              size="medium"
            />
            {formik.touched.state && Boolean(formik.errors.state) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.state && formik.errors.state}
              </p>
            )}
          </div>
        )}
      </div>
      <ActionButton
        disabled={!formik.isValid || formik.values.street === ""}
        text="Next"
      />
    </form>
  );
}
