import BookedListingCard from "~/app/ui/components/common/Cards/BookedListingCard/BookedListingCard.server";
import { Breadcrumbs } from "~/app/ui/components/common";
import { FormProvider } from "./FormContext";
import { Suspense } from "react";
import { BookedListingCardSkeleton } from "~/app/ui/components/common";
import { PricingDetailsCardSkeleton } from "~/app/ui/components/common/Skeletons/ListingSkeletons";
import PricingDetailsCard from "~/app/ui/components/listing/PricingDetailsCard/PricingDetails.server";

//TODO: add a loading page
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    source: string;
    id: string;
  };
}) {
  return (
    <main className="flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="flex w-full max-w-[calc(100vw_-_32px)] grow flex-col items-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <div className="mb-12 flex w-full flex-col gap-3">
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: "Booking",
                  href: `/listing/${params.source}/${params.id}`,
                },
                {
                  label: "Payment",
                  href: `/book/${params.source}/${params.id}/billing-address`,
                  active: true,
                },
              ]}
            />
            <div className="flex flex-col-reverse gap-5 lg:flex-row">
              <div className="flex w-full flex-col gap-5">
                <div className="md:hidden lg:flex lg:flex-col lg:gap-4">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    Reserve Information
                  </h1>
                  <Suspense fallback={<BookedListingCardSkeleton />}>
                    <BookedListingCard params={params} />
                  </Suspense>
                </div>
                <FormProvider>{children}</FormProvider>
              </div>
              <div className="flex shrink-0 flex-row gap-4">
                <div className="hidden gap-4 md:flex md:flex-col lg:hidden">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    Reserve Information
                  </h1>
                  <Suspense fallback={<BookedListingCardSkeleton />}>
                    <BookedListingCard params={params} />
                  </Suspense>
                </div>
                <Suspense fallback={<PricingDetailsCardSkeleton />}>
                  <PricingDetailsCard params={params} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
