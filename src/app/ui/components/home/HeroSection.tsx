import { SearchCard } from "./SearchCard";
import { getLocationsList } from "~/app/(application)/actions";

export async function HeroSection() {
  const locationsList = (await getLocationsList())!;

  return (
    <main className="absolute top-32 text-white md:top-44">
      <div className="justify-between md:flex md:max-w-[680px] md:px-6 lg:max-w-[920px] xl:max-w-[1220px]">
        <div className="flex items-end justify-end font-medium">
          <div className="flex flex-col justify-center gap-5 lg:items-start">
            <div className="hidden h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm md:flex">
              <p className="text-white">Making dreams a reality</p>
            </div>
            <h1 className="text-center text-[36px] leading-[43px] sm:text-left md:text-[80px] md:leading-[80px]">
              Find your perfect place now
            </h1>
            <div className="hidden text-xl leading-[30px] tracking-[0.16px] lg:block">
              <h1 className="text-[16px]">
                Your personalized destination discovery platform.
              </h1>
              <h2 className="text-[16px]">
                Explore, compare, and uncover your dream location effortlessly.
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:mt-0">
          <SearchCard size="big" locationsList={locationsList} />
        </div>
      </div>
    </main>
  );
}
