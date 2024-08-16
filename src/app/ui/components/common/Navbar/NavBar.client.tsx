"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGenerator } from "../IconGenerator";
import NavBarLoginButton from "./NavBarLoginButton";
import type { TUserData } from "~/app/(application)/definitions";

import { getCurrentDates } from "~/app/utils/helpers";
import NavBardDialog from "./NavBarDialog";
import { logOut } from "~/app/(authentication)/actions";

const whiteVariantPaths = [
  "/",
  "/about-us",
  "/terms-and-conditions",
  "/privacy-policy",
  "/accessibility-statement",
];

export default function NavBar({
  userData,
  isTokenValid,
}: {
  userData?: TUserData["profile"] | null;
  isTokenValid: boolean;
}) {
  //if the token managed by the client exists but the server token has expired then logout
  useEffect(() => {
    if (userData && !isTokenValid) {
      const checkSync = async () => {
        await logOut();
      };
      void checkSync();
    }
  }, [isTokenValid, userData]);

  const pathname = usePathname();
  const isWhiteVariant = whiteVariantPaths.includes(pathname);
  const noMaxWidth = pathname.startsWith("/listings");

  const [openMenu, setOpenMenu] = useState(false);
  const { startDate, endDate } = getCurrentDates();

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <nav className="z-10 flex h-12 w-full scroll-px-4 justify-center px-4 py-6 sm:h-24 sm:py-6">
      <div
        className={`flex w-full ${isWhiteVariant || !noMaxWidth ? "sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]" : "sm:pl-16"} scroll-px-4 items-center justify-between gap-10 lg:gap-44`}
      >
        <div className="flex w-full items-center justify-between sm:w-auto md:flex-grow">
          <Link href="/">
            <IconGenerator
              src={`/cool_vacay_logo_${isWhiteVariant ? "white" : "blue"}.svg`}
              alt="CoolVacay Logo"
              className="w-[118px] sm:w-[166px]"
              priority={true}
            />
          </Link>
          <button className="sm:hidden" onClick={toggleMenu}>
            <IconGenerator
              src={`/menu_icon_${isWhiteVariant ? "white" : "black"}.svg`}
              alt="Menu"
              width={isWhiteVariant ? "22px" : "16px"}
            />
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-grow sm:items-center sm:justify-between">
          <div
            className={`flex gap-5 ${isWhiteVariant ? "text-white" : "text-black"}`}
          >
            <Link
              className="text-center text-sm"
              href={`/listings?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1&pageNum=1`}
            >
              Listed places
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/rental-income-estimator"
              className={`min-w-32 text-center text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
            >
              Vacation Rental Management
            </Link>
            {userData ? (
              <Link href="/profile/reservations" className="hidden sm:block">
                <p
                  className={`text-center text-sm ${isWhiteVariant ? "text-white" : "text-black"}`}
                >
                  <span className="mr-[14px] hidden  text-center lg:inline-block">
                    •
                  </span>{" "}
                  My bookings
                </p>
              </Link>
            ) : null}
            {!userData ? (
              <Link href="/signin">
                <button
                  className={`flex w-[190px] items-center rounded-full px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "bg-white text-black" : "bg-primary text-white"}`}
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
            ) : (
              <NavBarLoginButton
                userData={userData}
                isWhiteVariant={isWhiteVariant}
              />
            )}
          </div>
        </div>
      </div>
      {openMenu && (
        <NavBardDialog
          openMenu={openMenu}
          toggleMenu={toggleMenu}
          session={userData!}
        />
      )}
    </nav>
  );
}
