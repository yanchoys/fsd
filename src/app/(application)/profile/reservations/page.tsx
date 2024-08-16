import { Suspense } from "react";
import { auth } from "~/auth";
import { getReservationsDetails } from "../../actions";
import Reservations from "~/app/ui/components/profile/Reservations";
import { ReservationCardsSkeleton } from "~/app/ui/components/common";

export default async function Page() {
  const session = (await auth())!;
  const reservationsDetails =
    session.user && (await getReservationsDetails(session.user.id!))!;
  return (
    <main className="flex w-full max-[500px]:justify-center">
      <Suspense fallback={<ReservationCardsSkeleton />}>
        <Reservations reservationsDetails={reservationsDetails!} />
      </Suspense>
    </main>
  );
}
