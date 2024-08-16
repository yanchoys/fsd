"use client";

import { FormControl, Box, Autocomplete, TextField } from "@mui/material";
import type {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import { IconGenerator } from "../IconGenerator";
import type { IPopularCategoriesData } from "~/app/(application)/definitions";

export interface CustomHTMLAttributes
  extends React.HTMLAttributes<HTMLLIElement> {
  key?: React.Key;
}

export default function CategoriesAutocomplete({
  categories,
  isSmallSize,
  onChange,
  inputValue,
  value,
  iconUrl,
  setValue,
  variant,
}: {
  categories: readonly IPopularCategoriesData[];
  isSmallSize?: boolean;
  iconUrl?: string;
  variant: "white" | "blue";
  inputValue: string;
  value: IPopularCategoriesData | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (
    event: React.SyntheticEvent,
    value: IPopularCategoriesData | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IPopularCategoriesData> | undefined,
  ) => void | undefined;
}) {
  const whiteVariant = variant === "white";

  return (
    <FormControl fullWidth={whiteVariant}>
      <Autocomplete
        id="category-select"
        options={categories}
        autoHighlight
        popupIcon={
          <IconGenerator
            alt="avatar icon"
            src={`/down-arrow.svg`}
            // width={}
            className={`${!whiteVariant ? "mr-2" : ""} ${!isSmallSize ? "w-6 sm:w-8" : "w-[18px]"}`}
          />
        }
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onChange={onChange}
        value={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        renderOption={(
          props: CustomHTMLAttributes,
          option: IPopularCategoriesData,
        ) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <IconGenerator
                className={whiteVariant ? "w-4 sm:w-5" : "w-4"}
                src={option.iconUrl}
                alt={option.alt}
              />
              {option.name}
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
            label={whiteVariant ? "Category" : null}
            variant="standard"
            placeholder="Select Category"
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
                  alt="Category Icon"
                  src={iconUrl ?? "/pool.svg"}
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
