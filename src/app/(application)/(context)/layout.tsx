import { SearchParamsProvider } from "~/context/SearchParamsContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchParamsProvider>{children}</SearchParamsProvider>;
}
