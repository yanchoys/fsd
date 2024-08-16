"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dayjs from "dayjs";
export interface ISearchParams {
  fromDate: dayjs.Dayjs | null;
  toDate: dayjs.Dayjs | null;
  numberOfGuests: string;
  category: string;
  match: string;
  modal: string;
  pageNum: string;
  isMapMode: string;
}
import type { DateRangeType } from "~/app/ui/components/home/SearchCard";
interface SearchParamsContextType {
  searchParamsValues: ISearchParams;
  updateSearchParams: (
    params: string[],
    values: string[] | DateRangeType,
  ) => void;
  searchParams: URLSearchParams;
}

const SearchParamsContext = createContext<SearchParamsContextType | undefined>(
  undefined,
);

export const SearchParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const readOnlySearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useMemo(() => {
    return new URLSearchParams(readOnlySearchParams.toString());
  }, [readOnlySearchParams]);

  const toDate = dayjs(searchParams.get("toDate"));

  const [searchParamsValues, setSearchParams] = useState<ISearchParams>({
    fromDate: searchParams.get("fromDate")
      ? dayjs(searchParams.get("fromDate"))
      : null,
    toDate: searchParams.get("toDate") ? toDate : null,
    numberOfGuests: searchParams.get("numberOfGuests") ?? "",
    match: searchParams.get("match") ?? "",
    category: searchParams.get("category") ?? "",
    modal: searchParams.get("modal") ?? "",
    pageNum: searchParams.get("pageNum") ?? "",
    isMapMode: searchParams.get("isMapMode") ?? ""
  });

  const updateSearchParams = useCallback(
    (params: string[], values: string[] | DateRangeType) => {
      params.forEach((param, index) => {
        if (typeof values[index] !== "string") {
          if (values[index] !== null) {
            searchParams.set(
              param,
              (values[index] as dayjs.Dayjs)?.format("YYYY-MM-DD"),
            );
          } else {
            searchParams.delete(param);
          }
        } else {
          if (values[0] !== "") {
            searchParams.set(param, values[index] as string);
          } else {
            searchParams.delete(param);
          }
        }
        setSearchParams((prevParams) => ({
          ...prevParams,
          [param]: values[index],
        }));
        router.push(`${pathname}?${searchParams.toString()}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <SearchParamsContext.Provider
      value={{ searchParamsValues, updateSearchParams, searchParams }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useAppSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useAppSearchParams must be used within a SearchParamsProvider",
    );
  }
  return context;
};
