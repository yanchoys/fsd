import dayjs from "dayjs";
import {
  getAvailabilityDates,
  getListingData,
} from "~/app/(application)/actions";
import BookNowContent from "./BookNowCard.client";
import type { IParams } from "~/app/(application)/definitions";
import { getCurrentDates } from "~/app/utils/helpers";

export default async function BookNow({ params }: { params: IParams }) {
  const { startDate } = getCurrentDates();

  //if we want to change the search period,modify this line
  const endDate = dayjs().add(1, "year").format("YYYY-MM-DD");
  const listingInfo = (await getListingData(params))!;

  const availabilityDate =
    listingInfo.source === "Lodgix"
      ? await getAvailabilityDates(
          listingInfo.source,
          listingInfo.id,
          startDate,
          endDate,
        )
      : undefined;

  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
      <BookNowContent
        listingInfo={listingInfo}
        params={params}
        availableDates={availabilityDate}
      />
    </div>
  );
}
