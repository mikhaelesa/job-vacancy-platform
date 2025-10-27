"use client";

import Navbar from "@/src/components/molecules/Navbar";
import Table from "@/src/components/molecules/Table";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import useManageJobManager from "../hooks/useManageJobManager.hook";

const ManageJob = () => {
  const manageJobManager = useManageJobManager();

  return (
    <>
      <Navbar />
      <LoadingBoundary isLoading={manageJobManager.isLoading}>
        <main className="p-6 flex flex-col gap-y-6">
          <p className="text-xl font-bold">{manageJobManager.job?.name}</p>
          <div className="rounded-lg bg-neutral-10 border border-neutral-40 overflow-x-auto">
            <div className="m-6 min-w-[1000px] ">
              <Table table={manageJobManager.table} />
            </div>
          </div>
        </main>
      </LoadingBoundary>
    </>
  );
};

export default ManageJob;
