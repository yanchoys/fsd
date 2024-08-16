import { getSimilarListings } from "~/app/(application)/actions";
import EmblaCarousel from "../Carousel/EmblaCarousel";

export default async function SimilarCards({
  pageParams,
}: {
  pageParams: {
    source: string;
    id: string;
  };
}) {
  const similarListings = (await getSimilarListings(pageParams))!;

  return similarListings ? (
    <EmblaCarousel data={similarListings} type="card" />
  ) : (
    "Cannot find similar homes at this moment"
  );
}
