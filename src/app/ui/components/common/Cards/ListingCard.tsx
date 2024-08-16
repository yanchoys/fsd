"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSearchParams } from "~/context/SearchParamsContext";
import { IconGenerator } from "../IconGenerator";
import type { ListingCardProps } from "~/app/(application)/definitions";
import {
  truncateText,
  formatDateMMMDD,
  formatDateMMM_DD_YYYY,
} from "../../../../utils/helpers";
import { Tooltip } from "@mui/material";

export default function ListingCard({
  id,
  source,
  name,
  subtitle,
  imageUrl,
  price,
  closeDates,
  starRating,
}: ListingCardProps) {
  const { searchParamsValues, searchParams } = useAppSearchParams();
  const startDate = searchParamsValues.fromDate?.format("MMM DD");
  const endDate = searchParamsValues.toDate?.format("MMM DD");

  searchParams.delete("pageNum");
  return (
    <div
      className={`flex h-[400px] w-[350px] flex-col gap-4 overflow-hidden rounded-md p-1 sm:w-[280px] md:w-[350px]`}
    >
      <div className="relative">
        <Link
          href={`listing/${source}/${id}?${searchParams.toString()}`}
          className="w-min"
        >
          <Image
            src={imageUrl ?? "/listing_card.png"}
            width={350}
            height={0}
            alt="CoolVacay listing image"
            style={{
              height: 210,
              objectFit: "fill",
              borderRadius: 6,
            }}
          />
        </Link>
      </div>
      <div className="grow-1 flex h-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          {!closeDates ? (
            <div className="flex items-center justify-between font-medium">
              <h2 className="text-lg">
                ${price}
                <span className="text-sm text-primary-grey400"> night</span>
              </h2>
              {startDate && endDate ? (
                <h2 className="text-sm text-primary-grey400">
                  {startDate} - {endDate}
                </h2>
              ) : null}
            </div>
          ) : null}
          <div>
            <Tooltip
              disableHoverListener={name.length < 39}
              title={name}
              enterDelay={800}
              leaveDelay={200}
            >
              <div className="mb-1 gap-3 text-base font-medium">
                {truncateText(name, 39)}
              </div>
            </Tooltip>
            <p className="text-sm text-[#676D73]">{subtitle}</p>
          </div>
          {starRating ? (
            <div className="flex items-center gap-1">
              <IconGenerator
                src="/rating_star.svg"
                alt="Rating start"
                width="16px"
                height={16}
              />
              <h2 className="text-sm">
                4.5
                <span className="text-sm font-medium text-primary-grey400">
                  {" "}
                  (293 review)
                </span>
              </h2>
            </div>
          ) : null}
        </div>
        {closeDates ? (
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-xs text-[#FF6565]">
              <IconGenerator src="/notice.svg" alt="Notice icon" width="12px" />
              This property has no availability from {startDate} to {endDate}
            </p>
            <div className="flex gap-2">
              {closeDates.map((date, index) => {
                if (index < 3) {
                  return (
                    <Link
                      key={index}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`listing/${source}/${id}?fromDate=${formatDateMMM_DD_YYYY(date.startDate)}&toDate=${formatDateMMM_DD_YYYY(date.endDate)}&numberOfGuests=${searchParams.get("numberOfGuests")}`}
                    >
                      <button className="flex max-w-max flex-col items-center gap-2 rounded-lg border border-[#ADB5BD] p-2 hover:opacity-75">
                        <p className="text-xs font-medium text-primary">
                          {formatDateMMMDD(date.startDate)} -
                          {formatDateMMMDD(date.endDate)}
                        </p>
                        <p className="text-sm text-[#858C93]">
                          {date.nrOfNights} nights
                        </p>
                      </button>
                    </Link>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        ) : (
          <Link href={`listing/${source}/${id}?${searchParams.toString()}`}>
            <button className="w-full rounded-full border border-primary py-3 font-bold text-primary hover:bg-primary hover:text-white">
              Book
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
