"use client";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import IconGenerator from "./IconGenerator";

const RangeDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        components={["DateRangePicker"]}
      >
        <DateRangePicker
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
          slotProps={{
            fieldSeparator: {
              sx: {
                backgroundColor: "#EAEAEF",
                color: "transparent",
                width: "1px",
                height: "62px",
                position: "absolute",
                left: "190px",
                top: "20px",
              },
            },
            textField: {
              variant: "standard",
              InputLabelProps: {
                className: "text-2xl font-medium absolute -top-3",
              },
              InputProps: {
                sx: { fontSize: "20px", fontWeight: 500 },
                startAdornment: (
                  <IconGenerator
                    alt="Calendar icon"
                    src={`/calendar_icon.svg`}
                    width="32px"
                    className="mr-3"
                  />
                ),
              },
            },
          }}
          defaultValue={[dayjs(), dayjs().add(6, "day")]}
          localeText={{ start: "Check-in", end: "Check-out" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default RangeDatePicker;
