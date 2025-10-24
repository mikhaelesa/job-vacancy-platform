import AuthProvider from "@/src/components/contexts/AuthProvider";
import SignUpView from "@/src/features/sign-up/view";
import { clsx } from "clsx";
import { Nunito_Sans } from "next/font/google";
import { PropsWithChildren } from "react";
import LoginView from "../features/login/view";
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
        <AuthProvider>
          <SignUpView />
          <LoginView />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
