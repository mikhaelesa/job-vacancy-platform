"use client";

import Button from "@/src/components/atoms/Button";
import IcSearch from "@/src/components/atoms/Icons/IcSearch.component";
import withRecruiterRole from "@/src/components/hoc/withRecruiterRole";
import ErrorNoJobs from "@/src/components/molecules/ErrorNoJobs";
import Navbar from "@/src/components/molecules/Navbar";
import TextInput from "@/src/components/organisms/TextInput";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import JobForm from "@/src/components/templates/JobForm";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import { PATHS } from "@/src/constants/paths.constant";
import AdminJobCard from "../components/AdminJobCard";
import SideCTA from "../components/SideCTA";
import useAdminJobsManager from "../hooks/useAdminJobsManager.hook";

const AdminJobs = () => {
  const manager = useAdminJobsManager();

  return (
    <>
      <Navbar />
      <ErrorBoundary
        isError={manager.isError}
        errorComponent={
          <ErrorNoJobs onClickCreateNewJob={manager.getOpenJobFormHandler} />
        }
      >
        <main className="relative">
          <div className="flex gap-x-6 py-9 px-6">
            <div className="w-full flex flex-col gap-y-4">
              <div className="flex flex-col gap-2 items-center w-full">
                <TextInput
                  placeholder="Search by job details"
                  iconRight={<IcSearch className="text-primary-main" />}
                  onChange={manager.getSearchJobsHandler}
                  defaultValue={manager.search || ""}
                  ref={manager.searchInputRef}
                />
                <Button
                  onClick={manager.getOpenJobFormHandler}
                  size="medium"
                  className="md:hidden w-full whitespace-nowrap"
                >
                  Create new job
                </Button>
              </div>
              <LoadingBoundary isLoading={manager.isLoading}>
                <ErrorBoundary
                  isError={manager.isNoSearchResult}
                  errorComponent={
                    <div className="flex gap-1">
                      <p>No search result found...</p>
                      <button
                        className="font-bold text-primary-main cursor-pointer"
                        onClick={manager.getResetSearch}
                      >
                        Try a New Search
                      </button>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-y-4">
                    {manager.jobs?.map((job) => (
                      <AdminJobCard
                        createdAt={job.created_at}
                        status={job.status}
                        name={job.name}
                        minimumSalary={job.minimum_salary}
                        maximumSalary={job.maximum_salary}
                        key={job.id}
                      />
                    ))}
                  </div>
                </ErrorBoundary>
              </LoadingBoundary>
            </div>
            <SideCTA onClickCreateNewJob={manager.getOpenJobFormHandler} />
          </div>
        </main>
      </ErrorBoundary>
      <JobForm
        isOpen={manager.isJobFormOpen}
        setIsOpen={manager.setIsJobFormOpen}
      />
    </>
  );
};

export default withRecruiterRole(AdminJobs, {
  onUnauthorized: (router) => router.replace(PATHS.root),
});
