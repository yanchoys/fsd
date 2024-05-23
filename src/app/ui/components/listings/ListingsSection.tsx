import { ListingCard } from "../common/Cards/Cards";
import type { ListingData } from "~/app/(application)/definitions";

export async function ListingSection({
  listings,
}: {
  listings: ListingData[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 desktop:grid-cols-2">
      {listings.map((listing) => {
        return (
          <ListingCard
            key={listing.id}
            name={listing.name}
            subtitle={`${listing.city}, ${listing.state}`}
            imageUrl={listing.imageUrl}
            price={listing.price}
          />
        );
      })}
    </div>
  );
}
