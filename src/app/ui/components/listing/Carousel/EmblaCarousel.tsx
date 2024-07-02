import React, { useState, useEffect, useCallback } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { Thumb } from "./EmblaCarouselThumbsButton";
import type { ListingData } from "~/app/(application)/definitions";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  images: ListingData["images"];
  slideNr: number;
  handleClick: (url?: number | string) => void;
};

const EmblaCarousel: React.FC<PropType> = ({
  options,
  images,
  slideNr,
  handleClick,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    startIndex: 4,
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
    emblaMainApi.scrollTo(slideNr - 1);
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect, slideNr]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <div className="embla">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-12">
          <div className="col-span-1 grid content-center desktop:col-span-2 ">
            <button aria-label="back arrow button" onClick={scrollPrev}>
              <KeyboardArrowLeftIcon className="h-[70px] w-[70px] hover:text-primary" />
            </button>
          </div>
          <div className="col-span-10 desktop:col-span-8">
            <div className="embla__viewport" ref={emblaMainRef}>
              <div className="embla__container">
                {images.map((image, index) => (
                  <div className="embla__slide" key={index + 1}>
                    <div className="embla__slide__number">
                      {
                        <Image
                          key={index + 1}
                          src={image.url}
                          alt={image.name}
                          placeholder="blur"
                          sizes="100vw"
                          width={640}
                          height={500}
                          quality={90}
                          blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 grid content-center justify-items-end  desktop:col-span-2 ">
            <button aria-label="next arrow button" onClick={scrollNext}>
              <KeyboardArrowRightIcon className="h-[70px] w-[70px] hover:text-primary" />
            </button>
          </div>
        </div>
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {images.map((image, index) => (
                <Thumb
                  key={index}
                  onClick={() => {
                    handleClick(index + 1);
                    onThumbClick(index);
                  }}
                  selected={index === selectedIndex}
                  image={image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
