import Image from "next/image";

const Newsletter = () => {
  return (
    <form>
      <div className="relative flex w-full shrink-0 rounded-xl">
        <Image
          src="/newsletter.jpeg"
          height={533}
          width={2592}
          quality={100}
          alt="Subscribe to our newsletter"
          style={{ filter: "brightness(60%)" }}
          className="rounded-xl"
        />
        <div className="absolute left-2/4 top-2/4 w-full -translate-x-2/4 -translate-y-2/4 text-white">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <h1 className="text-[48px] leading-[57px]">
              Stay up-to-date on our deals.
            </h1>
            <h5 className="text-md">
              Curated tips, inspiration, and discounts for your next vacation.
            </h5>
            <div className="flex gap-4">
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="focus:shadow-outline w-[285px] appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <button className="rounded-lg bg-primary px-8 py-2">Go</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Newsletter;
