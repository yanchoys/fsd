import { getFetch } from "~/app/utils/api-helpers";
import { ListingSection } from "~/app/ui/components/listings/ListingsSection";
import { MapContainer } from "~/app/ui/components/listings/Map";
import type { ListingData } from "~/app/(application)/definitions";

async function getFilteredListings(query: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const res = await getFetch<ListingData[]>(`/listings?${query}`, true);
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to fetch all listings`);
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? "";
  const listings = await getFilteredListings(query);

  return (
    <main className="static w-full pl-[70px]">
      <div className="flex place-items-baseline gap-8 pb-6">
        <h1 className="text-3xl">North Carolina available properties</h1>
        <h6 className="text-sm text-primary-grey300">4 properties</h6>
      </div>
      <div className="flex">
        <div className="flex w-5/12 flex-col pb-6 desktop:w-7/12">
          <ListingSection listings={listings} />
        </div>
        <div className="sticky right-0 top-0 h-full w-7/12 flex-none desktop:w-5/12">
          <MapContainer listings={listings} />
        </div>
      </div>
    </main>
  );
}
