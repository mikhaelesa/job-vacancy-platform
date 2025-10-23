import ErrorNoJobs from "@/src/components/molecules/ErrorNoJobs";
import Navbar from "@/src/components/molecules/Navbar";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";

const AdminJobs = () => {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary isError errorComponent={<ErrorNoJobs />}></ErrorBoundary>
      </main>
    </>
  );
};

export default AdminJobs;
