"use client";
import React, { type FocusEvent, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";

const PasswordInput = ({
  name,
  placeholder,
  error,
  value,
  onChange,
  onBlur,
}: {
  name: string;
  placeholder: string;
  error: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}) => {
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
      name={name}
      placeholder={placeholder}
      error={error}
      value={value}
      onChange={onChange}
      sx={{
        borderRadius: "50px",
      }}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              value={value}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        style: {
          borderRadius: "50px",
        },
      }}
      onBlur={onBlur}
    />
  );
};

export default PasswordInput;
