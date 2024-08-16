import InquireForm from "~/app/ui/components/listing/InquireForm";
import Image from "next/image";
import { IconGenerator } from "~/app/ui/components/common";
import { Divider } from "@mui/material";

export default function Page() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center px-4 sm:px-0">
        <div className="flex min-h-[640px] max-w-[1220px] flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="h-full w-full bg-[#F7F7F7] px-6 py-10 sm:px-14 sm:py-14">
              <h2 className="text-2xl sm:text-3xl text-primary">How can we help?</h2>
              <h6 className="my-4 text-base sm:text-lg text-[#676D73]">
                {`Have a question or feedback? Fill out the form below, and we'll get back to you as soon as possible.`}
              </h6>
              <InquireForm />
            </div>
            <div className="relative mt-6 lg:mt-0 h-full w-full lg:w-[592px] shrink-0 hidden md:flex">
              <Image
                alt="Coolvacay about us, second image"
                src="/contact-us.jpeg"
                quality={90}
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  filter: "brightness(50%)",
                }}
              />
              <div className="absolute bottom-8 left-4 sm:left-6 flex w-11/12 flex-col gap-2 text-lg text-white">
                <p className="text-[20px] sm:text-[28px]">
                  {`The team's exceptional service and proactive advice have been instrumental in optimizing our financial processes.`}
                </p>
                <p>Chiara Doe</p>
                <p>Founder & CEO</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-5 w-full px-4 sm:px-0">
            <div className="flex items-center gap-5 sm:gap-10 rounded-[8px] bg-[#F7F7F7] p-6 sm:p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/telephone.svg"
                  alt="Call for assistance icon"
                  width="36px"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] sm:text-[20px] font-medium text-primary">
                  Call for assistance
                </p>
                <p className="text-sm sm:text-base">
                  Our support team is available to answer your questions, and provide technical help.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 sm:gap-10 rounded-[8px] bg-[#F7F7F7] p-6 sm:p-10">
              <div className="h-min rounded-full bg-primary/[0.10] p-5">
                <IconGenerator
                  src="/message_icon.svg"
                  alt="Message for assistance icon"
                  width="36px"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] sm:text-[20px] font-medium text-primary">Chat</p>
                <p className="text-sm sm:text-base">
                  Our support team is available to answer your questions, and provide technical help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-10 sm:mt-16 flex w-full">
        <Image
          alt="Coolvacay about us, second image"
          src="/location.png"
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          style={{
            objectFit: "cover",
            height: "640px",
            width: "100%",
          }}
        />
        <div className="absolute mx-4 mt-24 md:mt-16 sm:left-16 flex max-w-full sm:max-w-[480px] flex-col gap-6 bg-white px-6 py-8 sm:px-16 sm:py-14 font-medium">
          <div className="flex flex-col gap-3">
            <p className="mb-1 text-lg sm:text-xl">Contact details</p>
            <p className="text-primary">
              Address:{" "}
              <span className="text-[#676D73]">
                7380 Sand Lake Rd., Suite 130, Orlando, FL 32819
              </span>
            </p>
            <p className="text-primary">
              Phone: <span className=" text-[#676D73]">+1 302-581-9342</span>
            </p>
            <p className="text-primary">
              Email:{" "}
              <span className=" text-[#676D73]">vacay@coolvacay.com</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="mb-1 text-lg sm:text-xl">Opening hours</p>
            <p className="flex text-primary">
              Monday - Friday:{" "}
              <span className="ml-auto text-[#676D73]">
                09.00 AM - 6.00 PM{" "}
              </span>
            </p>
            <Divider />
            <p className="flex text-primary">
              Saturday:{" "}
              <span className="ml-auto text-[#676D73]">09.00 AM - 2.00 PM</span>
            </p>
            <Divider />
            <p className="flex text-primary">
              Sunday: <span className="ml-auto text-[#676D73]">Closed</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
