import Link from "next/link";
import { MainCard } from "../common";
import { getBlogs } from "~/app/(application)/actions";
import dayjs from "dayjs";

export async function BlogSection() {
  const blogs = (await getBlogs())!;

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
      <div className="no-scrollbar flex items-center gap-5 overflow-auto pb-10 sm:flex-row sm:flex-wrap sm:justify-between">
        {blogs.length > 0 ? (
          blogs.slice(0, 4).map((blog) => {
            return (
              <Link
                href={`/blog/${blog.id}`}
                key={blog.id}
                className="h-[340px]"
              >
                <MainCard
                  imageUrl={
                    blog.thumbnailImageUrl.length > 0
                      ? blog.thumbnailImageUrl
                      : "/blog_photo.jpeg"
                  }
                  name={
                    blog.title ??
                    "How to get more bookings with Coolvacay in 2024"
                  }
                  subtitle={`${dayjs(blog.createdOn).format("MMMM D, YYYY")}  •  ${blog.readTime} read `}
                  key={blog.id}
                  isBlogCard
                />
              </Link>
            );
          })
        ) : (
          <p>No blogs available at the moment</p>
        )}
      </div>
    </section>
  );
}
