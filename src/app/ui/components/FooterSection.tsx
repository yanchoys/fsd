import React from "react";
import IconGenerator from "./common/IconGenerator";

const popularSearchLinks = [
  "Cabins for Rent",
  "Apartment for Rent",
  "Lodge for Rent",
  "Rooms for Rent",
];
const quickLinks = ["About Company", "Blog", "Policies", "Contact Us"];
const discoverLinks = ["Miami", "Los Angeles", "Chicago", "New York"];

function FooterSection() {
  return (
    <footer
      className="flex flex-col px-[72px] pt-14"
      style={{ borderTop: "1px solid rgba(173, 181, 189, 0.5)" }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-7">
          <div className="py-3">
            <IconGenerator
              src="/cool_vacay_logo_blue.svg"
              width="129px"
              alt="Coolvacay logo"
            />
          </div>
          <div className="flex gap-10">
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
        <div className="flex grow justify-end gap-[100px] desktop:gap-[200px]">
          <div className="flex flex-col gap-5">
            <h6 className="text-[15px] font-semibold">Popular Search</h6>
            {popularSearchLinks.map((link) => (
              <h6 key={link} className="text-sm text-primary-grey400">
                {link}
              </h6>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="text-[15px] font-semibold">Quick Links</h6>
            {quickLinks.map((link) => (
              <h6 key={link} className="text-sm text-primary-grey400">
                {link}
              </h6>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="text-[15px] font-semibold">Discover</h6>
            {discoverLinks.map((link) => (
              <h6 key={link} className="text-sm text-primary-grey400">
                {link}
              </h6>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between py-6 text-sm">
        <h6>
          © Coolvacay 2024
          <span className="text-primary-grey400"> - All rights reserved</span>
        </h6>
        <h6 className="text-primary-grey400">
          Privacy · Terms · Accessibility
        </h6>
      </div>
    </footer>
  );
}

export default FooterSection;
