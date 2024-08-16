import Image from "next/image";
import { getListingData } from "~/app/(application)/actions";
import { Content } from "./BookedListingCard.client";

export default async function BookedListingCard({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const listing = (await getListingData(params))!;

  return (
    <div
      className={`flex h-min w-full gap-6 rounded-xl border border-[#EAEAEF] p-3 md:flex-col lg:flex lg:w-full lg:flex-row lg:items-center`}
    >
      <div className="flex h-[186px] w-full lg:h-[112px] lg:w-[138px]">
        <Image
          src={listing?.imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="Property image"
          className="h-[186px] w-full rounded-lg lg:h-[112px]"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Content listing={listing} />
    </div>
  );
}
