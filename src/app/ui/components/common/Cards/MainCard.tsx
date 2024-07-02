import Image from "next/image";
import Link from "next/link";
import { IconGenerator } from "../IconGenerator";
import type { MainCardProps } from "~/app/(application)/definitions";

export default function MainCard({
  id,
  source,
  isBlogCard,
  name,
  subtitle,
  imageUrl,
  propertyType,
  squareFeets,
}: MainCardProps) {
  return (
    <Link href={`/listing/${source}/${id}`} className="h-82">
      <div
        className={`${!isBlogCard && "shadow-cardShadow"} flex h-full w-[280px] grow-0 flex-col overflow-hidden rounded-xl`}
        style={{
          border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
        }}
      >
        <div className="flex h-[210px] w-[278px]">
          <Image
            src={imageUrl ?? "/cardImage.png"}
            width={0}
            height={0}
            sizes="100vw"
            alt="CoolVacay listing image"
            style={{
              height: 210,
              width: isBlogCard ? "278px" : "auto",
              objectFit: "cover",
              borderRadius: isBlogCard ? 10 : 0,
            }}
          />
        </div>
        <div
          className={`${!isBlogCard && "px-2"} flex grow flex-col justify-between`}
        >
          <div className="pb-3 pt-2">
            <div className="mb-1 text-base font-medium">{name}</div>
            <p className="text-sm text-[#676D73]">{subtitle}</p>
          </div>
          {!isBlogCard && (
            <div className="flex gap-4 pb-4">
              <div className="flex gap-2">
                <IconGenerator
                  src="/cabin_icon.svg"
                  alt="Cabin icon"
                  width="16px"
                />
                <h6 className="text-sm">{propertyType}</h6>
              </div>
              <div className="flex gap-2">
                <IconGenerator
                  src="/square_foot_icon.svg"
                  alt="Square foot"
                  width="16px"
                />
                <h6 className="text-sm">{`${Math.floor(squareFeets ?? 0)} sqft`}</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
