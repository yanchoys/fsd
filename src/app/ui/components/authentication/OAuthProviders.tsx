import { signIn, providerMap } from "~/auth";
import { IconGenerator } from "../common";

export default function OAuthProviders({
  page,
}: {
  page?: "signin" | "signout";
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 items-center justify-center gap-5">
          <div className="h-[1px] w-full bg-[#EAEAEF]" />
          <h1 className="size-md text-center text-[#9FA4AA]">
            Or connect with
          </h1>
          <div className="h-[1px] w-full bg-[#EAEAEF]" />
        </div>
      </div>
      <div className="flex w-full justify-between gap-5">
        {Object.values(providerMap).map((provider) => {
          if (provider.id !== "credentials")
            return (
              <form
                className="w-full"
                key={provider.id}
                action={async () => {
                  "use server";
                  await signIn(provider.id);
                }}
              >
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-[100px] border border-[#ADB5BD] px-5 py-4 text-[15px]"
                >
                  <span className="mr-2">
                    <IconGenerator
                      alt={`${provider.id} icon`}
                      src={`/logo_${provider.id}.svg`}
                      width="32px"
                    />
                  </span>
                  {` Sign ${page === "signin" ? "in" : "up"} with ${provider.name}`}{" "}
                </button>
              </form>
            );
        })}
      </div>
    </>
  );
}
