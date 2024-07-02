import Link from "next/link";

import { revalidateFetch } from "../../../utils/api-helpers";
import type { PopularCategoriesData } from "../../../(application)/definitions";
import { IconGenerator } from "../common";
import { FetchError } from "~/app/utils/definitions";

async function getCategories() {
  try {
    const res = await revalidateFetch("categories");
    if (res instanceof FetchError) {
      throw new Error("Failed to load popular categories");
    }
    return res.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function PopularCategories() {
  const popularCategories = (await getCategories()) as PopularCategoriesData[];
  return (
    <div className="flex flex-wrap md:justify-between">
      {popularCategories
        ? popularCategories.map((categorie, index) => (
            <Link key={categorie.id} href={categorie.page}>
              <button
                key={categorie.id}
                className={`${index > 0 && "ml-10"} flex shrink-0 grow-0 rounded-full bg-[#F7F7F7] p-4`}
              >
                {
                  <span className="mr-4 flex">
                    {
                      <IconGenerator
                        src={categorie.iconUrl}
                        width={categorie.width}
                        alt={categorie.alt}
                      />
                    }
                  </span>
                }
                {categorie.name}
              </button>
            </Link>
          ))
        : "No Popular Categories"}
    </div>
  );
}
