import Image from "next/image";

export default function StaticPageWrapper({
  children,
  img,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  img: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
}) {
  return (
    <main className="flex flex-col">
      <div className={`relative -mt-24 flex h-[588px]`}>
        <div className={`absolute flex h-[588px] w-full`}>
          <Image
            alt={img.alt}
            src={img.src}
            quality={50}
            fill
            priority={true}
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              filter: "brightness(40%)",
              zIndex: -1,
            }}
          />
        </div>
      </div>
      <div className="my-5 flex justify-center sm:my-16">
        <div className="max-w-[calc(100vw_-_32px)] items-center justify-center sm:max-w-[580px] md:max-w-[680px] lg:max-w-[920px] xl:max-w-[1220px]">
          <div className="flex w-full items-center justify-center">
            <div className="absolute top-32 text-white md:top-44">
              <div className="flex w-full justify-center">
                <div className="text-center">
                  <h1 className="mb-8 text-center text-6xl font-medium leading-[80px] tracking-tight md:text-[80px]">
                    {title}
                  </h1>
                  <h6 className="text-center text-xl leading-[30px]">
                    {subtitle}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-3 text-justify text-[#676D73] sm:gap-8 sm:p-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
