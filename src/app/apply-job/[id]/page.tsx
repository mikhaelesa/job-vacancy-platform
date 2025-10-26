"use client";

import dynamic from "next/dynamic";

const ApplyJobView = dynamic(() => import("@/src/features/apply-job/view"), {
  ssr: false,
});

const ApplyJobPage = () => {
  return <ApplyJobView />;
};

export default ApplyJobPage;
