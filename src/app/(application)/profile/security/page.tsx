import { Divider } from "@mui/material";
import { FormDialog } from "~/app/ui/components/common";
import { auth } from "~/auth";

export default async function Page() {
  const session = (await auth())!;
  const signedInWith = session.user?.signedInWith;
  const canChangePassword = signedInWith === "Coolvacay";

  return (
    <main className="w-full p-3 sm:p-6">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl font-medium">Security</h2>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Password</p>
            {canChangePassword ? (
              <p className="text-sm font-medium text-[#676D73]">
                Set a unique password to protect your account
              </p>
            ) : (
              <p className="text-sm font-medium text-[#676D73]">
                {`You are signed in with ${signedInWith}. You can't change your password`}
              </p>
            )}
          </div>
          {canChangePassword ? (
            <FormDialog
              title="Change password"
              content="password"
              data={session.user?.id}
            >
              <button className="flex h-[40px] sm:h-[48px] items-center justify-center rounded-full border border-primary px-4 sm:px-6 py-2 text-primary hover:bg-primary hover:text-white">
                Edit Password
              </button>
            </FormDialog>
          ) : null}
        </div>
        <Divider />
        <h2 className="text-xl sm:text-2xl font-medium">Manage Account</h2>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Deactivate my account</p>
            <p className="text-sm font-medium text-[#676D73] max-w-full sm:max-w-[450px]">
              {`This will shut down your account, but retain your information. You won't be able to sign in again until your account is reactivated.`}
            </p>
          </div>
          <FormDialog
            title="Deactivate Account"
            content="deactivate"
            data={session.user?.id}
          >
            <button className="flex h-[40px] items-center justify-center text-[#FF6565] hover:text-[#FF6565]/[0.8]">
              Deactivate account
            </button>
          </FormDialog>
        </div>
      </div>
    </main>
  );
}
