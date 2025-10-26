import JobCard from "@/src/components/molecules/JobCard/JobCard.component";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useGetJobsQuery from "@/src/hooks/queries/useGetJobsQuery.hook";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

const JobList = () => {
  const getJobsQuery = useGetJobsQuery();
  const jobs = getJobsQuery.data?.data.data;
  const searchParams = useSearchParams();
  const jobId = searchParams.get(SEARCH_PARAMS.jobId);

  return (
    <div
      className={clsx(
        "flex flex-col gap-y-2 overflow-y-auto max-h-[calc(100vh-144px)]",
        jobId && "max-md:hidden"
      )}
    >
      {jobs?.map((job) => (
        <JobCard
          id={job.id}
          isActive={searchParams.get(SEARCH_PARAMS.jobId) === job.id}
          name={job.name}
          city={job.city?.name}
          companyName={job.recruiter.company_name}
          minimumSalary={job.minimum_salary}
          maximumSalary={job.maximum_salary}
          key={job.id}
        />
      ))}
    </div>
  );
};

export default JobList;
