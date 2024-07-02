"use server";

import { postFetch, getFetch } from "../utils/api-helpers";
import { FetchError } from "../utils/definitions";
import type { IPricingDetails } from "../ui/components/listing/BookNowSection";
export async function enquire(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await postFetch(`/listings`, {
      name: formData.get("name") as string,
      message: formData.get("message") as string,
      phone: formData.get("number") as string,
      email: formData.get("email") as string,
      id: formData.get("id") as string,
    });
  } catch (error) {
    console.error("Error:", error);
    return "Failed to send message";
  }
}

export interface PricingDetailsArgs {
  source: string;
  id: string;
  startDate: string;
  endDate: string;
  numberOfGuests: string;
}
export async function getPricingDetails(
  source: string,
  id: string,
  startDate: string,
  endDate: string,
  numberOfGuests: string,
) {
  try {
    const res = await getFetch<IPricingDetails>(
      `/Listings/${source}/${id}/priceDetails?startDate=${startDate}&endDate=${endDate}&numberOfGuests=${numberOfGuests}`,
    );
    if (res instanceof FetchError) {
      throw new Error("Failed to fetch listing data");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}
