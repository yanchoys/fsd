"use client";

import React, { type FocusEvent } from "react";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";

interface FormikCheckBoxProps {
  name: string;
  label: string;
  checked: boolean;
  onBlur: (e: FocusEvent<HTMLButtonElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText?: string;
}
export default function FormikCheckBox({
  error,
  name,
  onChange,
  onBlur,
  label,
  helperText,
  checked,
}: FormikCheckBoxProps) {
  return (
    <FormControl error={error}>
      <FormControlLabel
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
          <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
            {label}
          </Typography>
        }
      />
      {error && helperText && (
        <FormHelperText sx={{ fontSize: "14px" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
