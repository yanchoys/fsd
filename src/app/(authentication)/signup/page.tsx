import Image from "next/image";
import Link from "next/link";

//TODO: ask where to put loader
// import Loader from "../../ui/components/common/Loader/loader";

import SignUpForm from "~/app/ui/components/authentication/SignUpForm";
import OAuthProviders from "~/app/ui/components/authentication/OAuthProviders";

export default function SignUp() {
  return (
    <div className="flex w-full flex-col gap-12">
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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="mb-4 text-3xl">Create an account</h1>
          <p className="text-[#9FA4AA]">
            Don&apos;t miss out on the benefits, sign up now!
          </p>
        </div>
        <div className="flex flex-col gap-7">
          <SignUpForm />
          <OAuthProviders />
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Already have an account?
          <Link className="ml-2 text-primary" href="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
