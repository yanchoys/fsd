import { getFetch } from "~/app/utils/api-helpers";
import type { ListingData } from "~/app/(application)/definitions";
import { FetchError } from "~/app/utils/definitions";
import Gallery from "~/app/ui/components/listing/Gallery";
import Overview from "~/app/ui/components/listing/OverviewSection";
import BookNow from "~/app/ui/components/listing/BookNowSection";
import { SimilarCard, Breadcrumbs } from "~/app/ui/components/common";

async function getListingData({ source, id }: { source: string; id: string }) {
  try {
    const res = await getFetch<ListingData>(`/Listings/${source}/${id}`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getSimilarListings({
  source,
  id,
}: {
  source: string;
  id: string;
}) {
  try {
    const res = await getFetch<ListingData[]>(
      `/Listings/${source}/${id}/similar`,
      true,
    );
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch similar listing");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    category: string;
    Match: string;
  };
}) {
  const pageParams = params ?? "";
  const listing = (await getListingData(pageParams))!;
  const similarListings = (await getSimilarListings(pageParams))!;
  const query = new URLSearchParams(searchParams);
  const navigateHome = !(query.get("Match") ?? query.get("category"));
  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center">
          <div className="w-full">
            <Breadcrumbs
              navigateHome={navigateHome}
              breadcrumbs={[
                //TODO: replace with the correct url
                {
                  label: navigateHome ? "Home" : "Listings",
                  href: "/listings",
                },
                {
                  label: `${listing.name}`,
                  href: `/listing/${params.source}/${params.id}`,
                  active: true,
                },
              ]}
            />
            <div className="flex w-full justify-between pb-6">
              <h1 className="pt-3 text-3xl">
                {listing.name}, {listing.city}, {listing.state}
              </h1>
              <div className="flex w-[300px] items-center justify-center rounded-[11px] border border-[#EAEAEF] py-2">
                Call us for more info:
                <span className="ml-1 font-medium">315 434 324</span>
              </div>
            </div>
            <Gallery listing={listing} />
            <div className="flex gap-6 py-10">
              <Overview listing={listing} />
              <BookNow listing={listing} params={params} />
            </div>
            <h5 className="mb-10 text-2xl font-bold">
              View similar homes in this area
            </h5>
            <div className="no-scrollbar mb-10 flex snap-x gap-5 overflow-auto will-change-scroll">
              {similarListings
                ? similarListings.map((listing, index) => {
                    return (
                      <SimilarCard
                        key={index}
                        id={listing.id}
                        source={listing.source}
                        name={listing.name}
                        subtitle={`${listing.city}, ${listing.state}`}
                        imageUrl={listing.imageUrl}
                        numberOfGuests={listing.numberOfGuests}
                        bedrooms={listing.bedrooms}
                        bathrooms={listing.bathrooms}
                        price={listing.price}
                        className="snap-start"
                      />
                    );
                  })
                : "Cannot find similar homes at this moment"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
