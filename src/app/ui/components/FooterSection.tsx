import React from "react";
import Link from "next/link";
import { IconGenerator } from "./common";

const popularSearchLinks = [
  "Cabins for Rent",
  "Apartment for Rent",
  "Lodge for Rent",
  "Rooms for Rent",
];
const quickLinks = [
  { name: "About Company", href: "/about-us" },
  { name: "Blog", href: "/blog" },
  { name: "Policies", href: "/privacy-policy" },
  { name: "Contact Us", href: "/contact-us" },
];
const staticPages = [
  { name: "Privacy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms-and-conditions" },
  { name: "Accessibility", href: "/accessibility-statement" },
];
const discoverLinks = ["Miami", "Los Angeles", "Chicago", "New York"];

function FooterSection() {
  return (
    <footer
      className="mt-auto flex flex-col p-4 sm:px-[72px] sm:pt-14"
      style={{ borderTop: "1px solid rgba(173, 181, 189, 0.5)" }}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-28">
        <div className="flex flex-col gap-7">
          <div className="py-3">
            <IconGenerator
              src="/cool_vacay_logo_blue.svg"
              width="129px"
              alt="Coolvacay logo"
            />
          </div>
          <div className="flex gap-10 max-[430px]:flex-col sm:w-[400px] sm:flex-row">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <h1 className="text-sm text-primary-grey400">
                  Total Free Customer Care
                </h1>
                <h1 className="text-[15px] font-semibold">302-581-9342</h1>
              </div>
              <h1 className="text-[15px] font-semibold">
                Follow us on social media
              </h1>
              <div className="flex items-center gap-7">
                <IconGenerator
                  src="/facebook_icon.svg"
                  width="10px"
                  alt="CoolVacay Facebook page"
                />
                <IconGenerator
                  src="/instagram_icon.svg"
                  width="13px"
                  alt="CoolVacay Instagram page"
                />
                <IconGenerator
                  src="/linkedin_icon.svg"
                  width="13px"
                  alt="CoolVacay Linkedin page"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-sm text-primary-grey400">
                Need Live Support?
              </h1>
              <h1 className="text-[15px] font-semibold">vacay@coolvacay.com</h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:w-full sm:grid-cols-3 sm:justify-between">
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Popular Search</h2>
            {popularSearchLinks.map((link) => (
              <h2 key={link} className="text-sm text-primary-grey400">
                {link}
              </h2>
            ))}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Quick Links</h2>
            {quickLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className="text-sm text-primary-grey400"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-5 lg:ml-auto">
            <h2 className="text-[15px] font-semibold">Discover</h2>
            {discoverLinks.map((link) => (
              <h2 key={link} className="text-sm text-primary-grey400">
                {link}
              </h2>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-6 text-sm sm:flex-row">
        <h2>
          © Coolvacay 2024
          <span className="text-primary-grey400"> - All rights reserved</span>
        </h2>
        <div className="flex gap-2">
          {staticPages.map((page, index) => (
            <React.Fragment key={page.name}>
              <Link
                href={page.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary-grey400"
              >
                {page.name}
              </Link>
              {index < staticPages.length - 1 && (
                <span className="text-primary-grey400"> · </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
