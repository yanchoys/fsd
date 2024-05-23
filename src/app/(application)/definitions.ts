export interface ListingData {
  id: string;
  source: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  bathrooms: number;
  bedrooms: number;
  propertyType?: string;
  startRating: number | null;
  squareFeets?: number | undefined;
  price: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export type ListingCardProps = Pick<
  ListingData,
  "name" | "imageUrl" | "price"
> & { subtitle: string };

export type MainCardProps = Pick<
  ListingData,
  "name" | "imageUrl" | "propertyType" | "squareFeets"
> & { isBlogCard?: boolean; subtitle: string };

export interface PopularCategoriesData {
  id: number;
  name: string;
  iconName: string;
  iconUrl: string;
  alt: string;
  width: string;
  page: string;
}

export type MapboxMarkerData = Pick<
  ListingData,
  "id" | "name" | "city" | "state" | "price" | "latitude" | "longitude"
>;
