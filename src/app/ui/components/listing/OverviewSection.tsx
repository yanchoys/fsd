"use client";

import { useState } from "react";
import type { ListingData } from "~/app/(application)/definitions";
import { IconGenerator, MapContainer } from "../common";

export default function Overview({ listing }: { listing: ListingData }) {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Overview</h1>
      <article
        className={`${readMore ? "line-clamp-none" : "line-clamp-6 "} pt-4 text-justify `}
      >
        {listing.description}
      </article>
      <button
        onClick={() => setReadMore(!readMore)}
        className="select-none text-center align-middle text-sm font-bold text-primary transition-all hover:text-sky-700"
      >
        {readMore ? "Read less" : "Read more"}
      </button>
      <div className="grid grid-cols-3 py-10">
        {listing.amenities.map((amenitie, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <IconGenerator
                key={index}
                src="/home-icon.svg"
                width="20px"
                alt="home icon"
              />
              <h6 className="font-medium">{amenitie}</h6>
            </div>
          );
        })}
      </div>
      <div className="max-h-60 w-full">
        <MapContainer listings={[{ ...listing }]} singleListing />
      </div>
      <div className="py-6">
        <h1 className="text-sm text-[#676D73]">
          Listed by <span className="text-sm text-black">{listing.source}</span>
        </h1>
      </div>
    </div>
  );
}
