import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { IconGenerator } from "../IconGenerator";

const guests = Array.from({ length: 8 }, (v, i) => i + 1).map((item) =>
  item.toString(),
);

export default function SelectInput({
  size,
  value,
  onChange,
  disabled = false,
}: {
  size: "small" | "medium" | "big";
  value?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  disabled?: boolean;
}) {
  const isBigSize = size === "big";
  const isMediumSize = size === "medium";

  return (
    <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
      <InputLabel
        shrink={true}
        htmlFor="component-simple"
        className={`block ${isBigSize ? "text-xl sm:text-2xl" : isMediumSize ? "text-xl" : "text-base"} font-medium`}
      >
        Guests
      </InputLabel>
      <div>
        <div className="relative">
          <Select
            fullWidth
            value={value}
            IconComponent={() =>
              disabled ? null : (
                <IconGenerator
                  alt="avatar icon"
                  src={`/down-arrow.svg`}
                  className={`pointer-events-none absolute ${isBigSize ? "right-0 top-6 w-6 sm:right-1 sm:top-7 sm:w-8" : isMediumSize ? "right-1 top-[22px] w-6" : "right-[2px] w-4"}`}
                />
              )
            }
            onChange={onChange}
            className={`${isBigSize ? "pb-2.5 pt-5 sm:pt-6" : "pt-4"} ${isBigSize ? "text-base sm:text-xl" : isMediumSize ? "text-base" : "text-sm"}  font-medium`}
            labelId="customized-select-label"
            id="customized-select"
          >
            {guests.map((guest) => (
              <MenuItem
                key={guest}
                value={guest}
                dense
                className={`${size === "small" ? "text-xs" : "text-sm sm:text-base"}`}
              >
                {`${guest} ${guest === "1" ? "guest" : "guests"}`}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </FormControl>
  );
}
