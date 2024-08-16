import { getFilteredListings } from "~/app/(application)/actions";
import MapContent from "./MapContainer.client";
import type { IListingData } from "~/app/(application)/definitions";

export default async function MapContainer({
  singleListing = false,
  query,
  listing,
}: {
  singleListing?: boolean;
  query: URLSearchParams;
  listing: IListingData[];
}) {
  const listings = singleListing
    ? listing
    : (await getFilteredListings(query.toString()))?.items ?? [];

  return <MapContent listings={listings} singleListing={singleListing} />;
}
