"use client";

import dynamic from "next/dynamic";

const LandingPageView = dynamic(
  () => import("@/src/features/landing-page/view"),
  {
    ssr: false,
  }
);

export default function LandingPage() {
  return <LandingPageView />;
}
