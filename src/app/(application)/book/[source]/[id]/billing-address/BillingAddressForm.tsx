"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ActionButton } from "~/app/ui/components/authentication";
import { SimpleInput } from "~/app/ui/components/common";
import { useFormContext } from "../FormContext";
import { useRouter } from "next/navigation";

const ValidationSchema = Yup.object({
  street: Yup.string().required("Street field is required"),
  city: Yup.string().required("City field is required"),
  state: Yup.string().required("State field is required"),
  zip: Yup.string().required("Zip field is required"),
  country: Yup.string().required("Country field is required"),
});

export default function BillingAddressForm({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const { formData, setFormData } = useFormContext();
  const router = useRouter();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      setFormData(values);
      router.push(`/book/${params.source}/${params.id}/payment`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="street" className="mb-1 block text-lg font-medium">
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
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="aptNr" className="mb-1 block text-lg font-medium">
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
            <label htmlFor="city" className="mb-1 block text-lg font-medium">
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
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="state" className="mb-1 block text-lg font-medium">
              State<span className="absolute">*</span>
            </label>
            <SimpleInput
              placeholder="State"
              name="state"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.state}
              error={formik.touched.state && Boolean(formik.errors.state)}
              variant="rounded"
            />
            {formik.touched.state && Boolean(formik.errors.state) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.touched.state && formik.errors.state}
              </p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="zip" className="mb-1 block text-lg font-medium">
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
        <div>
          <label htmlFor="country" className="mb-1 block text-lg font-medium">
            Country<span className="absolute">*</span>
          </label>
          <SimpleInput
            placeholder="Country"
            name="country"
            variant="rounded"
            onBlur={formik.handleBlur}
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
          />
          {formik.touched.country && Boolean(formik.errors.country) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.touched.country && formik.errors.country}
            </p>
          )}
        </div>
      </div>
      <ActionButton disabled={!formik.isValid || !formik.dirty} text="Next" />
    </form>
  );
}
