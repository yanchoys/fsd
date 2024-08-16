import * as Yup from "yup";

const cardDetailsSchema = Yup.object().shape({
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
  cvc: Yup.string()
    .required("This field is required")
    .min(3, "CVV must be 3 characters"),
  cardHolderName: Yup.string().required("This field is required"),
});

export const userIdSchema = Yup.object().shape({
  cardDetails: cardDetailsSchema,
});

export const missingUserIdSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  phone: Yup.string()
    .min(8, "Enter a valid phone number")
    .required("This field is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("This field is required"),
  cardDetails: cardDetailsSchema,
});
