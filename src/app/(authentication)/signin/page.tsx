import Image from "next/image";
import Link from "next/link";
import SignInForm from "~/app/ui/components/authentication/SignInForm";
import { auth } from "~/auth";
import { redirect } from "next/navigation";
import OAuthProviders from "~/app/ui/components/authentication/OAuthProviders";

export default async function SignIn() {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-20">
      <div className="w-full">
        <Link href="/" className="text-left">
          <Image
            src="/cool_vacay_logo_blue.svg"
            alt="CoolVacay Logo"
            className="w-[140px] sm:w-[200px]"
            width={0}
            height={0}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 sm:gap-8">
        <div>
          <h1 className="mb-4 text-[28px] sm:text-3xl">Sign in</h1>
          <p className="text-[#9FA4AA]">
            Be ready to unlock exclusive features only with Coolvacay
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8">
          <SignInForm />
          <OAuthProviders page="signin" />
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Don’t have an account?
          <Link className="ml-2 text-primary" href="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
