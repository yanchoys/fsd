import "~/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/theme";
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
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className="flex w-full sm:h-screen sm:items-center sm:justify-center xl:items-start">
              <div className="flex w-full justify-center p-5 sm:px-4 sm:px-6 sm:py-10 lg:w-1/2 lg:px-8 lg:py-20">
                <div className="flex w-full max-w-[510px] justify-center">
                  {children}
                </div>
              </div>
              <div className="relative hidden h-full lg:w-1/2 xl:block">
                <Image
                  alt="Cool Vacay Authentication Image"
                  src="/authentication_image.jpeg"
                  fill
                  priority={true}
                  sizes="100vw"
                  quality={90}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
