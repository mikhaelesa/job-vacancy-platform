import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useGetJobsQuery from "@/src/hooks/queries/useGetJobsQuery.hook";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import { useSearchParams } from "next/navigation";

const useJobDetailManager = () => {
  const getJobsQuery = useGetJobsQuery();
  const jobs = getJobsQuery.data?.data.data;
  const searchParams = useSearchParams();
  const jobId = searchParams.get(SEARCH_PARAMS.jobId);
  const targetJob = jobs?.find((job) => job.id === jobId);
  const paramsManager = useParamsManager();

  const getClickBackHandler = () =>
    paramsManager.removeParams([SEARCH_PARAMS.jobId]);

  return {
    getJobsQuery,
    jobs,
    searchParams,
    jobId,
    targetJob,
    paramsManager,
    getClickBackHandler,
  };
};

export default useJobDetailManager;
