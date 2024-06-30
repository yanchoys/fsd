"use client";
import Image from "next/image";
import React from "react";
import VerificationInput from "react-verification-input";
import "./styles.css";
import Link from "next/link";

function AccountCreationCode() {
  const handleComplete = (e: string) => {
    console.log(e);
  };

  return (
    <div className="flex flex-col gap-20">
      <Image
        src="/cool_vacay_logo_blue.svg"
        alt="CoolVacay Logo"
        width={200}
        height={22}
        className="gap-10"
      />
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl">Enter the code</h1>
          <p className="text-[#9FA4AA]">
            {"To finish creating your account, enter the verification code ."}
          </p>
        </div>
        <VerificationInput
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
            characterFilled: "character",
          }}
          onComplete={(e) => handleComplete(e)}
        />
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Didn’t receive code?
          <Link className="ml-2 text-primary" href={"/signin"}>
            Send Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountCreationCode;
