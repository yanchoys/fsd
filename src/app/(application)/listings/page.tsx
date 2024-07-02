import { getFetch } from "~/app/utils/api-helpers";
import { ListingSection } from "~/app/ui/components/listings/ListingsSection";
import type { ListingData } from "~/app/(application)/definitions";
import { FetchError } from "~/app/utils/definitions";
import { MapContainer } from "~/app/ui/components/common";
import { capitalize } from "~/app/utils/helpers";
import Filters from "~/app/ui/components/listings/FIlters";

async function getFilteredListings(query: string) {
  try {
    const res = await getFetch<ListingData[]>(`/listings?${query}`, true);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listings");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams);
  const listings = (await getFilteredListings(query.toString()))!;

  const title =
    query.get("category") ??
    (query.get("Match") && capitalize(query.get("Match")!));

  return (
    <main className="static w-full pl-[70px]">
      <div className="flex">
        <div className="flex w-5/12 flex-col pb-6 desktop:w-7/12">
          <Filters />
          <div className="flex place-items-baseline gap-8 pb-6">
            <h1 className="text-3xl">{`${title ? `${title} available properties` : "Available properties"}`}</h1>
            <h6 className="text-sm text-primary-grey300">
              {listings?.length} properties
            </h6>
          </div>
          {listings?.length > 0 ? (
            <ListingSection listings={listings} />
          ) : (
            <h6>No listings available</h6>
          )}
        </div>
        <div className="sticky right-0 top-0 h-full w-7/12 flex-none desktop:w-5/12">
          <MapContainer listings={listings ?? []} />
        </div>
      </div>
    </main>
  );
}
