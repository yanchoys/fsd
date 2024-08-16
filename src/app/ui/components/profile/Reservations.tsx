import { Divider } from "@mui/material";
import type { IReservationsDetails } from "~/app/(application)/definitions";
import { ReservationCard } from "../common";

export default function Reservations({
  reservationsDetails,
}: {
  reservationsDetails: IReservationsDetails[];
}) {
  return (
    <div className="mb-8 flex flex-col gap-8 p-3">
      <h4 className="text-[24px] font-medium sm:text-[28px]">
        {`${reservationsDetails.length} ${
          reservationsDetails.length === 1 ? "Booking" : "Bookings"
        }`}
      </h4>
      {reservationsDetails?.length > 0 ? (
        reservationsDetails?.map((reservation, index) => {
          return (
            <div key={reservation.id} className="flex flex-col gap-4 sm:gap-8">
              <ReservationCard reservation={reservation} />
              {index < reservationsDetails.length - 1 ? (
                <Divider className="hidden sm:block" />
              ) : null}
            </div>
          );
        })
      ) : (
        <p className="text-sm sm:text-base">
          {`You haven't made any reservations.`}
        </p>
      )}
    </div>
  );
}
