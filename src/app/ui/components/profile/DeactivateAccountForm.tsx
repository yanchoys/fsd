"use client";

import { useFormState } from "react-dom";
import { deactivateAccount } from "~/app/(application)/actions";
import { ActionButton } from "../authentication";
import { useRouter } from "next/navigation";

export default function DeactivateAccountForm({
  setOpen,
  userId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}) {
  const [errorMessage, dispatch] = useFormState(deactivateAccount, undefined);
  const router = useRouter();
  return (
    <form
      action={() => {
        dispatch({ userId });
        if (!errorMessage) {
          setOpen(false);
          router.refresh();
        }
      }}
    >
      <h1>Are you sure you want to deactivate your account?</h1>
      <div className="ml-32 mt-8 flex gap-6">
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        <button onClick={() => setOpen(false)}>Cancel</button>
        <ActionButton
          text="Deactivate"
          className="h-15 flex w-full items-center justify-center rounded-full border border-[#FF6565] bg-white p-4 text-[#FF6565] hover:bg-[#FF6565] hover:text-white disabled:opacity-50"
        />
      </div>
    </form>
  );
}
