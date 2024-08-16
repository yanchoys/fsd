import Image from "next/image";
import Link from "next/link";
import { ForgotPasswordForm } from "~/app/ui/components/authentication";

function ForgottenPassword() {
  return (
    <div className="flex flex-col gap-20">
      <Link href="/" className="w-[200px]">
        <Image
          src="/cool_vacay_logo_blue.svg"
          alt="CoolVacay Logo"
          width={200}
          height={22}
        />
      </Link>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Forgot password?</h1>
          <p className="text-[#9FA4AA]">
            {
              "Enter your email address and we'll send you a code to set your password."
            }
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgottenPassword;
