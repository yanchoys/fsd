import {
  getCloseDatesListings,
  getFilteredListings,
} from "~/app/(application)/actions";
import { ListingCard } from "../common";
import Pagination from "./Pagination";
const PAGESIZE = "4";

export async function CloseDatesListings({
  query,
}: {
  query: URLSearchParams;
}) {
  const listings = (await getFilteredListings(query.toString()))!;
  const closeAvailabilityListings =
    listings?.totalItems < 4
      ? (await getCloseDatesListings(
          PAGESIZE,
          query.get("match")!,
          query.get("fromDate")!,
          query.get("toDate")!,
        ))!
      : [];

  return closeAvailabilityListings?.length > 0 ? (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl">
          {"Flexible travel dates? Check out these properties"}
        </h1>
        <p className="text-sm text-primary-grey300">
          {closeAvailabilityListings?.length} properties
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 xl:justify-between">
        {closeAvailabilityListings?.map((item) => {
          return (
            <ListingCard
              id={item.listing.id}
              source={item.listing.source}
              key={item.listing.id}
              name={item.listing.name}
              subtitle={`${item.listing.city}, ${item.listing.state}`}
              imageUrl={item.listing.imageUrl}
              price={item.listing.price}
              closeDates={item.availableDates}
              starRating={item.listing.starRating}
            />
          );
        })}
      </div>
      {listings?.totalItems < 4 && listings.totalItems !== 0 ? (
        <div className="my-8 flex justify-center">
          <Pagination totalPages={listings.totalPages} />
        </div>
      ) : null}
    </>
  ) : null;
}
