import "~/styles/globals.css";

import Image from "next/image";
import { Inter } from "next/font/google";

export const metadata = {
  title: "CoolVacay | Authentication",
  description: "Cool Vacay Booking Platform Authentication Page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const inter = Inter({ subsets: ["latin"] });


export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex h-screen w-full">
          <div className="flex w-full justify-center desktop:w-1/2 px-28 py-16">
            {children}
          </div>
          <div className="invisible desktop:visible relative h-full desktop:w-1/2">
            {
              <Image
                alt="Cool Vacay Sign In Background Image"
                src="/signInImage.png"
                fill
                quality={100}
              />
            }
          </div>
        </div>
      </body>
    </html>
  );
}
