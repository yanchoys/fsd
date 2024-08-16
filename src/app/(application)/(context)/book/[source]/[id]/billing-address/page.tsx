import BillingAddressForm from "./BillingAddressForm";
import { getCountries } from "~/app/(application)/actions";

export default async function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const allCountries = (await getCountries())!;

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Billing Address</h1>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <BillingAddressForm params={params} allCountries={allCountries} />
      </div>
    </div>
  );
}
