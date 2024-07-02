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
  images: {
    url: string;
    name: string;
  }[];
  amenities: string[];
  numberOfGuests: number;
}

export type ListingCardProps = Pick<
  ListingData,
  "name" | "imageUrl" | "price" | "id" | "source"
> & { subtitle: string };

export type MainCardProps = Pick<
  ListingData,
  "name" | "imageUrl" | "propertyType" | "squareFeets" | "id" | "source"
> & { isBlogCard?: boolean; subtitle: string };

export type SimilarCardProps = MainCardProps &
  Pick<ListingData, "bedrooms" | "bathrooms" | "numberOfGuests" | "price">;

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

export type UserData = {
  accessToken: string;
  accessTokenExpiresAt: string;
  profile: {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    dateOfBirth: string;
    gender: string;
  };
};
