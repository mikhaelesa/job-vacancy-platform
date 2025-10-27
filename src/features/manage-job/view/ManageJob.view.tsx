"use client";

import Button from "@/src/components/atoms/Button";
import Navbar from "@/src/components/molecules/Navbar";
import Table from "@/src/components/molecules/Table";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import clsx from "clsx";
import NoApplicantsError from "../components/NoApplicantsError";
import useManageJobManager from "../hooks/useManageJobManager.hook";

const ManageJob = () => {
  const manager = useManageJobManager();

  return (
    <>
      <Navbar />
      <LoadingBoundary isLoading={manager.isLoading}>
        <ErrorBoundary
          isError={manager.isNoApplicants}
          errorComponent={<NoApplicantsError />}
        >
          <main className="p-6 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <p className="text-xl font-bold">{manager.job?.name}</p>
              <Button
                disabled={manager.isUpdatingJobStatus}
                onClick={manager.getUpdateJobStatusHandler}
                className={clsx(
                  "w-fit",
                  manager.isJobActive && "bg-danger-main!"
                )}
              >
                {manager.isJobActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
            <div className="rounded-lg bg-neutral-10 border border-neutral-40 overflow-x-auto">
              <div className="m-6 min-w-[1000px] ">
                <Table table={manager.table} />
              </div>
            </div>
          </main>
        </ErrorBoundary>
      </LoadingBoundary>
    </>
  );
};

export default ManageJob;
