import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../ui/components/common/CustomButton";
import { CustomChip, MainCard } from "~/app/ui/components/common";
import { getBlogs } from "../actions";
import dayjs from "dayjs";

async function Page() {
  const blogs = (await getBlogs())!;
  const featuredBlog = blogs.find((blog) => blog.isFeatured);

  return (
    <main className="flex flex-col w-full">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-[1220px] flex-col items-center justify-center w-full">
          {featuredBlog && (
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-20">
              <div className="flex flex-col gap-5 max-w-full md:max-w-[50%]">
                <CustomChip label="Featured" width={80} />
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl md:text-[50px] font-medium leading-tight md:leading-[67px]">
                    {featuredBlog?.title}
                  </h2>
                  <p className="mb-2 text-sm md:text-base leading-[22px] md:leading-[30px] text-gray-600">
                    {featuredBlog?.description.substr(0, 350) + "\u2026"}
                  </p>
                  <Link href={`/blog/${featuredBlog.id}`}>
                    <CustomButton label="Read more" width={160} />
                  </Link>
                </div>
              </div>
              <div className="flex w-full md:w-auto">
                <Image
                  alt="Blog image"
                  src={featuredBlog?.thumbnailImageUrl}
                  className="rounded-2xl object-cover hidden md:inline-block"
                  quality={90}
                  width={530}
                  height={370}
                  sizes="100vw"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          )}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 py-10">
            {blogs
              .filter((blog) => blog.id !== featuredBlog?.id)
              .map((card) => {
                return (
                  <Link
                    key={card.id}
                    href={`/blog/${card.id}`}
                    className="h-full"
                  >
                    <MainCard
                      imageUrl={card.thumbnailImageUrl}
                      name={card.title}
                      subtitle={`${dayjs(card.createdOn).format("MMMM d, YYYY")}  •  ${card.readTime} min`}
                      key={card.id}
                      isBlogCard
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;