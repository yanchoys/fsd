import Image from "next/image";
import dayjs from "dayjs";

import { IconGenerator } from "../IconGenerator";
import type { IReservationsDetails } from "~/app/(application)/definitions";

export default function ReservationCard({
  reservation,
}: {
  reservation: IReservationsDetails;
}) {
  const details = reservation.details;

  return (
    <div className="flex flex-col gap-4 max-[500px]:max-w-[310px] min-[500px]:flex-row lg:gap-8">
      <div className="flex h-[180px] w-[310px] lg:h-[130px] lg:w-[180px]">
        <Image
          src={details.listingImage ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="Property image"
          className="h-[180px] w-[310px] rounded rounded-xl lg:h-[130px] lg:w-[180px]"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-lg font-medium lg:text-2xl">{details.listingName}</p>
        <div className="flex h-[22px] items-center gap-8 text-sm font-medium text-[#858C93] lg:text-base">
          {details.listingType ? (
            <div className="flex h-[22px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#29ABE2]/[.10] text-xs text-primary">
              {details.listingType}
            </div>
          ) : null}
          <p>Sleeps {reservation.adults}</p>
          <p>{details.squareFeets} ft2</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 md:flex-row lg:flex-col xl:flex-row">
            <div className="flex shrink-0 items-center gap-2">
              <IconGenerator
                src="/home-icon.svg"
                alt="Property Icon"
                width="20px"
                height={20}
              />
              <p className="flex shrink-0 text-sm lg:text-base">{`${details.bedrooms} ${
                details.bedrooms === 1 ? "Bedroom" : "Bedrooms"
              }`}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <IconGenerator
                src="/home-icon.svg"
                alt="Property Icon"
                width="20px"
                height={20}
              />
              <p className="flex shrink-0 text-sm lg:text-base">{`${details.bathrooms} ${
                details.bathrooms === 1 ? "Bathroom" : "Bathrooms"
              }`}</p>
            </div>
          </div>
          <div className="hidden w-[1px] bg-[#EAEAEF] lg:mx-5 lg:block lg:h-full" />
          <div className="my-3 block h-[1px] w-full bg-[#EAEAEF] lg:hidden" />
          <div className="flex flex-row justify-between text-sm lg:flex-col lg:gap-2 lg:text-base">
            <p className="text-sm font-medium">
              {`${dayjs(details.fromDate).format("MMM DD")} -
                ${dayjs(details.toDate).format("MMM DD")}`}
            </p>
            <p className="text-[#676D73]">Booked on</p>
          </div>
          <div className="mt-1 flex flex-row justify-between text-sm lg:flex-col lg:gap-2 lg:text-base">
            <p className="text-sm font-medium">{"$" + details.pricePerNight}</p>
            <p className="text-[#676D73]">Total with fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
