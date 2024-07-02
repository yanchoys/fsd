import { IconGenerator } from "~/app/ui/components/common";

export default function BookingCompleted() {
  return (
    <div className="m-4 flex w-full flex-col items-center justify-center">
      <IconGenerator
        src="/blue_check.svg"
        width="94px"
        alt="Booking confirmed icon"
        className="my-8"
      />
      <div className="flex flex-col items-center gap-3 text-[#676D73]">
        <h2 className="text-2xl font-bold text-black">Thank you!</h2>
        <h6>Your booking details has been sent to your email.</h6>
        <h6>
          You can download the booking as PDF below, or check it on the
          dashboard
        </h6>
      </div>
    </div>
  );
}
