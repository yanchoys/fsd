"use client";

import { useState } from "react";
import { Dialog, DialogContent, Divider } from "@mui/material";
import type { IListingData } from "~/app/(application)/definitions";
import InquireForm from "../../listing/InquireForm";
import CloseIcon from "@mui/icons-material/Close";
import ChangePasswordForm from "../../profile/ChangePasswordForm";
import DeactivateAccountForm from "../../profile/DeactivateAccountForm";

export default function FormDialog({
  title,
  subtitle,
  data,
  children,
  content,
}: {
  title: string;
  subtitle?: string;
  data?: IListingData | string;
  children: React.ReactNode;
  content: "password" | "inquiry" | "deactivate";
}) {
  const [open, setOpen] = useState(false);
  const isContentInquiry = content === "inquiry";

  const modalContentOptions = {
    inquiry: <InquireForm listing={data as IListingData} setOpen={setOpen} />,
    password: <ChangePasswordForm setOpen={setOpen} userId={data as string} />,
    deactivate: (
      <DeactivateAccountForm setOpen={setOpen} userId={data as string} />
    ),
  };
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div
          className={`flex flex-col gap-4 ${isContentInquiry ? "bg-[#F7F7F7] px-4 pt-4 sm:px-10 sm:pt-10" : "px-6 py-4"}`}
        >
          <h2
            className={
              isContentInquiry
                ? "text-lg text-primary sm:text-2xl "
                : "text-[20px] font-medium"
            }
          >
            {title}
          </h2>
          {subtitle ? (
            <h6 className="text-base text-[#676D73] sm:text-lg">{subtitle}</h6>
          ) : null}
        </div>
        <div
          className={`absolute ${isContentInquiry ? "right-3 top-3" : "right-5 top-5"}`}
        >
          <button
            onClick={() => setOpen(false)}
            className="hover:text-primary"
            aria-label="close button"
          >
            <CloseIcon
              className={
                isContentInquiry ? "sm:text-[24px ]text-[18px]" : "text-[14px]"
              }
            />
          </button>
        </div>
        {isContentInquiry ? null : <Divider variant="fullWidth" flexItem />}
        <DialogContent
          className={`relative ${
            isContentInquiry ? "bg-[#F7F7F7] p-4 sm:p-10" : "bg-white p-4"
          }`}
        >
          <div className="flex flex-col gap-5">
            {modalContentOptions[content]}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
