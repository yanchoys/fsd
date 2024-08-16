"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import OTPForm from "~/app/ui/components/authentication/OTPForm";

export default function Page() {
  let userEmail = "";
  if (typeof window !== "undefined") {
    userEmail = localStorage?.getItem("regEmail") ?? "";
  }
  if (userEmail === "") {
    redirect("/forgotten-password");
  }
  return (
    <div className="flex w-full flex-col gap-[170px]">
      <div className="w-full">
        <Link href="/" className="text-left">
          <Image
            src="/cool_vacay_logo_blue.svg"
            alt="CoolVacay Logo"
            width={200}
            height={22}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="mb-3 text-3xl">Password reset</h1>
          <p className="text-[#9FA4AA]">We sent a code to {userEmail}</p>
        </div>
        <div className="flex flex-col">
          <OTPForm type="reset" />
        </div>
      </div>
    </div>
  );
}
