"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ActionButton } from "../authentication/common";
import { SimpleInput } from "../common";
import { updatePassword } from "~/app/(application)/actions";
import type { IPassArgs } from "~/app/(application)/definitions";
import { PasswordCheckSchema } from "~/app/(authentication)/schemas";
import { toastNotifier } from "~/app/utils/helpers";
import { Toaster } from "react-hot-toast";

const ValidationSchema = PasswordCheckSchema.concat(
  Yup.object().shape({
    oldPassword: Yup.string().required("This field is required"),
  }),
);

export default function ChangePasswordForm({
  userId,
  setOpen,
}: {
  userId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined,
  );

  const formik = useFormik({
    initialValues: {
      userId: userId,
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Changing password"),
  });
  return (
    <form
      action={async () => {
        const modValues = Object.fromEntries(
          Object.entries(formik.values).filter(
            ([k, _]) => k !== "confirmPassword",
          ),
        );
        const response = await updatePassword(modValues as IPassArgs);
        toastNotifier(response);
        setErrorMessage(typeof response === "string" ? response : undefined);
        formik.resetForm();
        if (setOpen && typeof response !== "string") {
          setOpen(false);
        }
      }}
    >
      <div className="flex w-[350px] flex-col gap-5">
        <div className="relative">
          <label htmlFor="oldPassword" className="mb-1 block font-medium">
            Current Password
          </label>
          <SimpleInput
            name="oldPassword"
            placeholder="Your current password"
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            styles="h-[40px] border border-[#EAEAEF]"
            value={formik.values.oldPassword}
          />
          {formik.touched.oldPassword && Boolean(formik.errors.oldPassword) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.oldPassword}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="newPassword" className="mb-1 block font-medium">
            New Password
          </label>
          <SimpleInput
            name="newPassword"
            placeholder="New password"
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            onBlur={formik.handleBlur}
            type="password"
            onChange={formik.handleChange}
            styles="h-[40px] border border-[#EAEAEF]"
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && Boolean(formik.errors.newPassword) && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.newPassword}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="confirmPassword" className="mb-1 block font-medium">
            Confirm new password
          </label>
          <SimpleInput
            name="confirmPassword"
            placeholder="Confirm new password"
            variant="rectangle"
            styles="h-[40px] flex border border-[#EAEAEF]"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword) && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.confirmPassword}
              </p>
            )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        <div className="ml-32 flex gap-6">
          <button onClick={() => setOpen(false)} className="text-primary">
            Cancel
          </button>
          <ActionButton
            text="Save"
            disabled={!formik.isValid || !formik.dirty}
            borderRadius="rounded"
          />
        </div>
      </div>
      <Toaster />
    </form>
  );
}
