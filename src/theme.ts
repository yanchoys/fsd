"use client";

import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#29ABE2",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#29ABE2",
        },
        shrink: {
          color: "#676D73 ",
        },
      },
    },
  },
});

export default theme;
