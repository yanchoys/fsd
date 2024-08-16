"use client";

import React, { useRef, useState } from "react";
import { useFormState } from "react-dom";

import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/material/styles";
import { resendOtp, verifyAccount } from "~/app/(authentication)/actions";
import { ActionButton } from "./common";
import { resetPassOTP } from "~/app/(authentication)/actions";

function OTP({
  length,
  value,
  onChange,
}: {
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length }, () => null),
  );

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter]?.value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue!;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number,
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter]?.value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <div className="flex w-full justify-between">
      {new Array(length).fill(null).map((_, index) => (
        <BaseInput
          key={index}
          slots={{
            input: InputElement,
          }}
          placeholder="-"
          aria-label={`Digit ${index + 1} of OTP`}
          slotProps={{
            input: {
              ref: (ele) => {
                inputRefs.current[index] = ele!;
              },
              onKeyDown: (event) => handleKeyDown(event, index),
              onChange: (event) => handleChange(event, index),
              onClick: (event) => handleClick(event, index),
              onPaste: (event) => handlePaste(event, index),
              value: value[index] ?? "",
            },
          }}
        />
      ))}
    </div>
  );
}

export default function OTPForm({ type }: { type: "verify" | "reset" }) {
  const [otp, setOtp] = useState("");
  const verifyType = type === "verify" ? verifyAccount : resetPassOTP;
  const [errorOtp, dispatchOTP] = useFormState(verifyType, undefined);
  const [resendError, dispatchResendOTP] = useFormState(resendOtp, undefined);
  const [canResendOTP, setCanResendOTP] = useState(true);

  const resetTimer = () => {
    setCanResendOTP((prev) => !prev);

    setTimeout(() => {
      setCanResendOTP((prev) => !prev);
    }, 30000);
  };
  let userEmail = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage?.getItem("regEmail") ?? "";
  }

  return (
    <form
      action={() => {
        dispatchOTP({ code: otp, email: userEmail });
        localStorage?.setItem("otpCode", otp);
      }}
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-6">
        <OTP value={otp} onChange={setOtp} length={6} />
        {errorOtp && <p className="text-sm text-red-500">{errorOtp}</p>}
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Didn&apos;t receive code?
          <button
            disabled={!canResendOTP}
            onClick={async (e) => {
              e.preventDefault();
              resetTimer();
              dispatchResendOTP(userEmail);
            }}
            className="ml-2 text-[#212529] disabled:text-[#9FA4AA]"
          >
            Send Again
          </button>
        </div>
        {resendError && <p className="text-sm text-red-500">{resendError}</p>}
      </div>
      <ActionButton disabled={otp.length < 6} text="Verify Email" />
    </form>
  );
}

const InputElement = styled("input")(
  () => `
  width: 60px;
  height: 60px;
  font-size: 32px;
  font-weight: 500;
  line-height: 38px;
  padding: 8px 0px;
  border-radius: 12px;
  text-align: center;
  color: #1C2025;
  background: #fff;
  border: 1px solid #DAE2ED;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);

  &:hover {
    border-color: #29ABE2;
  }

  &:focus {
    border-color: #29ABE2;
    box-shadow: 0 0 0 3px #80BFFF;
  }
  &::placeholder {
    opacity: 0.8;
    color: #212529;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
