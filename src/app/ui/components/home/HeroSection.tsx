import { SearchCard } from "./SearchCard";

export async function HeroSection() {
  return (
    <main className="absolute top-0 items-center text-white">
      <div className="flex max-w-[1220px] justify-between py-44">
        <div className="flex items-end justify-end font-medium">
          <div className="flex flex-col items-start gap-5">
            <div className="flex h-[40px] w-[248px] items-center justify-center rounded-full bg-white/[.28] px-[20px] py-[10px] backdrop-blur-sm">
              <p className="text-white">Making dreams a reality</p>
            </div>
            <h1 className="text-[80px] leading-[80px]">
              Find your perfect place now
            </h1>
            <div className="text-xl leading-[30px] tracking-[0.16px]">
              <p>Your personalized destination discovery platform.</p>
              <p>
                Explore, compare, and uncover your dream location effortlessly.
              </p>
            </div>
          </div>
        </div>
        <SearchCard />
      </div>
    </main>
  );
}
