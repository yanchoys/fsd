import { auth } from "~/auth";
import NavBar from "./NavBar.client";

export default async function NavBarWrapper() {
  const session = await auth();

  return <NavBar session={session} />;
}
