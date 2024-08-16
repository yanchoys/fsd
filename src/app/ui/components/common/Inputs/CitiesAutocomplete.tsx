"use client";

import { FormControl, Box, Autocomplete, TextField } from "@mui/material";
import type {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import { IconGenerator } from "../IconGenerator";
import type { ILocationsList } from "~/app/(application)/definitions";

export interface CustomHTMLAttributes
  extends React.HTMLAttributes<HTMLLIElement> {
  key?: React.Key;
}

export default function CitiesAutocomplete({
  locationsList,
  isSmallSize,
  onChange,
  inputValue,
  value,
  setValue,
  variant,
  className,
}: {
  locationsList: readonly ILocationsList[];
  isSmallSize?: boolean;
  variant: "white" | "blue";
  inputValue: string;
  value: ILocationsList | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  onChange: (
    event: React.SyntheticEvent,
    value: ILocationsList | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ILocationsList> | undefined,
  ) => void | undefined;
}) {
  const whiteVariant = variant === "white";

  return (
    <FormControl fullWidth={whiteVariant} className={className}>
      <Autocomplete
        id="location-select"
        options={locationsList}
        autoHighlight
        popupIcon={
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            className={`${!whiteVariant ? "mr-2" : ""} ${!isSmallSize ? "w-6 sm:w-8" : "w-[18px]"}`}
          />
        }
        getOptionLabel={(option) => option.displayName}
        inputValue={inputValue}
        onChange={onChange}
        value={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        renderOption={(props: CustomHTMLAttributes, option: ILocationsList) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={`${option.id} - ${key}`}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <IconGenerator
                className={whiteVariant ? "w-4 sm:w-5" : "w-4"}
                src="/location-pin.svg"
                alt={option.displayName}
              />
              {option.displayName}
            </Box>
          );
        }}
        ListboxProps={{
          sx: {
            fontSize: whiteVariant ? "16px" : "14px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={whiteVariant ? "Location" : null}
            variant="standard"
            placeholder="Select Location"
            inputProps={{
              ...params.inputProps,
            }}
            InputLabelProps={{
              className: whiteVariant
                ? `block ${isSmallSize ? "text-base" : "sm:text-2xl text-xl"} font-medium`
                : ``,
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                padding:
                  isSmallSize && !whiteVariant
                    ? "0px 50px"
                    : isSmallSize && whiteVariant
                      ? "0px"
                      : "14px 65px 14px 0px !important",
                fontWeight: whiteVariant ? 500 : 400,
              },
              className: whiteVariant
                ? `${isSmallSize ? "text-xs" : "sm:text-xl text-base"}`
                : `pl-3 bg-[#EAF7FD] ${isSmallSize ? "text-xs" : "text-xl"} text-[#212529] h-9 text-sm rounded-full border border-[#EAEAEF]`,
              startAdornment: (
                <IconGenerator
                  alt="Location Icon"
                  src="/location-pin.svg"
                  className={`${isSmallSize ? "right-[2px] w-4" : "left-0 top-3 w-5 sm:w-7"} mr-2`}
                />
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
