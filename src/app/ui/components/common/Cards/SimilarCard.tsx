import Image from "next/image";
import type { TSimilarCardProps } from "~/app/(application)/definitions";

export default function SimilarCard({
  name,
  subtitle,
  imageUrl,
  numberOfGuests,
  bedrooms,
  bathrooms,
  price,
  className,
}: TSimilarCardProps & { className?: string }) {
  return (
    <div
      className={`flex h-[360px] grow-0  flex-col rounded-xl p-2 shadow-cardShadow md:h-[185px] md:w-[470px] md:flex-row ${className}`}
      style={{ border: "1px solid rgba(173, 181, 189, 0.70)" }}
    >
      <div className="h-[195px] w-[250px] md:flex md:h-[165px] md:w-[189px]">
        <Image
          src={imageUrl ?? "/cardImage.png"}
          width={0}
          height={0}
          sizes="100vw"
          alt="CoolVacay listing image"
          className="h-[195px] w-auto md:h-[165px]"
          style={{
            objectFit: "cover",
            borderRadius: 20,
          }}
        />
      </div>
      <div className={`flex grow flex-col justify-between gap-3 pl-2`}>
        <div className="pt-2">
          <div className="mb-1 text-base font-medium">{name}</div>
          <p className="text-sm text-[#676D73]">{subtitle}</p>
        </div>
        <h6 className="text-xs text-[#676D73]">
          {`${numberOfGuests} guests | ${bedrooms === 1 ? "1 bedroom" : bedrooms + " bedrooms"}  | ${bathrooms === 1 ? "1 bathroom" : bathrooms + " bathrooms"}`}
        </h6>
        {/* TODO: check if we will use the rating */}
        {/* <div className="flex gap-4">
          <div className="flex gap-2">
            <IconGenerator
              src="/yellow_star.svg"
              alt="Star icon"
              width="16px"
            />
            <h6 className="text-sm text-[#676D73]">4.8 total reviews</h6>{" "}
          </div>
        </div> */}
        <h6 className="text-lg text-[#3E4958]">From ${price} per night</h6>
      </div>
    </div>
  );
}
