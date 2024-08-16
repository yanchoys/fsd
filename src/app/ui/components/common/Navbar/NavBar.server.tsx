import { auth } from "~/auth";
import { getProfileInfo, isValidToken } from "~/app/(application)/actions";
import NavBar from "./NavBar.client";

export default async function NavBarWrapper() {
  const session = await auth();
  const isTokenValid = session?.user
    ? await isValidToken(session.user?.accessToken)
    : false;

  const userData =
    isTokenValid && session?.user
      ? await getProfileInfo(session.user.email!)
      : null;

  return <NavBar userData={userData} isTokenValid={isTokenValid!} />;
}
