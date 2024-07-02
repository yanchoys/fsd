import {
  BookItNowSkeleton,
  BreadcrumbSkeleton,
  GallerySkeleton,
  OverviewSkeleton,
} from "~/app/ui/components/common/Skeletons/ListingSkeletons";

export default function Loading() {
  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center">
          <div className="w-full">
            <BreadcrumbSkeleton />
            <div className="mb-6 flex w-full justify-between">
              <div className="mt-3 h-9 w-[650px] bg-gray-100" />
            </div>
            <GallerySkeleton />
            <div className="flex gap-6 py-10">
              <OverviewSkeleton />
              <BookItNowSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
