import { Divider } from "@mui/material";

export function CardSkeleton() {
  return (
    <div
      className={`h-[340px] w-[290px] grow-0 animate-pulse overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex h-[210px] items-center justify-center truncate rounded-xl bg-white px-16 py-8" />
      <div className="flex flex-col">
        <div className="mx-2 my-4 flex h-14 grow rounded-md bg-gray-200" />
        <div className="flex gap-4">
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
          <div className="m-2 h-4 w-32 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
      </div>
    </div>
  );
}

export function FilteredListingSkeleton() {
  return (
    <div
      className={`flex h-[400px] w-[340px] flex-col gap-4 overflow-hidden rounded-xl sm:w-[280px] md:w-[350px]`}
    >
      <div
        className={`h-[330px] w-[340px] rounded-lg  bg-gray-100 p-2 shadow-sm sm:w-[270px] md:w-[350px]`}
      >
        <div className="flex h-[210px] w-full items-center justify-center rounded-xl bg-white py-8" />
        <div className="flex flex-col">
          <div className="mt-3 flex justify-between">
            <div className="m-1 h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
            <div className="m-1 h-4 w-24 rounded-md bg-gray-200 text-sm font-medium sm:w-20" />
          </div>
          <div className="mx-1 my-1 flex h-[52px] grow rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="border-primary-gray-200 rounded-full border bg-gray-100 py-6 font-bold text-primary" />
    </div>
  );
}

export function FeaturedListingsSkeleton() {
  return (
    <section className="block pb-10">
      <div className="flex justify-evenly gap-4">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((skeleton) => {
          return <CardSkeleton key={skeleton} />;
        })}
      </div>
    </section>
  );
}

export function AllListingsSkeleton() {
  return (
    <div className="desktop:grid-cols-4 grid grid-cols-3 gap-5 py-10">
      {Array.from({ length: 8 }, (_, i) => i + 1).map((skeleton) => {
        return <CardSkeleton key={skeleton} />;
      })}
    </div>
  );
}

export function FilteredListingsSkeleton() {
  return (
    <>
      <div className="flex gap-6">
        <div className="h-6 w-60 bg-gray-100" />
        <div className="h-4 w-12 bg-gray-100" />
      </div>
      <div className="flex animate-pulse flex-wrap items-center justify-center gap-5 xl:justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((skeleton) => {
          return <FilteredListingSkeleton key={skeleton} />;
        })}
      </div>
    </>
  );
}

export function MapSkeleton() {
  return <div className="sticky right-0 top-0 h-screen bg-gray-100" />;
}

export function PopularCategoriesSkeleton() {
  return (
    <div className="flex flex-wrap md:justify-between">
      {Array.from({ length: 7 }, (_, i) => i + 1).map((skeleton, index) => {
        return (
          <div
            key={skeleton}
            className={`${index > 0 && "ml-10"} flex w-32 shrink-0 grow-0 animate-pulse rounded-full bg-gray-100 p-6 shadow-sm`}
          />
        );
      })}
    </div>
  );
}

export function BookedListingCardSkeleton() {
  return (
    <div
      className={`flex h-[136px] w-full animate-pulse gap-6 rounded-xl border border-[#EAEAEF] p-3`}
    >
      <div className="flex h-[112px] w-[138px] rounded-lg bg-gray-100" />
      <div className="flex gap-16">
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Dates</div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-[74px] rounded bg-gray-100" /> -
            <div className="h-4 w-[74px] rounded bg-gray-100" />
          </div>
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Guests</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
        <div className={`flex flex-col justify-center gap-3`}>
          <div className="mb-1 text-base font-medium">Room type</div>
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function PricingDetailsSkeleton() {
  const rows = 5;
  const cols = 2;
  return (
    <div className="flex h-[210px] w-full animate-pulse flex-col gap-3 p-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-5">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="h-7 w-full rounded-lg bg-gray-100" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PersonalInformationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-[280px] bg-gray-100" />
      <div className="mt-12 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-10">
            <div className="h-[80px] w-[80px] rounded-full bg-gray-100" />
            <div className="flex flex-col">
              <div className="h-[22px] w-[120px] bg-gray-100" />
              <div className="mt-4 rounded-full border bg-gray-100 px-12 py-7" />
            </div>
          </div>
        </div>
        <div className="mb-8 flex flex-col">
          <div className="my-10 flex flex-col gap-5">
            {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => {
              return (
                <div className="flex w-full gap-5" key={i}>
                  <div className="relative w-[300px]">
                    <div className="mb-1 block h-[22px] w-[120px] bg-gray-100" />
                    <div className="h-[40px] w-[300px] bg-gray-100" />
                  </div>
                  <div className="relative w-[300px]">
                    <div className="mb-1 block h-[22px] w-[120px] bg-gray-100" />
                    <div className="h-[40px] w-[300px] bg-gray-100" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[200px] rounded-full border bg-gray-100 px-12 py-2 py-6 text-[#676D73]" />
        </div>
      </div>
    </div>
  );
}

export function ReservationCardsSkeleton() {
  return (
    <div className="mb-8 flex animate-pulse flex-col gap-8">
      <div className="h-8 w-[160px] bg-gray-100" />
      {Array.from({ length: 3 }, (_, i) => i + 1).map((i) => {
        return (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex gap-8">
              <div className="flex h-[130px] w-[180px] rounded-xl bg-gray-100" />
              <div className="flex w-full flex-col gap-2">
                <div className="h-8 w-[200px] bg-gray-300" />
                <div className="items-left flex h-[22px] gap-8">
                  <div className="flex h-[22px] w-[50px] shrink-0 items-center justify-center rounded-full bg-gray-300" />
                  <div className="h-[22px] w-20 bg-gray-300" />
                  <div className="h-[22px] w-20 bg-gray-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5  bg-gray-300" />
                    <div className="h-5 w-20  bg-gray-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5  bg-gray-300" />
                    <div className="h-5 w-20  bg-gray-300" />
                  </div>
                  <div className="mx-5 h-8 h-full w-[1px] bg-[#EAEAEF]" />
                  <div className="flex flex-col gap-2">
                    <div className="h-6 w-[120px] bg-gray-300" />
                    <div className="h-5 w-20  bg-gray-300" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-20  bg-gray-300" />
                    <div className="h-5 w-20  bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
            {i < 2 ? <Divider /> : null}
          </div>
        );
      })}
    </div>
  );
}
