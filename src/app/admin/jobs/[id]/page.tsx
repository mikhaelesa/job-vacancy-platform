"use client";

import dynamic from "next/dynamic";

const ManageJobView = dynamic(() => import("@/src/features/manage-job/view"), {
  ssr: false,
});

const AdminManageJobPage = () => {
  return <ManageJobView />;
};

export default AdminManageJobPage;
