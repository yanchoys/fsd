"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import IconGenerator from "./common/IconGenerator";

function NavBar() {
  const pathname = usePathname();
  const isWhiteVariant = pathname === "/";

  return (
    <nav
      className={`${isWhiteVariant ? "absolute" : "z-10 block"} flex w-full items-center justify-center px-16 py-6`}
    >
      <div className="flex h-12 w-full items-center gap-44">
        <div className="flex flex-grow justify-between">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${isWhiteVariant ? "white" : "blue"}.svg`}
              alt="CoolVacay Logo"
              width="166px"
              priority={true}
            />
          </Link>
          <div className="flex">
            <div
              className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              <Link href="/listings">
                <p className="text-sm">Listed places</p>
              </Link>
              <Link href="/listings">
                <p className="text-sm">Offers</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <Link href="/rental-income-estimator">
            <p
              className={`text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              Vacation Rental Management
            </p>
          </Link>
          <Link href="/signin">
            <button
              className={`flex items-center rounded-full px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "bg-white text-black" : "bg-primary text-white"}`}
            >
              Log In or Sign Up
              <span className="ml-2">
                <IconGenerator
                  alt="avatar icon"
                  src={`/avatar_${isWhiteVariant ? "white" : "blue"}.svg`}
                  width="32px"
                />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
