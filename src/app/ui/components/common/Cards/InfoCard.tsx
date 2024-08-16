import { IconGenerator } from "../IconGenerator";

export default function InfoCard({
  iconSrc,
  title,
  subtitle,
}: {
  iconSrc: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
  className="flex w-full sm:w-[276px] items-center gap-4 sm:gap-6 rounded-[8px] bg-white p-4 sm:p-6"
  style={{
    boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
  }}
>
  <div className="h-min rounded-[6px] bg-primary/[0.10] p-2 sm:p-3">
    <IconGenerator src={iconSrc} alt="About us folder icon" width="20px"/>
  </div>
  <div className="flex flex-col">
    <p className="text-[24px] sm:text-[32px] font-semibold leading-8 sm:leading-10">{title}</p>
    <p className="text-xs sm:text-sm text-[#676D73]">{subtitle}</p>
  </div>
</div>

  );
}
