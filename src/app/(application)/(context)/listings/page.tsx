import { getCategories, getLocationsList } from "../../actions";
import Body from "~/app/ui/components/listings/Body";
export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams);
  const locationsList = (await getLocationsList())!;
  const categories = (await getCategories())!;

  return (
    <Body
      query={query}
      searchParams={searchParams}
      locationsList={locationsList}
      categories={categories}
    />
  );
}
