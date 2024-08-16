"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Thumb } from "./EmblaCarouselThumbsButton";
import type { IListingData } from "~/app/(application)/definitions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SimilarCard } from "../../common";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

type CarouselType = {
  data: IListingData["images"] | IListingData[];
  type: "image" | "card";
};

const EmblaCarousel = ({ data, type }: CarouselType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollTo(selectedIndex);
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, selectedIndex, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
    setSelectedIndex(selectedIndex - 1);
  }, [emblaMainApi, selectedIndex]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
    setSelectedIndex(selectedIndex + 1);
  }, [emblaMainApi, selectedIndex]);

  return (
    <div className="embla">
      <div className="no-scrollbar flex h-full flex-col overflow-hidden lg:items-center lg:justify-between">
        <div className="flex h-full items-center">
          <div className="grid grid-cols-24">
            <div
              className={`grid ${type === "image" ? "hidden md:col-span-1 md:grid lg:col-span-2" : "col-span-1"}`}
            >
              <button aria-label="back arrow button" onClick={scrollPrev}>
                {type === "image" ? (
                  <KeyboardArrowLeftIcon className="hover:text-primary md:h-[50px] md:w-full lg:h-[70px] lg:w-[70px]" />
                ) : (
                  <ArrowCircleLeftOutlinedIcon className="hidden md:block md:size-[32px] lg:size-[42px]" />
                )}
              </button>
            </div>
            <div
              className={`grid ${type === "image" ? "col-span-24 md:col-span-22 lg:col-span-20" : "col-span-22 ml-3"}`}
            >
              <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                  {type === "image"
                    ? (data as IListingData["images"]).map((image, index) => (
                        <div className="embla__slide" key={index + 1}>
                          <div className="embla__slide__number">
                            {
                              <Image
                                key={index + 1}
                                src={image.url}
                                alt={image.name}
                                placeholder="blur"
                                sizes="100vw"
                                width={300}
                                height={200}
                                quality={90}
                                className="h-full w-full md:rounded md:rounded-xl"
                                blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
                                style={{ objectFit: "cover" }}
                              />
                            }
                          </div>
                        </div>
                      ))
                    : (data as IListingData[]).map((listing, index) => {
                        return (
                          <Link
                            key={listing.id}
                            href={`/listing/${listing.source}/${listing.id}`}
                            className="h-[420px] md:h-[185px]"
                          >
                            <SimilarCard
                              key={index}
                              name={listing.name}
                              subtitle={`${listing.city}, ${listing.state}`}
                              imageUrl={listing.imageUrl}
                              numberOfGuests={listing.numberOfGuests}
                              bedrooms={listing.bedrooms}
                              bathrooms={listing.bathrooms}
                              price={listing.price}
                              className="snap-start"
                            />
                          </Link>
                        );
                      })}
                </div>
              </div>
            </div>
            <div
              className={`grid content-center justify-items-end ${type === "image" ? "hidden md:col-span-1 md:grid lg:col-span-2" : "col-span-1"}`}
            >
              <button aria-label="back arrow button" onClick={scrollNext}>
                {type === "image" ? (
                  <KeyboardArrowRightIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
                ) : (
                  <ArrowCircleRightOutlinedIcon className="hidden md:block md:size-[32px] lg:size-[42px]" />
                )}
              </button>
            </div>
          </div>
        </div>
        {type === "image" ? (
          <div className="flex w-full items-center justify-center gap-5 md:hidden">
            <div className="flex items-center">
              <button aria-label="back arrow button" onClick={scrollPrev}>
                <KeyboardArrowLeftIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
              </button>
            </div>
            <p className="flex w-[100px] justify-center gap-5">{`${selectedIndex} / ${data.length}`}</p>
            <div className="flex items-center">
              <button aria-label="forward arrow button" onClick={scrollNext}>
                <KeyboardArrowRightIcon className="h-[50px] w-full hover:text-primary lg:h-[70px] lg:w-[70px]" />
              </button>
            </div>
          </div>
        ) : null}
        {type === "image" ? (
          <div className="embla-thumbs">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
              <div className="embla-thumbs__container">
                {(data as IListingData["images"]).map((image, index) => (
                  <Thumb
                    key={index}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    image={image}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmblaCarousel;
