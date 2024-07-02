import CustomButton from "../../ui/components/common/CustomButton";
import Image from "next/image";
import CustomChip from "../../ui/components/common/CustomChip";
import Link from "next/link";
import CustomIconBackground from "../../ui/components/common/CustomIconBackground";
import NumbersCard from "./NumbersCard";
import Newsletter from "../../ui/components/common/Newsletter/Newsletter";
import { IconGenerator } from "~/app/ui/components/common";

export default function Component() {
  return (
    <div className="mx-auto">
      <div className="relative flex h-[714px] w-full flex-shrink-0 items-center text-white">
        <Image
          alt="Coolvacay about us hero image"
          src="/about_us.png"
          quality={100}
          fill
          priority={true}
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "brightness(60%)",
            zIndex: -1,
          }}
        />
        <div className="flex w-full">
          <div className="flex w-full flex-col items-center justify-center px-14">
            <h1 className="mb-8 text-[80px] leading-[80px]">About Coolvacay</h1>
            <div className="text-xl leading-[30px] tracking-[0.16px]">
              <p>
                At CoolVacay, we specialize in turning your dreams into reality.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 mt-20">
        <div className="grid grid-cols-2 items-center gap-16">
          <div className="relative h-[70vh] w-full rounded-2xl min-[3000px]:h-[40vh]">
            <Image
              alt="Coolvacay about us, second image"
              src="/about-us-2.jpeg"
              className="rounded-2xl"
              quality={100}
              fill
              priority={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <CustomChip label="Know more" width={100} />
            <div className="mb-6 mt-4 flex items-center space-x-2">
              <h2 className="text-6xl font-medium leading-[67px]">
                Rent with peace of mind with Coolvacay
              </h2>
            </div>
            <p className="mb-4 text-lg font-semibold leading-9 text-[#141414]">
              Add to your vacation with amenities like direct beach access,
              oceanfront homes, pools, hot tubs, and pet-friendly stays.
            </p>
            <p className="mb-6">
              Specializing in the marketing and management of vacation rental
              properties, we partner directly with owners to unlock the full
              potential of unused vacation rental and resort properties. Our
              expertise lies in optimizing earnings for owners, ensuring that
              every property sees maximum occupancy and delivers consistent
              returns.
            </p>
            <Link href={"contact-us"}>
              <CustomButton width={160} label={"Contact us"} />
            </Link>
          </div>
        </div>
        <div className="my-16 flex w-full justify-center">
          <CustomChip label="About Coolvacay" width={150} />
        </div>
        <div className="mx-16 mt-12 grid grid-cols-1 gap-48 desktop:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <CustomIconBackground>
                <Image
                  src="/eye_icon.svg"
                  width={60}
                  height={60}
                  alt="Eye icon"
                />
              </CustomIconBackground>
              <h2 className="px-3 text-3xl font-medium">Our Vision</h2>
            </div>
            <p>
              Our vision at CoolVacay is to redefine the way individuals
              experience vacations, providing unparalleled access to premium
              accommodations and unparalleled hospitality. We envision a world
              where every traveler can effortlessly immerse themselves in the
              beauty of diverse destinations without compromising on comfort or
              convenience, while including our experience which is a plus.
            </p>
          </div>
          <div>
            <div className="mb-6 flex items-center space-x-2">
              <CustomIconBackground>
                <Image
                  src="/flag_icon.svg"
                  width={60}
                  height={60}
                  alt="Eye icon"
                />
              </CustomIconBackground>
              <h2 className="px-3 text-3xl font-semibold">Our Mission</h2>
            </div>
            <p>
              At CoolVacay, our mission is to transform your dreams into
              unforgettable experiences. We specialize in curating exceptional
              vacation options that cater to your unique desires and
              preferences. Whether you seek the tranquility of a cozy cabin
              nestled in the woods or the luxury of a coastal resort overlooking
              pristine beaches, we are dedicated to making your vacation dreams
              a reality.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="text-center">
            <h2 className="mt-32 text-4xl font-medium">
              Take a look at our numbers
            </h2>
            <p className="mb-16 mt-4">
              Our numbers show how passionate and serious we take our job
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <NumbersCard
              number="1.5K"
              title="Listed Properties"
              description="We have 1500 properties listed, giving customers even more
                options to explore and invest in for their vacation needs."
            />
            <NumbersCard
              number="2.5K"
              title="Happy Customers"
              description="We have served over 2,500 happy customers, ensuring satisfaction
              with their vacation experiences and the services provided."
            />
            <NumbersCard
              number="5 ★"
              title="Star Reviews"
              description="CoolVacay has garnered numerous 5-star reviews from satisfied customers, reflecting the quality of service and vacation experiences."
            />
            <NumbersCard
              number="+ 450"
              title="Daily Transactions"
              description="An average of 450 transactions, providing customers with seamless experiences in purchasing, selling, or renting vacation properties."
            />
          </div>
        </div>
        <div className="mx-48 my-12">
          <div className="text-center">
            <h2 className="mt-32 text-4xl font-medium">
              Take people word for us
            </h2>
            <p className="mb-16 mt-4">
              Our numbers show how passionate and serious we take our job
            </p>
          </div>
          <div className="mt-8 flex items-center justify-start gap-6">
            <div className="flex flex-col gap-5 rounded-lg border px-4 py-6">
              <p className="text-lg font-semibold">
                “Best vacation of my life”
              </p>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                nibh mauris, nec turpis orci lectus meacenas. Suspendisse sed
                magna eget nibh in turpis. Consequat duis diam lacus arcu.
                Faucibus venenatis felis id augue sit cursus pellentesque enim
                arcu. Elementum felis magna pretium in tincidunt. Suspendisse
                sed magna eget nibh in turpis. Consequat duis diam lacus arcu.
              </p>
              <div className="mt-6 flex items-center">
                <IconGenerator
                  alt="avatar icon"
                  src={`/avatar_blue.svg`}
                  width="56px"
                />
                <div className="ml-4">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-gray-600">CTE of Nerooni</p>
                </div>
              </div>
            </div>
            <div className="flex h-max flex-col gap-5 rounded-lg border bg-[#F7F7F7] px-5 py-10 ">
              <p className="text-2xl font-semibold">
                “It was a very good experience”
              </p>
              <p className="mt-4 text-base leading-6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                nibh mauris, nec turpis orci lectus meacenas. Suspendisse sed
                magna eget nibh in turpis. Consequat duis diam lacus arcu.
                Faucibus venenatis felis id augue sit cursus pellentesque enim
                arcu. Elementum felis magna pretium in tincidunt. Suspendisse
                sed magna eget nibh in turpis. Consequat duis diam lacus arcu.
              </p>
              <div className="mt-6 flex items-center">
                <IconGenerator
                  alt="avatar icon"
                  src={`/avatar_blue.svg`}
                  width="72px"
                />
                <div className="ml-4">
                  <p className="text-xl font-semibold leading-9">John Doe</p>
                  <p className="text-base leading-6 text-gray-600">
                    CTE of Nerooni
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-lg border px-4 py-6">
              <p className="text-lg font-semibold">
                “Smoothest experience ever”
              </p>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
                nibh mauris, nec turpis orci lectus meacenas. Suspendisse sed
                magna eget nibh in turpis. Consequat duis diam lacus arcu.
                Faucibus venenatis felis id augue sit cursus pellentesque enim
                arcu. Elementum felis magna pretium in tincidunt. Suspendisse
                sed magna eget nibh in turpis. Consequat duis diam lacus arcu.
              </p>
              <div className="mt-6 flex items-center">
                <IconGenerator
                  alt="avatar icon"
                  src={`/avatar_blue.svg`}
                  width="56px"
                />
                <div className="ml-4">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-gray-600">CTE of Nerooni</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
      </div>
    </div>
  );
}
