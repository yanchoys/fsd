import { Suspense } from "react";
import Image from "next/image";

import AllistingsSection from "../ui/components/home/AllistingsSection";
import BlogSection from "../ui/components/home/BlogSection";
import DiscoverSection from "../ui/components/home/DiscoverSection";
import FeaturedListingsSection from "../ui/components/home/FeaturedListingsSection";
import HeroSection from "../ui/components/home/HeroSection";
import PopularCategories from "../ui/components/home/PopularCategories";
import {
  AllListingsSkeleton,
  FeaturedListingsSkeleton,
  PopularCategoriesSkeleton,
} from "../ui/components/common/Skeletons/Skeletons";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="relative flex h-[714px] w-full">
        <Image
          alt="Coolvacay background image"
          src="/landing_background.png"
          quality={100}
          fill
          priority={true}
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "brightness(60%)",
            zIndex: -1,
          }}
        />
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <HeroSection />
          <div className="w-full">
            <h1 className="py-7 text-[28px]">Popular Categories</h1>
            <Suspense fallback={<PopularCategoriesSkeleton />}>
              <PopularCategories />
            </Suspense>
            <h1 className="py-9 text-left text-[28px]">Featured Listings</h1>
            <Suspense fallback={<FeaturedListingsSkeleton />}>
              <FeaturedListingsSection />
            </Suspense>
          </div>
          <DiscoverSection />
          <Suspense fallback={<AllListingsSkeleton />}>
            <AllistingsSection />
          </Suspense>
          <BlogSection />
        </div>
      </div>
    </main>
  );
}
