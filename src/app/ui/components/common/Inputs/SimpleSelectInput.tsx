"use client";

import { Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { IconGenerator } from "../IconGenerator";
import React from "react";

interface SimpleSelectInputProps {
  value?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  listOptions: React.ReactNode | JSX.Element[];
  size?: "small" | "medium";
  error?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: "rounded" | "rectangle";
}

const SimpleSelectInput: React.FC<SimpleSelectInputProps> = ({
  name,
  value,
  listOptions,
  size = "small",
  onBlur,
  onChange,
  error,
  placeholder,
  disabled,
  variant = "rounded",
}) => {
  const isSmallSize = size === "small";
  const isRoundedVariant = variant === "rounded";

  const selectStyles = {
    padding: "0px !important",
    fontSize: isSmallSize ? "14px" : "16px",
    backgroundColor: isSmallSize ? "#EAF7FD" : "#fff",
    fontWeight: 400,
    height: isSmallSize ? "36px" : !isRoundedVariant ? "39px" : "58px",
    borderRadius: isRoundedVariant ? "300px" : "8px",
    "& .MuiInputBase-input": {
      "&:focus": {
        borderRadius: isRoundedVariant ? "300px" : "8px",
        borderColor: "#29ABE2",
        padding: isSmallSize
          ? "9px 14px"
          : isRoundedVariant
            ? "18px 14px"
            : "9px 14px",
        boxShadow: "0 0 0 0.1rem #29ABE2",
      },
    },
    "& .Mui-disabled": {
      padding: isSmallSize
        ? "9px 14px"
        : isRoundedVariant
          ? "18px 14px"
          : "9px 14px",
      backgroundColor: "#E7E7E7",
      borderRadius: "6px",
      WebkitTextFillColor: "#676D73",
    },
  };

  return (
    <div
      className={`relative ${isSmallSize ? "max-w-[220px]" : "w-full"} ${isRoundedVariant ? "rounded-[300px]" : "rounded-lg"} border border-[#EAEAEF]`}
    >
      <Select
        fullWidth
        value={value}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        label="Nationality"
        onChange={onChange}
        IconComponent={() => (
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            width={isSmallSize ? "18px" : "22px"}
            className={`pointer-events-none absolute ${isSmallSize ? "right-2 top-[11px]" : isRoundedVariant ? "right-4 top-[18px]" : "right-3 top-[10px]"}`}
          />
        )}
        sx={selectStyles}
        labelId={`${name}-select-label`}
        id={`${name}-select`}
      >
        {listOptions}
      </Select>
    </div>
  );
};

export default SimpleSelectInput;
