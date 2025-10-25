import { clsx } from "clsx";
import { Nunito_Sans } from "next/font/google";
import { PropsWithChildren } from "react";
import RootProviders from "../components/templates/RootProviders";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "700"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(`antialiased`, nunitoSans.className)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
