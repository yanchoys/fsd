"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { ListingData } from "~/app/(application)/definitions";

export default function BookedListingCard({
  listing,
}: {
  listing: ListingData;
}) {
  const searchParams = useSearchParams();
  const startDate = dayjs(searchParams.get("FromDate")).format("MMM DD, YYYY");
  const endDate = dayjs(searchParams.get("ToDate")).format("MMM DD, YYYY");
  const numberOfGuests = searchParams.get("NumberOfGuests");

  return (
    <div
      className={`flex h-[136px] w-full gap-6 rounded-xl border border-[#EAEAEF] p-3`}
    >
      <div className="flex h-[112px] w-[138px]">
        <Image
          src={listing.imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="Property image"
          style={{
            height: 112,
            width: "auto",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
      <div className="flex gap-16">
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Dates</div>
          <p className="text-sm text-[#676D73]">
            {startDate} - {endDate}
          </p>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Guests</div>
          <p className="text-sm text-[#676D73]">{numberOfGuests}</p>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <p className="text-sm text-[#676D73]">{listing.propertyType}</p>
        </div>
      </div>
    </div>
  );
}
