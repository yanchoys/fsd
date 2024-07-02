import Image from "next/image";

type PropType = {
  selected: boolean;
  image: {
    url: string;
    name: string;
  };
  onClick: () => void;
};

export const Thumb = ({ selected, image, onClick }: PropType) => {
  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image
          src={image.url}
          alt={image.name}
          sizes="100vw"
          width={112}
          height={75}
          quality={30}
          placeholder="blur"
          blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "3px",
            objectFit: "fill",
          }}
        />
      </button>
    </div>
  );
};
