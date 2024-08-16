import SideNav from "~/app/ui/components/profile/SideNav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex p-4 sm:p-0">
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-[calc(100vw_-_32px)] flex-col gap-6 sm:max-w-[580px] md:max-w-[680px] md:flex-row lg:max-w-[920px] xl:max-w-[1220px]">
          <div className="flex h-min shrink-0">
            <SideNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
