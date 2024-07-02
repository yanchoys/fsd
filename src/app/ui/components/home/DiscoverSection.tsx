import React from "react";
import Image from "next/image";

export function DiscoverSection() {
  return (
    <section className="flex max-h-[680px] shrink-0 grow-0 gap-12 py-14">
      <div className="flex h-[460px] w-[492px] shrink-0">
        <Image
          src="/discover_photo.png"
          alt="Discover more destinations"
          width={0}
          height={0}
          sizes="100vw"
          quality={90}
          style={{ height: "460px", width: "auto" }}
          className="rounded-[30px]"
        />
      </div>
      <div className="flex grow-0 flex-col justify-center gap-3">
        <div className="flex h-[44px] w-[90px] shrink-0 justify-center rounded-[64px] bg-[#29ABE2]/[.10] p-3 text-sm text-primary">
          Discover
        </div>
        <h1 className="font-500 leading-80 text-[32px] desktop:text-[46px] desktop:leading-[47px]">
          Explore vacation rentals with beach access
        </h1>
        <h4 className="font-500 text-md leading-7 desktop:text-base">
          Add to your vacation with amenities like direct beach access,
          oceanfront homes, pools, hot tubs, and pet-friendly stays.
        </h4>
        <h4 className="desktop:text-md font-400 text-sm leading-6 text-[#020101]/[.60]">
          With every coast comes a unique way to relax by the ocean. Enjoy the
          East Coast’s bustling boardwalks in Myrtle Beach or historic New
          England lighthouses. Reel in a trophy catch on the Gulf Coast or bring
          the kids snorkeling along the Florida Keys. Out on the West Coast,
          embark on an adventure hiking the Oregon Coast’s rugged trails, island
          hop along the San Juan Islands, or laze beside the Southern California
          Coast’s laidback surf. Skip the same old stretch of sand and find a
          new favorite beach hideaway.
        </h4>
        <button className="w-40 rounded-[48px] bg-primary px-6 py-4 text-white">
          More details
        </button>
      </div>
    </section>
  );
}
