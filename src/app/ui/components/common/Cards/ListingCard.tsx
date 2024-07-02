"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { IconGenerator } from "../IconGenerator";
import type { ListingCardProps } from "~/app/(application)/definitions";

export default function ListingCard({
  id,
  source,
  name,
  subtitle,
  imageUrl,
  price,
}: ListingCardProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const startDate = dayjs(params.get("FromDate")).format("MMM DD, YYYY");
  const endDate = dayjs(params.get("ToDate")).format("MMM DD, YYYY");
  params.delete("Offset");
  params.delete("Limit");

  return (
    <div className="flex h-[405px] w-[360px] grow-0 flex-col gap-4 overflow-hidden rounded-md p-1">
      <div className="relative">
        <Link
          href={`listing/${source}/${id}?${params.toString()}`}
          className="w-min"
        >
          <Image
            src={imageUrl ?? "/listing_card.png"}
            width={360}
            height={240}
            alt="CoolVacay listing image"
            style={{
              height: 210,
              objectFit: "fill",
              borderRadius: 6,
            }}
          />
        </Link>
      </div>
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between font-medium">
            <h6 className="text-lg">
              ${price}
              <span className="text-sm text-primary-grey400"> night</span>
            </h6>
            <h6 className="text-sm text-primary-grey400">
              {startDate} - {endDate}
            </h6>
          </div>
          <div>
            <div className="mb-1 text-base font-medium">{name}</div>
            <p className="text-sm text-[#676D73]">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <IconGenerator
              src="/rating_star.svg"
              alt="Rating start"
              width="16px"
              height={16}
            />
            <h6 className="text-sm">
              4.5
              <span className="text-sm font-medium text-primary-grey400">
                {" "}
                (293 review)
              </span>
            </h6>
          </div>
        </div>
        <Link href={`listing/${source}/${id}?${params.toString()}`}>
          <button className="w-full rounded-full border border-primary py-3 font-bold text-primary hover:bg-primary hover:text-white">
            Book
          </button>
        </Link>
      </div>
    </div>
  );
}
