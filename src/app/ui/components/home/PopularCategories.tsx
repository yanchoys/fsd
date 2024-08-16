import Link from "next/link";
import { IconGenerator } from "../common";
import { getCategories } from "~/app/(application)/actions";

export async function PopularCategories() {
  const popularCategories = await getCategories();

  if (!popularCategories) {
    return <div>No Popular Categories</div>;
  }

  return (
    <div className="no-scrollbar flex justify-between gap-5 overflow-auto will-change-scroll md:justify-between md:gap-0">
      {popularCategories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          {/* Large screen view */}
          <button
            className={`hidden rounded-full bg-[#F7F7F7] p-2 text-sm lg:flex lg:p-3 lg:text-sm xl:p-4 xl:text-base`}
          >
            <Link href={category.page} className="flex items-center">
              <span className="mr-2 flex lg:mr-4">
                <IconGenerator
                  src={category.iconUrl}
                  width={category.width}
                  alt={category.alt}
                />
              </span>
              {category.name}
            </Link>
          </button>

          {/* Small screen view */}
          <div className="mt-6 flex snap-start flex-col items-center gap-x-4 sm:mt-0 lg:hidden">
            <Link
              href={category.page}
              className="flex scroll-mr-2 flex-col items-center"
            >
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7] p-3">
                <span className="flex">
                  <IconGenerator
                    src={category.iconUrl}
                    width={category.width}
                    alt={category.alt}
                  />
                </span>
              </button>
              <p className="mt-2 text-center text-xs">{category.name}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
