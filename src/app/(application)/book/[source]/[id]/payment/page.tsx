// "use client";

// import { useFormContext } from "../FormContext";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

import PaymentForm from "./PaymentForm";

export default function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  // const { formData } = useFormContext();
  // const searchParams = useSearchParams();
  // const router = useRouter();

  //TODO: refactor
  // useEffect(() => {
  //   if (!formData.country && router) {
  //     // const pageParams = new URLSearchParams(searchParams.toString());
  //     router.push(`/book/${params.source}/${params.id}/billing-address`);
  //   }
  // }, [router, formData.country, params.id, params.source, params]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Payment</h3>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <PaymentForm params={params} />
      </div>
    </div>
  );
}
