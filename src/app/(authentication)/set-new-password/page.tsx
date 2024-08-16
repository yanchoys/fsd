import Image from "next/image";
import Link from "next/link";
import SetNewPasswordForm from "~/app/ui/components/profile/SetNewPasswordForm";

export default function SetNewPassword() {
  return (
    <div className="flex flex-col gap-20">
      <Link href="/" className="w-[200px]">
        <Image
          src="/cool_vacay_logo_blue.svg"
          alt="CoolVacay Logo"
          width={200}
          height={22}
          className="gap-10"
        />
      </Link>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Set a new password</h1>
          <p className="text-[#9FA4AA]">
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <SetNewPasswordForm />
      </div>
    </div>
  );
}
