"use client";

import type { IListingData } from "~/app/(application)/definitions";
import { useAppSearchParams } from "~/context/SearchParamsContext";

export function Content({ listing }: { listing: IListingData }) {
  const { searchParamsValues } = useAppSearchParams();

  return (
    <div className="flex max-h-min w-full flex-col gap-4 lg:flex-row lg:justify-between xl:justify-start xl:gap-16">
      <div className={`flex flex-col justify-center lg:gap-3`}>
        <div className="mb-1 text-base font-medium">Dates</div>
        <p className="text-sm text-[#676D73]">
          {searchParamsValues.fromDate?.format("MMM DD")} -{" "}
          {searchParamsValues.toDate?.format("MMM DD")}
        </p>
      </div>
      <div className={`flex flex-col justify-center lg:gap-3`}>
        <div className="mb-1 text-base font-medium">Guests</div>
        <p className="text-sm text-[#676D73]">
          {searchParamsValues.numberOfGuests}
        </p>
      </div>
      {listing?.propertyType ? (
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <p className="text-sm text-[#676D73]">{listing.propertyType}</p>
        </div>
      ) : null}
    </div>
  );
}
