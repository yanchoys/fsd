"use client";

import { Input } from "@mui/base";

interface SimpleInputProps {
  name: string;
  placeholder?: string;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  type?: string;
  disabled?: boolean;
  defaultValue?: string | null;
  styles?: string;
  variant?: "rectangle" | "rounded";
  required?: boolean;
  value?: string;
  maxLength?: number;
}
export default function SimpleInput({
  name,
  placeholder,
  onBlur,
  onChange,
  error,
  disabled = false,
  defaultValue,
  required,
  value,
  type = "text",
  styles,
  variant = "rectangle",
  maxLength = undefined,
}: SimpleInputProps) {
  const isRectangleVariant = variant === "rectangle";
  return (
    <Input
      color="primary"
      placeholder={placeholder}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      type={type}
      value={value}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      slotProps={{
        input: {
          maxLength: maxLength,
          className: `block w-full rounded-${isRectangleVariant ? "lg" : "full"} p-${isRectangleVariant ? "2.5" : "4"} focus:outline-[#29ABE2] disabled:bg-[#E7E7E7] disabled:text-[#676D73] ${styles} ${isRectangleVariant ? "" : "border border-[#EAEAEF]"}`,
        },
      }}
    />
  );
}
