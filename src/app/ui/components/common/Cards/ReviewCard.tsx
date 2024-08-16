import { IconGenerator } from "../IconGenerator";

export default function ReviewCard({
  title,
  size,
  description,
  iconSrc,
  iconDescription,
}: {
  title: string;
  description: string;
  size: "small" | "medium";
  iconSrc: string;
  iconDescription: {
    name: string;
    proffesion: string;
  };
}) {
  const isSmallSize = size === "small";
  return (
    <div
      className={`flex flex-col gap-5 rounded-lg border px-5 ${isSmallSize ? "bg-white py-7" : "bg-[#F7F7F7] py-10"}`}
    >
      <p className={`${isSmallSize ? "text-lg" : "text-xl"} font-medium`}>
        {title}
      </p>
      <p className={`${isSmallSize ? "text-sm" : "text-base"} text-[#676D73]`}>
        {/* TODO:replace with description */}
        {description}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh
        mauris, nec turpis orci lectus meacenas. Suspendisse sed magna eget nibh
        in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id
        augue sit cursus pellentesque enim arcu. Elementum felis magna pretium
        in tincidunt. Suspendisse sed magna eget nibh in turpis. Consequat duis
        diam lacus arcu.
      </p>
      <div className="flex items-center">
        <IconGenerator
          alt="avatar icon"
          src={iconSrc}
          width={`${isSmallSize ? "56px" : "72px"}`}
        />
        <div className="ml-4">
          <p
            className={`${isSmallSize ? "text-base" : "text-xl"}font-semibold`}
          >
            {iconDescription.name}
          </p>
          <p
            className={`${isSmallSize ? "text-sm" : "text-base"}text-[#676D73]`}
          >
            {iconDescription.proffesion}
          </p>
        </div>
      </div>
    </div>
  );
}
