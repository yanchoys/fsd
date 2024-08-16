import Image from "next/image";
import {
  IconGenerator,
  InfoCard,
  Newsletter,
  ReviewCard,
  CustomChip,
} from "~/app/ui/components/common";

export default function Page() {
  const partners = [
    "airbnb",
    "booking",
    "expedia",
    "google",
    "tripadvisor",
    "vrbo",
  ];

  return (
    <main className="flex flex-col">
      <div className="relative -mt-[96px] flex h-[588px]">
        <div className="absolute flex h-[588px] w-full">
          <Image
            alt="Coolvacay about us hero image"
            src="/about_us.jpeg"
            quality={90}
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
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 text-white">
            <div className="flex max-w-[1220px] items-center justify-center py-32 sm:py-56">
              <div className="w-full text-center">
                <h1 className="mb-4 sm:mb-8 text-4xl sm:text-[80px] font-medium leading-[50px] sm:leading-[80px] tracking-tight">
                  Welcome to CoolVacay!
                </h1>
                <h6 className="mx-6 sm:mx-60 text-lg sm:text-xl leading-7 sm:leading-[30px]">
                  At CoolVacay, we believe in transforming the way timeshare resorts and individual vacation properties are managed.
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-16">
                <div className="flex h-[320px] sm:h-[549px] w-full lg:w-[592px]">
                  <Image
                    alt="Coolvacay about us, second image"
                    src="/about_us_2.jpeg"
                    className="rounded-2xl"
                    quality={60}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={true}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <CustomChip label="Know more" width={100} />
                  <h2 className="text-[32px] sm:text-[58px] font-medium leading-[40px] sm:leading-[67px]">
                    Join the CoolVacay Family
                  </h2>
                  <p className="text-base sm:text-lg leading-6 sm:leading-7 text-[#676D73]">
                    We invite you to join the CoolVacay family and experience the difference our dedicated team and innovative solutions can make. Let us unlock the full potential of your property together.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">
                    {partners.map((partner) => (
                      <IconGenerator
                        key={partner}
                        src={`/${partner}_logo.svg`}
                        alt={`${partner} logo`}
                        width="auto"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-16 sm:mt-[128px]">
        <div className="flex justify-center bg-[#FAFAFA] py-16 px-4 sm:px-0">
          <div className="flex max-w-[1220px] flex-col lg:flex-row items-center justify-center gap-12 sm:gap-24">
            <div className="flex flex-col gap-8">
              <h1 className="text-2xl sm:text-[40px] font-bold leading-8 sm:leading-10">
                Our Story
              </h1>
              <p className="font-medium text-[#676D73]">
                Founded by a group of passionate travelers and real estate experts, CoolVacay was born from a desire to help property owners maximize their income and share their amazing properties with the world. We understand the challenges and joys of property ownership, and we are here to make the experience as rewarding as possible.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <InfoCard
                  iconSrc="/folder-open.svg"
                  title="1.5K"
                  subtitle="Listed Properties"
                />
                <InfoCard
                  iconSrc="/user-group.svg"
                  title="2.5K"
                  subtitle="Happy Costumers"
                />
                <InfoCard
                  iconSrc="/download-icon.svg"
                  title="5 ★"
                  subtitle="Star Reviews"
                />
                <InfoCard
                  iconSrc="/globe.svg"
                  title="450"
                  subtitle="Daily Transactions"
                />
              </div>
            </div>
            <div className="flex h-[320px] sm:h-[537px] w-full md:w-[542px] shrink-0">
              <Image
                alt="Coolvacay about us, third image"
                src="/about_us_3.jpeg"
                className="rounded-2xl"
                quality={90}
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 flex justify-center px-4 sm:px-0">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-[40px] font-bold text-center">
            Here is what people say about us
          </h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard
              title="Best vacation of my life"
              description=""
              size="small"
              iconSrc="/avatar_1.svg"
              iconDescription={{
                name: "John Doe",
                proffesion: "CTE of Nerooni",
              }}
            />
            <ReviewCard
              title="It was a very good experience"
              description=""
              size="medium"
              iconSrc="/avatar_2.svg"
              iconDescription={{
                name: "Jerry Narrow",
                proffesion: "CTF of Vectorian",
              }}
            />
            <ReviewCard
              title="Smoothest experience ever"
              description=""
              size="small"
              iconSrc="/avatar_3.svg"
              iconDescription={{
                name: "Liam Meri",
                proffesion: "CTO of HeroSection",
              }}
            />
          </div>
          <div className="my-16 w-full">
            <Newsletter />
          </div>
        </div>
      </div>
    </main>
  );
}
