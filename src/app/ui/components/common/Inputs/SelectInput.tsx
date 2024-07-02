import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

const guests = Array.from({ length: 8 }, (v, i) => i + 1).map((item) =>
  item.toString(),
);

export default function SelectInput({
  size,
  value,
  onChange,
}: {
  size: "small" | "big";
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}) {
  const bigSize = size === "big";
  return (
    <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
      <InputLabel
        shrink={true}
        htmlFor="component-simple"
        className={`block ${bigSize ? "text-2xl" : "text-xl"} font-medium`}
      >
        Guests
      </InputLabel>
      <div>
        <div className="relative">
          <Select
            fullWidth
            value={value}
            onChange={onChange}
            sx={{
              padding: bigSize ? "24px 26px 10px 0px" : "18px 26px 0px 0px",
              fontSize: bigSize ? "20px" : "16px",
              fontWeight: 500,
              "& .MuiSvgIcon-root": {
                position: "absolute",
                top: bigSize ? 20 : 12,
                marginTop: "10px",
              },
            }}
            labelId="customized-select-label"
            id="customized-select"
            defaultValue={guests[0]}
          >
            {guests.map((guest) => (
              <MenuItem key={guest} value={guest}>
                {`${guest} ${guest === "1" ? "guest" : "guests"}`}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </FormControl>
  );
}
