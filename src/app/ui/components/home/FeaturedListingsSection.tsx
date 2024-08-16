import Link from "next/link";

import { truncateText } from "~/app/utils/helpers";
import { getFeaturedListings } from "~/app/(application)/actions";
import { IconGenerator, MainCard } from "../common";

export async function FeaturedListingsSection() {
  const featuredListings = (await getFeaturedListings())!;

  return (
    <section className="no-scrollbar flex items-center gap-5 overflow-auto pb-10 will-change-scroll sm:flex-row sm:flex-wrap sm:justify-between">
      {featuredListings?.length > 0 ? (
        featuredListings.map((listing) => {
          return (
            <div key={listing.id} className="relative h-[340px]">
              <Link
                href={`/listing/${listing.source}/${listing.id}?&numberOfGuests=1`}
                className="h-full"
              >
                <MainCard
                  name={truncateText(listing.name, 50)}
                  subtitle={`${listing.city}, ${listing.state}`}
                  key={listing.id}
                  imageUrl={listing.imageUrl}
                  propertyType={listing.propertyType}
                  squareFeets={listing.squareFeets}
                />
              </Link>

              <div className="absolute left-4 top-4 flex h-7 w-[95px] items-center justify-center gap-1 rounded-md bg-primary text-xs font-semibold text-white">
                <IconGenerator
                  src="/lightining.svg"
                  alt="featured icon"
                  width="16px"
                />
                FEATURED
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-[16px]">
          There are no featured listings at this moment
        </h1>
      )}
    </section>
  );
}
