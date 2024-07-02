"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import type { ListingData } from "~/app/(application)/definitions";
import FullScreenDialog from "../common/Dialogs/FullScreenDialog";

export default function Gallery({ listing }: { listing: ListingData }) {
  const photoParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preloadRoute = (url: number | string = "") => {
    const params = new URLSearchParams(photoParams.toString());
    if (url) {
      params.set("query", `photoGallery=${url}`);
    }
    // const newUrl = `${pathname}?${params.toString()}`;
    // router.replace(newUrl); // Prefetch the route
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };
  //TODO: refactor code
  //previously set a param to load faster
  const handleClick = (url: number | string = "") => {
    const params = new URLSearchParams(photoParams);
    if (url) {
      params.set("query", `photoGallery=${url}`);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="relative grid h-[470px] w-full grid-cols-4 grid-rows-2 gap-5">
        {listing.images.map((image, index) => {
          if (index < 5) {
            return (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} rounded-[8px]`}
              >
                <Image
                  key={index}
                  src={image.url}
                  alt={image.name}
                  onClick={() => {
                    setIsModalOpen(true);
                    preloadRoute(index + 1); // Prefetch the route before navigating
                    handleClick(index + 1);
                  }}
                  sizes="100vw"
                  width={640}
                  height={500}
                  quality={index > 0 ? 40 : 80}
                  className="cursor-pointer"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          }
        })}
        <button
          className="absolute bottom-4 right-3 rounded-full bg-white px-[14px] py-[11px] text-sm font-medium text-[#29ABE2] hover:bg-primary hover:text-white"
          style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
            handleClick(1);
          }}
        >
          Show all photos
        </button>
      </div>
      <FullScreenDialog
        handleClick={handleClick}
        listing={listing}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
