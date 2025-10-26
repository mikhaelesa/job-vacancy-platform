import Navbar from "@/src/components/molecules/Navbar";
import LoadingBoundary from "@/src/components/templates/LoadingBoundary";
import useGetJobsQuery from "@/src/hooks/queries/useGetJobsQuery.hook";
import JobDetail from "../components/JobDetail";
import JobList from "../components/JobList";

const LandingPageView = () => {
  const getJobsQuery = useGetJobsQuery();
  const isLoading = getJobsQuery.isLoading;

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-[300px_1fr] gap-x-6 max-w-[1200px] mx-auto my-10">
        <LoadingBoundary isLoading={isLoading}>
          <JobList />
          <JobDetail />
        </LoadingBoundary>
      </main>
    </>
  );
};

export default LandingPageView;
