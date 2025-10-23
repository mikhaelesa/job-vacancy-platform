"use client";

import IcSearch from "@/src/components/atoms/Icons/IcSearch.component";
import ErrorNoJobs from "@/src/components/molecules/ErrorNoJobs";
import Navbar from "@/src/components/molecules/Navbar";
import TextInput from "@/src/components/organisms/TextInput";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import AdminJobCard from "../components/AdminJobCard";
import SideCTA from "../components/SideCTA";

const AdminJobs = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary errorComponent={<ErrorNoJobs />}>
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
            <SideCTA />
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default AdminJobs;
