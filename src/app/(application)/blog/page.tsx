import React from "react";
import Image from "next/image";

import CustomButton from "../../ui/components/common/CustomButton";
import CustomChip from "../../ui/components/common/CustomChip";
// import { MainCard } from "~/app/ui/components/common";

function page() {
  return (
    <div className="mx-24">
      <div className="mt-36 grid grid-cols-7 items-center">
        <div className="col-span-4 flex flex-col space-y-6 p-6">
          <CustomChip label="Featured" width={80} />
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold leading-[50px]">
              A complete travel guide to Siesta & Longboat Key
            </h2>
            <p className="leading-7 text-gray-600">
              Repeatedly named the best beach in the country, it is baffling how
              discovered Siesta Key beach still is. The white sand against the
              crystal clear turquoise waters of the Gulf of Mexico is
              jaw-dropping enough but add in the lack of...
            </p>
            <CustomButton label="Read more" width={160} />
          </div>
        </div>
        <div className="relative col-span-3 h-full w-full">
          <Image
            alt="Coolvacay about us, second image"
            src="/blog_page_image.png"
            className="rounded-2xl"
            quality={100}
            fill
            priority={true}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-4 gap-8 py-10">
        {/* {Array.from({ length: 8 }, (_, i) => i + 1).map((card) => {
          return (
            <MainCard
              imageUrl="/blog_photo.jpeg"
              name="How to get more bookings with Coolvacay in 2024"
              subtitle="August 1, 2024  •  2 min read "
              key={card}
              isBlogCard
            />
          );
        })} */}
      </div>
    </div>
  );
}

export default page;
