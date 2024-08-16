import Image from "next/image";
import { auth } from "~/auth";
import { getProfileInfo } from "~/app/(application)/actions";
import NavLinks from "./NavLinks";
import dayjs from "dayjs";

export default async function SideNav() {
  const session = await auth();

  const profileInfo =
    session?.user && (await getProfileInfo(session.user.email!));

  return (
    <div className="flex w-full flex-col rounded-[8px] border border-[#EAEAEF] md:max-w-[280px]">
      <div className="flex items-center gap-4 p-5">
        <div className="flex w-[50px]">
          <Image
            alt="avatar icon"
            src={`${profileInfo?.profilePicture ?? `/avatar_blue.svg`}`}
            width={50}
            height={50}
            className="h-[50px] w-[50px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold sm:text-sm">
            {profileInfo?.firstName} {profileInfo?.lastName}
          </p>
          <p className="text-sm text-[#676D73] sm:text-xs">
            Joined {dayjs(profileInfo?.creationDate).format("MMMM d, YYYY")}
          </p>
        </div>
      </div>
      <NavLinks />
    </div>
  );
}
