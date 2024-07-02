import BookedListingCard from "~/app/ui/components/common/Cards/BookedListingCard";
import { Breadcrumbs } from "~/app/ui/components/common";
import BookNow from "~/app/ui/components/listing/BookNowSection";
import { FormProvider } from "./FormContext";
import { getFetch } from "~/app/utils/api-helpers";
import { FetchError } from "~/app/utils/definitions";
import type { ListingData } from "~/app/(application)/definitions";

async function getListingData({ source, id }: { source: string; id: string }) {
  try {
    const res = await getFetch<ListingData>(`/Listings/${source}/${id}`);
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

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
  const listing = (await getListingData(params))!;

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] grow flex-col items-center">
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
            <div className="flex gap-5">
              <div className="flex w-full flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold">Reserve Information</h3>
                  <BookedListingCard listing={listing} />
                </div>
                <FormProvider>{children}</FormProvider>
              </div>
              <div className="flex shrink-0 flex-col gap-4">
                <BookNow params={params} listing={listing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
