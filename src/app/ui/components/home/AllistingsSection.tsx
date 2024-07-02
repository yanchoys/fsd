import Link from "next/link";
import React from "react";
import { IconGenerator, Newsletter, MainCard } from "../common";
import { getFetch } from "../../../utils/api-helpers";
import type { ListingData } from "../../../(application)/definitions";
import { truncateText } from "../../../utils/helpers";

export async function getAllListings() {
  try {
    const results = await Promise.allSettled([
      getFetch<ListingData[]>("/Listings?Limit=8&Offset=0"),
      getFetch<ListingData[]>("/Listings?Limit=8&Offset=8"),
    ]);
    const firstListings =
      results[0].status === "fulfilled" ? results[0].value : [];
    const lastListings =
      results[1].status === "fulfilled" ? results[1].value : [];

    return [firstListings, lastListings];
  } catch (error) {
    console.error("Error:", error);
    return [[], []];
  }
}

export async function AllistingsSection() {
  const [firstListings, lastListings] = (await getAllListings()) as [
    ListingData[],
    ListingData[],
  ];

  return (
    <section>
      <div className="flex items-center justify-between">
        <h4 className="text-[28px]">All listings</h4>
        <Link href="/listings" className="flex items-center text-primary">
          See all listings
          <span className="ml-2">
            {<IconGenerator src="/link.svg" width="13px" alt="link icon" />}
          </span>
        </Link>
      </div>
      {firstListings && firstListings.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
          {firstListings?.map((listing) => {
            return (
              <MainCard
                id={listing.id}
                source={listing.source}
                name={truncateText(listing.name, 50)}
                subtitle={`${listing.city}, ${listing.state}`}
                key={listing.id}
                imageUrl={listing.imageUrl}
                propertyType={listing.propertyType}
                squareFeets={listing.squareFeets}
              />
            );
          })}
        </div>
      ) : (
        <h6 className="py-6">
          There are no available listings at this moment.
        </h6>
      )}
      <div>
        <Newsletter />
      </div>
      {lastListings && lastListings.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 py-10 desktop:grid-cols-4">
          {firstListings?.map((listing) => {
            return (
              <MainCard
                id={listing.id}
                source={listing.source}
                name={truncateText(listing.name, 50)}
                subtitle={`${listing.city}, ${listing.state}`}
                key={listing.id}
                imageUrl={listing.imageUrl}
                propertyType={listing.propertyType}
                squareFeets={listing.squareFeets}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-4"></div>
      )}
    </section>
  );
}
