import JobCard from "@/src/components/molecules/JobCard/JobCard.component";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useGetJobsQuery from "@/src/hooks/queries/useGetJobsQuery.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const JobList = () => {
  const getJobsQuery = useGetJobsQuery();
  const jobs = getJobsQuery.data?.data.data;
  const searchParams = useSearchParams();
  const paramsManager = useParamsManager();
  const jobId = searchParams.get(SEARCH_PARAMS.jobId);

  useEffect(() => {
    if (jobId) return;
    paramsManager.appendParams({ [SEARCH_PARAMS.jobId]: jobs?.[0].id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, jobs]);

  return (
    <div className="flex flex-col gap-y-2 overflow-y-auto max-h-[calc(100vh-144px)]">
      {jobs?.map((job) => (
        <>
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
        </>
      ))}
    </div>
  );
};

export default JobList;
