import type { ErrorInterface } from "./definitions";
import { FetchError } from "./definitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_CASHE_IN_HOURS = 24;

export async function getFetch<T>(
  url: string,
  noCache = false,
): Promise<T | FetchError> {
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      cache: noCache ? "no-store" : "force-cache",
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    const data = (await res.json()) as T;
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function postFetch<T>(
  url: string,
  body: Record<string, string | number | undefined>,
): Promise<T | FetchError | null> {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  try {
    const res = await fetch(`${API_BASE_URL}/api/${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    //if error in response,throw the custom error
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    //if successful response,return the data
    const text = await res.text();
    const data = text ? (JSON.parse(text) as T) : null;
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      return new FetchError("An unknown error occurred");
    }
  }
}

export const revalidateFetch = async (
  url: string,
  revalidateInHours: number = STORE_CASHE_IN_HOURS,
) => {
  const seconds = revalidateInHours * 3600;
  const data = await fetch(`${API_BASE_URL}/api/${url}`, {
    next: { revalidate: seconds },
  });
  return data;
};
