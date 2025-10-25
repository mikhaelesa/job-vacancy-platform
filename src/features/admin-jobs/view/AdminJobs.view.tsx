import IcSearch from "@/src/components/atoms/Icons/IcSearch.component";
import withRecruiterRole from "@/src/components/hoc/withRecruiterRole/withRecruiterRole.component";
import ErrorNoJobs from "@/src/components/molecules/ErrorNoJobs";
import Navbar from "@/src/components/molecules/Navbar";
import TextInput from "@/src/components/organisms/TextInput";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import JobForm from "@/src/components/templates/JobForm";
import { PATHS } from "@/src/constants/paths.constant";
import { useState } from "react";
import AdminJobCard from "../components/AdminJobCard";
import SideCTA from "../components/SideCTA";

const AdminJobs = () => {
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);

  const handleOpenJobForm = () => setIsJobFormOpen(true);
  return (
    <>
      <Navbar />
      <ErrorBoundary
        isError
        errorComponent={<ErrorNoJobs onClickCreateNewJob={handleOpenJobForm} />}
      >
        <main className="relative">
          <div className="flex gap-x-6 pt-9 px-6">
            <div className="w-full flex flex-col gap-y-4">
              <TextInput
                placeholder="Search by job details"
                iconRight={<IcSearch className="text-primary-main" />}
              />
              <div className="flex flex-col gap-y-4">
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
                <AdminJobCard />
              </div>
            </div>
            <SideCTA onClickCreateNewJob={handleOpenJobForm} />
          </div>
        </main>
      </ErrorBoundary>
      <JobForm isOpen={isJobFormOpen} setIsOpen={setIsJobFormOpen} />
    </>
  );
};

export default withRecruiterRole(AdminJobs, {
  onUnauthorized: (router) => router.replace(PATHS.root),
});
