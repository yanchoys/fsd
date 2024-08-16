"use client";

import React, { type FocusEvent } from "react";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface FormikCheckBoxProps {
  name: string;
  label: string;
  checked: boolean;
  onBlur: (e: FocusEvent<HTMLButtonElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText?: string;
  noreferrerLink?: boolean;
}
export default function FormikCheckBox({
  error,
  name,
  noreferrerLink,
  onChange,
  onBlur,
  label,
  helperText,
  checked,
}: FormikCheckBoxProps) {
  return (
    <FormControl error={error}>
      <div className="flex items-center">
        <FormControlLabel
          sx={{ width: noreferrerLink ? "40px" : "auto", m: 0 }}
          control={
            <Checkbox
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              checked={checked}
              size="small"
              sx={{
                color: "#EAEAEF",
                "&.Mui-checked": {
                  color: "#29ABE2",
                },
              }}
            />
          }
          label={
            noreferrerLink ? (
              ""
            ) : (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {label}
              </Typography>
            )
          }
        />
        {noreferrerLink ? (
          <Link
            href="/privacy-policy"
            rel="noopener noreferrer"
            target="_blank"
            className="font-medoum text-sm underline decoration-solid"
          >
            {label}
          </Link>
        ) : null}
      </div>
      {error && helperText && (
        <FormHelperText sx={{ fontSize: "14px" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
