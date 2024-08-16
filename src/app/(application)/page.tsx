import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AllListingsSkeleton,
  FeaturedListingsSkeleton,
  PopularCategoriesSkeleton,
} from "../ui/components/common/Skeletons/Skeletons";
import {
  BlogSection,
  AllistingsSection,
  HeroSection,
  PopularCategories,
  FeaturedListingsSection,
  DiscoverSection,
} from "../ui/components/home/index";
import { Newsletter, IconGenerator } from "../ui/components/common";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative -mt-24 flex h-[714px]">
        <div className="absolute flex h-[714px] w-full">
          <Image
            alt="Coolvacay background image"
            src="/landing_background.png"
            quality={80}
            fill
            priority={true}
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(60%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center p-4">
        <div className="max-w-[calc(100vw_-_32px)] items-center justify-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <div className="flex w-full items-center justify-center">
            <HeroSection />
          </div>
          <div className="w-full">
            <h1 className="p-1 text-[28px] sm:py-7">Popular Categories</h1>
            <Suspense fallback={<PopularCategoriesSkeleton />}>
              <PopularCategories />
            </Suspense>
            <h1 className="py-9 text-left text-[28px]">Featured Listings</h1>
            <Suspense fallback={<FeaturedListingsSkeleton />}>
              <FeaturedListingsSection />
            </Suspense>
          </div>
          <DiscoverSection />
          <section className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-[28px]">All listings</h1>
              <Link href="/listings" className="flex items-center text-primary">
                See all listings
                <span className="ml-2">
                  <IconGenerator src="/link.svg" width="13px" alt="link icon" />
                </span>
              </Link>
            </div>
            <Suspense fallback={<AllListingsSkeleton />}>
              <AllistingsSection page={1} />
            </Suspense>
            <Newsletter />
            <Suspense fallback={<AllListingsSkeleton />}>
              <AllistingsSection page={2} />
            </Suspense>
          </section>
          <Suspense fallback={<FeaturedListingsSection />}>
            <BlogSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
