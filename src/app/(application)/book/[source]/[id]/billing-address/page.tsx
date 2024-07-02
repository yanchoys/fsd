import BillingAddressForm from "./BillingAddressForm";

export default function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Billing Address</h3>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <BillingAddressForm params={params} />
      </div>
    </div>
  );
}
