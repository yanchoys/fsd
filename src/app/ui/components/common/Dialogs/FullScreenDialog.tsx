"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, Divider } from "@mui/material";
import { useAppSearchParams } from "~/context/SearchParamsContext";

import type { IListingData } from "~/app/(application)/definitions";
import EmblaCarousel from "../../listing/Carousel/EmblaCarousel";
import CloseIcon from "@mui/icons-material/Close";
import "../../listing/Carousel/embla.css";
import { useMediaQuery } from "@mui/material";

export default function FullScreenDialog({
  listing,
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  listing: IListingData;
}) {
  const fullScreenModal = useMediaQuery("(max-width:640px)");

  const { updateSearchParams, searchParams } = useAppSearchParams();

  //TODO: replace params with Link, check Link options
  useEffect(() => {
    setIsModalOpen(
      searchParams?.get("modal")?.includes("photoGallery") ?? false,
    );
  }, [searchParams, setIsModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    updateSearchParams(["modal"], [""]);
  };

  return (
    <Dialog
      maxWidth="lg"
      fullScreen={fullScreenModal}
      open={isModalOpen}
      onClose={handleClose}
      className="sm:h-screen"
    >
      <div className="flex justify-between p-4 sm:p-6">
        <h1 className="text-lg font-medium sm:text-2xl	">{listing.name}</h1>
        <button onClick={handleClose} className="hover:text-primary">
          <CloseIcon className="text-[14px] sm:text-[25px]" />
        </button>
      </div>
      <Divider className="text-[#EAEAEF]" />
      <DialogContent className="px-0 md:mx-6 md:pb-6 md:pt-2">
        <EmblaCarousel data={listing.images} type="image" />
      </DialogContent>
    </Dialog>
  );
}
