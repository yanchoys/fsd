import { Divider } from "@mui/material";
import type { IListingData } from "~/app/(application)/definitions";

export default function PolicyAndRules({ listing }: { listing: IListingData }) {
  return (
    <div className="mb-10">
      {listing.cancellationPolicy ? (
        <>
          <div className="flex flex-col gap-5">
            <h5 className="text-2xl font-bold">Cancellation policy</h5>
            <p>{listing.cancellationPolicy}</p>
          </div>
          <Divider className="my-10" />
        </>
      ) : null}
      {listing.houseRules ? (
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-bold">Ground roules</h5>
          <p className="text-justify">{listing.houseRules}</p>
        </div>
      ) : null}
    </div>
  );
}
