import { MainCard } from "../common";

//TODO:make blogSection dynamic
export function BlogSection() {
  return (
    <section className="flex w-full flex-col">
      <div className="flex flex-col items-center">
        <div className="flex h-[33px] w-[62px] shrink-0 items-center justify-center rounded-[64px] bg-[#29ABE2]/[.10] p-3 text-sm text-primary">
          Blog
        </div>
        <h1 className="py-4 text-center text-[56px] leading-[67px]">
          Latest blog from us
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 pb-12 pt-10 desktop:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((card) => {
          return (
            <MainCard
              id="static-id"
              source={""}
              imageUrl="/blog_photo.jpeg"
              name="How to get more bookings with Coolvacay in 2024"
              subtitle="August 1, 2024  •  2 min read "
              key={card}
              isBlogCard
            />
          );
        })}
      </div>
    </section>
  );
}
