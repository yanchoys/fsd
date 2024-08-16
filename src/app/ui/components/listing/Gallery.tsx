"use client";

import { useState } from "react";
import Image from "next/image";
import type { IListingData } from "~/app/(application)/definitions";
import FullScreenDialog from "../common/Dialogs/FullScreenDialog";
import { useAppSearchParams } from "~/context/SearchParamsContext";

export default function Gallery({ listing }: { listing: IListingData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateSearchParams } = useAppSearchParams();

  const handleClick = () => {
    updateSearchParams(["modal"], [`photoGallery`]);
  };

  return (
    <>
      {listing.images.length > 0 ? (
        <div className="relative w-full">
          {/* Mobile view: Show only one image */}
          <div className="block md:hidden">
            <div className="h-[300px] w-full overflow-hidden rounded-[8px]">
              <Image
                src={listing.images[0]?.url ?? ""}
                alt={listing.images[0]?.name ?? "Image name"}
                onClick={() => {
                  setIsModalOpen(true);
                  handleClick();
                }}
                sizes="100vw"
                width={640}
                height={500}
                quality={80}
                className="cursor-pointer"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <button
              className="absolute bottom-4 right-3 rounded-full bg-white px-[14px] py-[11px] text-sm font-medium text-[#29ABE2] hover:bg-primary hover:text-white"
              style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                handleClick();
              }}
            >
              Show all photos
            </button>
          </div>

          {/* Desktop view: Show grid of images */}
          <div className="hidden h-[470px] w-full grid-cols-4 grid-rows-2 gap-5 md:grid">
            {listing.images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} rounded-[8px]`}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  onClick={() => {
                    setIsModalOpen(true);
                    handleClick();
                  }}
                  sizes="100vw"
                  width={640}
                  height={500}
                  quality={index > 0 ? 40 : 80}
                  className="cursor-pointer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
            <button
              className="absolute bottom-4 right-3 rounded-full bg-white px-[14px] py-[11px] text-sm font-medium text-[#29ABE2] hover:bg-primary hover:text-white"
              style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                handleClick();
              }}
            >
              Show all photos
            </button>
          </div>
        </div>
      ) : (
        <p>This property has no images available at this moment</p>
      )}
      <FullScreenDialog
        listing={listing}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
