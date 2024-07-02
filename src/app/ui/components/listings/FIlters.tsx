"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import dayjs, { type Dayjs } from "dayjs";

import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

import { capitalize } from "~/app/utils/helpers";
import { IconGenerator, SimpleInput, SimpleSelectInput } from "../common";
import type { DateRangeType } from "../home/SearchCard";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const newParams = new URLSearchParams(searchParams);
    return newParams;
  }, [searchParams]);
  const pathname = usePathname();

  const endDate =
    params.get("ToDate") !== null
      ? dayjs(params.get("ToDate"))
      : dayjs().add(6, "day");
  const [dates, setDates] = useState<DateRangeType>([
    dayjs(params.get("FromDate") ?? undefined),
    endDate,
  ]);
  const [numberOfGuests, setNumberOfGuests] = useState(
    params.get("NumberOfGuests") ?? "1",
  );

  const title =
    params.get("category") ??
    (params?.get("Match") && capitalize(params.get("Match")!));
  const [location, setLocation] = useState(title);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("Match", term);
    } else {
      params.delete("Match");
      params.delete("category");
    }
    router.replace(`/listings?${params.toString()}`);
  }, 300);

  const updateSearchParams = useCallback(
    (param: string, value: string) => {
      params.delete(param);
      if (value) {
        params.append(param, value);
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      }
    },
    [pathname, router, params],
  );
  const [fromDate, toDate] = dates;

  useEffect(() => {
    fromDate && updateSearchParams("FromDate", fromDate.format("YYYY-MM-DD"));
  }, [updateSearchParams, fromDate]);
  useEffect(() => {
    toDate && updateSearchParams("ToDate", toDate.format("YYYY-MM-DD"));
  }, [updateSearchParams, toDate]);

  useEffect(() => {
    updateSearchParams("NumberOfGuests", numberOfGuests);
  }, [updateSearchParams, numberOfGuests]);

  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="relative">
        <SimpleInput
          name="location"
          value={location ?? ""}
          placeholder="Enter location"
          variant="rounded"
          styles={"bg-[#EAF7FD] text-[#212529] h-9 text-sm"}
          onChange={(e) => {
            handleSearch(e.target.value);
            setLocation(e.target.value);
          }}
        />
        <button
          className="absolute right-4 top-[5px] text-[#B4CAE4]"
          onClick={() => {
            setLocation("");
            params.delete("Match");
            router.replace(`/listings?${params.toString()}`);
          }}
        >
          ×
        </button>
      </div>
      <div className="relative w-[200px]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            name="allowedRange"
            value={dates}
            format="MMM DD"
            className="rounded-full border border-[#EAEAEF]"
            onChange={(newValue) => setDates(newValue as [Dayjs, Dayjs])}
            slotProps={{
              textField: {
                variant: "standard",
                color: "primary",
                InputProps: {
                  sx: {
                    fontSize: "14px",
                    fontWeight: 400,
                    width: "200px",
                    display: "flex",
                    pl: "15px",
                    backgroundColor: "#EAF7FD",
                    height: "36px",
                    borderRadius: "300px",
                    cursor: "pointer",
                  },
                  endAdornment: (
                    <IconGenerator
                      src="/down-arrow-light.svg"
                      alt="Down arrow"
                      width="16px"
                      className="mr-2"
                    />
                  ),
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <SimpleSelectInput
          value={numberOfGuests ?? "1"}
          onChange={(e: SelectChangeEvent<string>) =>
            setNumberOfGuests(e.target.value)
          }
        />
      </div>
    </div>
  );
}
