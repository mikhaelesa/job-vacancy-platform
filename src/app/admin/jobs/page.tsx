"use client";

import dynamic from "next/dynamic";

const AdminJobsView = dynamic(() => import("@/src/features/admin-jobs/view"), {
  ssr: false,
});

const AdminJobsPage = () => {
  return <AdminJobsView />;
};

export default AdminJobsPage;
