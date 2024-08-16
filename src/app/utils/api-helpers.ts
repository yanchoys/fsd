import type { ErrorInterface } from "./definitions";
import { revalidatePath } from "next/cache";
import { FetchError } from "./definitions";
import { auth } from "~/auth";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORE_CASHE_IN_HOURS = 24;

//TODO:refactor headers
export async function createHeaders(contentType: string) {
  try {
    const session = await auth();
    const headers = {
      Authorization: `Bearer ${session?.user?.accessToken}`,
      "Content-Type": contentType,
    };
    return headers;
  } catch (err) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    return headers;
  }
}

export async function getFetch<T>(
  url: string,
  noCache = false,
): Promise<T | FetchError> {
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      cache: noCache ? "no-store" : "force-cache",
      headers: await createHeaders("application/json"),
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error ?? errorText.message);
    }
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      console.error(err, "err");
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function getHTMLFetch(url: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      headers: await createHeaders("text/html"),
    });
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText.error);
    }
    const data = await res.text();
    return data;
  } catch (err) {
    if (err instanceof FetchError) {
      return err;
    } else {
      console.error(err, "err");
      return new FetchError("An unknown error occurred");
    }
  }
}

export async function postFetch<T>(
  url: string,
  body:
    | Record<string, string | Record<string, string> | number | undefined>
    | FormData
    | T,
  method?: string,
): Promise<T | FetchError | null> {
  const session = await auth();

  const headers = new Headers({
    Authorization: `Bearer ${session?.user?.accessToken}`,
  });

  if (!(body instanceof FormData)) {
    headers.append("Content-Type", "application/json");
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api${url}`, {
      method: method ?? "POST",
      headers: headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    //if error in response,throw the custom error
    if (!res.ok) {
      const errResponse = await res.text();
      const errorText = JSON.parse(errResponse) as ErrorInterface;
      throw new FetchError(errorText?.error ?? errorText?.message);
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

export async function revalidateFetch<T>(
  url: string,
  revalidateInHours: number = STORE_CASHE_IN_HOURS,
): Promise<T | FetchError> {
  const seconds = revalidateInHours * 3600;
  try {
    const res = await fetch(`${API_BASE_URL}/api/${url}`, {
      next: { revalidate: seconds },
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

export async function getData<T>(
  url: string,
  errorMessage: string,
  noCache?: boolean,
) {
  try {
    const res = await getFetch<T>(url, noCache);
    if (res instanceof FetchError) {
      throw new Error(errorMessage);
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function postData<T>(
  url: string,
  values: Record<string, string> | FormData | T,
  errorMessage: string,
  method?: string,
  pathToRevalidate?: string,
) {
  try {
    const res = await postFetch<T>(url, values, method);
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    if (res instanceof FetchError) {
      throw res;
    }
  } catch (error) {
    if (error instanceof FetchError) {
      return `${error.message}`;
    } else {
      return errorMessage;
    }
  }
}
