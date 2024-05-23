import type { ListingData } from "../../../(application)/definitions";
import { getFetch } from "../../../utils/api-helpers";
import { truncateText } from "../../../utils/helpers";
import { MainCard } from "../common/Cards/Cards";

async function getFeaturedListings() {
  try {
    const res = await getFetch<ListingData[]>("/listings/featured");
    return res;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Failed to fetch featured listings`);
  }
}

export default async function FeaturedListingsSection() {
  const featuredListings = await getFeaturedListings();

  return (
    <section className="flex w-full justify-between pb-10">
      {featuredListings.length > 0 ? (
        featuredListings.map((listing) => {
          return (
            <MainCard
              name={truncateText(listing.name, 50)}
              subtitle={`${listing.city}, ${listing.state}`}
              key={listing.id}
              imageUrl={listing.imageUrl}
              propertyType={listing.propertyType}
              squareFeets={listing.squareFeets}
            />
          );
        })
      ) : (
        <h6>There are no featured listings at this moment</h6>
      )}
    </section>
  );
}
