"use client";

import { useState } from "react";
import type { IListingData } from "~/app/(application)/definitions";
import { IconGenerator } from "../common";

export default function Overview({ listing }: { listing: IListingData }) {
  const [readMore, setReadMore] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-bold">Overview</h1>
      <article
        className={`${readMore ? "line-clamp-none" : "line-clamp-6 "} whitespace-pre-line pt-4 text-justify	`}
      >
        {listing.description}
      </article>
      <button
        onClick={() => setReadMore(!readMore)}
        className="select-none text-center align-middle text-sm font-bold text-primary transition-all hover:text-sky-700"
      >
        {readMore ? "Read less" : "Read more"}
      </button>
      <article className="grid grid-cols-2 pt-10 lg:grid-cols-3">
        {listing.amenities.map((amenity, index) => {
          return (
            (!viewMore ? index < 9 : index >= 0) && (
              <div key={index} className="flex items-center gap-2">
                <IconGenerator
                  key={index}
                  src="/home-icon.svg"
                  width="20px"
                  alt="home icon"
                />
                <h1 className="text-sm font-medium">{amenity}</h1>
              </div>
            )
          );
        })}
      </article>
      <button
        onClick={() => setViewMore(!viewMore)}
        className="mb-10 mt-1 flex select-none text-sm font-bold text-primary transition-all hover:text-sky-700"
      >
        {viewMore ? "View less" : "View more"}
      </button>
    </div>
  );
}
