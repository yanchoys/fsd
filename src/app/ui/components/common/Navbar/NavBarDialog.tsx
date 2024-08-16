import Link from "next/link";
import { forwardRef } from "react";
import {
  Dialog,
  ListItemText,
  ListItemButton,
  List,
  Slide,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { TransitionProps } from "@mui/material/transitions";
import { IconGenerator } from "../IconGenerator";
import { getCurrentDates } from "~/app/utils/helpers";
import { logOut } from "~/app/(authentication)/actions";
import type { TUserData } from "~/app/(application)/definitions";

export default function NavBardDialog({
  openMenu,
  toggleMenu,
  session,
}: {
  openMenu: boolean;
  toggleMenu: () => void;
  session: TUserData["profile"] | null;
}) {
  const { startDate, endDate } = getCurrentDates();

  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  return (
    <Dialog
      fullScreen
      open={openMenu}
      onClose={toggleMenu}
      TransitionComponent={Transition}
    >
      <div className="flex items-center justify-between border border-[#EAEAEA] bg-white px-6 py-3">
        <IconGenerator
          src={`/cool_vacay_logo_black.svg`}
          alt="CoolVacay Logo"
          width="108px"
          priority={true}
        />
        <IconButton
          onClick={toggleMenu}
          aria-label="close"
          sx={{ width: "24px" }}
        >
          <CloseIcon sx={{ width: "24px", color: "black" }} />
        </IconButton>
      </div>
      <List>
        <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
          <Link
            href={`/listings?fromDate=${startDate}&toDate=${endDate}&numberOfGuests=1&pageNum=1`}
          >
            <ListItemText primary="Listed Places" />
          </Link>
        </ListItemButton>
        <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
          <Link href="/rental-income-estimator">
            <ListItemText primary="Vacation Rental Management" />
          </Link>
        </ListItemButton>
      </List>
      {!session ? (
        <Link href="/signin">
          <button className="my-3 ml-8 flex max-w-fit rounded-xl bg-black p-3 text-white">
            Log In or Sign Up
          </button>
        </Link>
      ) : (
        <List>
          <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
            <Link href="/profile">My Profile</Link>
          </ListItemButton>
          <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
            <Link href="/profile/reservations">My bookings</Link>
          </ListItemButton>
          <button
            onClick={async () => {
              await logOut();
              toggleMenu();
            }}
            className="my-3 ml-8 flex max-w-fit rounded-xl bg-black p-3 text-white"
          >
            Log Out
          </button>
        </List>
      )}
    </Dialog>
  );
}
