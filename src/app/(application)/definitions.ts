export interface IListingData {
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
  starRating: number | null;
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
  cancellationPolicy: string;
  houseRules: string;
}

export interface IAllListings {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: IListingData[];
}

export type ListingCardProps = Pick<
  IListingData,
  "name" | "imageUrl" | "price" | "id" | "source"
> & {
  subtitle: string;
  starRating?: number | null;
  closeDates?: {
    startDate: string;
    endDate: string;
    nrOfNights: number;
  }[];
};

export type TMainCardProps = Pick<
  IListingData,
  "name" | "imageUrl" | "propertyType" | "squareFeets"
> & { isBlogCard?: boolean; subtitle: string };

export type TSimilarCardProps = TMainCardProps &
  Pick<IListingData, "bedrooms" | "bathrooms" | "numberOfGuests" | "price">;

export interface IPopularCategoriesData {
  id: number;
  name: string;
  iconName: string;
  iconUrl: string;
  alt: string;
  width: string;
  page: string;
}

export type TMapboxMarkerData = Pick<
  IListingData,
  | "id"
  | "name"
  | "city"
  | "state"
  | "price"
  | "latitude"
  | "longitude"
  | "source"
>;

export type TUserData = {
  accessToken: string;
  accessTokenExpiresAt: string;
  signedInWith: string;
  profile: {
    id: number | string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    nationality: string;
    dateOfBirth: string;
    creationDate: string;
    gender: string;
    profilePicture: string;
  };
};
export interface IParams {
  source?: string;
  id?: string;
}

export interface IInquireArgs {
  name?: string;
  message?: string;
  phone?: string;
  email?: string;
  propertySource?: string;
  propertyId?: string;
}

export interface IProfileDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  nationality?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface IBookingPaymentArgs {
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  listingId?: string;
  source?: string;
  fromDate?: string;
  toDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  pets?: number;
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardHolderName: string;
  };
}

export interface IPassArgs {
  userId?: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface IPricingDetailsArgs {
  source: string;
  id: string;
  startDate: string;
  endDate: string;
  numberOfGuests: string;
}

export interface ICountries {
  id: string;
  name: string;
  states:
    | {
        id: string;
        name: string;
      }[]
    | [];
}

export interface ILocationsList {
  id: number;
  icon: string;
  match: string;
  displayName: string;
}

export interface IReservationsDetails {
  id: number;
  userId: number;
  listingId: string;
  email: string;
  source: string;
  fromDate: string;
  toDate: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  status: number;
  details: {
    listingId: string;
    listingSource: string;
    listingName: string;
    listingImage: string;
    listingType: string;
    squareFeets: number | null;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    fromDate: string;
    toDate: string;
    totalPrice: number;
  };
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  thumbnailImageUrl: string;
  readTime: string;
  createdOn: string;
  relatedLocation: string;
}

export interface IPropertyAvailability {
  from: string;
  to: string;
  availabilityArray: {
    date: string;
    isAvailable: boolean;
  }[];
}

export interface ICloseDatesListings {
  listingId: string;
  availableDates: {
    startDate: string;
    endDate: string;
    nrOfNights: number;
  }[];
  listing: IListingData;
}
