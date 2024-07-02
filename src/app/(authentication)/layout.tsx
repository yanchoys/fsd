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
            <div className="flex h-screen w-full">
              <div className="flex w-full justify-center desktop:w-1/2">
                <div className="flex justify-center">
                  <div className="flex w-[510px] justify-center py-20">
                    {children}
                  </div>
                </div>
              </div>
              <div className="invisible relative h-full desktop:visible desktop:w-1/2">
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
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
