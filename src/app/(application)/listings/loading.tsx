import { FilteredListingsSkeleton } from "~/app/ui/components/common/Skeletons/Skeletons";

export default function Loading() {
  return (
    <main className="static w-full animate-pulse pb-6 pl-[70px]">
      <div className="flex place-items-baseline gap-16 pb-6">
        <div className="h-8 w-96 rounded-md  bg-gray-100" />
        <div className="h-6 w-32 rounded-md bg-gray-100" />
      </div>
      <div className="flex">
        <div className="flex w-5/12 flex-col bg-white desktop:w-7/12">
          <FilteredListingsSkeleton />
        </div>
        <div className="sticky right-0 top-0 h-screen w-7/12 bg-gray-100 desktop:w-5/12" />
      </div>
    </main>
  );
}
