"use client";

import { useState } from "react";
import React, { type FocusEvent } from "react";

import { TextField, InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface FormikTextFieldProps {
  name: string;
  placeholder: string;
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: React.ReactNode;
  type?: string;
}
export default function FormikTextField({
  name,
  placeholder,
  onBlur,
  onChange,
  error,
  helperText,
  type = "text",
}: FormikTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      fullWidth
      color="primary"
      placeholder={placeholder}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      error={error}
      type={type === "password" ? (showPassword ? "text" : "password") : "text"}
      sx={{ borderRadius: "50px" }}
      InputProps={{
        style: {
          borderRadius: "50px",
        },
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      helperText={helperText}
      FormHelperTextProps={{
        style: {
          fontSize: "14px",
        },
      }}
    />
  );
}
